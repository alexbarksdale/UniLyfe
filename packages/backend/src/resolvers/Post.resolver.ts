import {
    Resolver,
    Query,
    Mutation,
    Arg,
    Int,
    Ctx,
    Subscription,
    Root,
    PubSub,
    Publisher,
} from 'type-graphql';

import { PostEntity } from '../entity/Post.entity';
import { UserEntity } from '../entity/User.entity';
import { Context } from '../context/context';
import { logger } from '../utils/logger.util';
import { checkAuthor, AuthorError } from '../utils/checkAuthor.util';
import { CategoryEntity } from '../entity/Category.entity';
import { PostType } from '../entity/types/post.type';
import { PostStatPayload, PostTopics } from './types/post.types';

// TODO: Secure the queries and mutations after testing
@Resolver()
export class PostResolver {
    @Query(() => [PostEntity])
    // TODO: Apply auth middleware
    async getPosts(): Promise<PostEntity[]> {
        let posts: PostEntity[];
        try {
            posts = await PostEntity.find({
                relations: ['author', 'category'],
                order: {
                    likes: 'DESC',
                },
            });
        } catch (err) {
            logger.error('Unable to query posts', err);
            throw new Error('Unable to query posts');
        }
        return posts;
    }

    @Query(() => PostEntity)
    // TODO: Apply auth middleware
    async getPost(@Arg('postId', () => Int) postId: number): Promise<PostEntity> {
        if (!postId) throw new Error('You must provide a postId!');

        const post = await PostEntity.findOne(postId, {
            relations: ['author', 'category'],
        });
        if (!post) throw new Error(`Unable to find post with postId: ${postId}`);

        return post;
    }

    @Mutation(() => PostEntity)
    // TODO: Apply auth middleware
    async createTextPost(
        @Arg('title') title: string,
        @Arg('type') type: PostType,
        @Arg('content') content: string,
        @Arg('authorId') authorId: number,
        @Arg('thumbnail', { nullable: true }) thumbnail: string,
        @Arg('categoryName') categoryName: string
    ): Promise<PostEntity> {
        if (!title || !type || !content || !authorId || !categoryName) {
            throw new Error('Missing fields!');
        }

        if (type !== PostType.TEXT) throw new Error('Post type must be TEXT!');

        const author = await UserEntity.findOne({ where: { id: authorId } });
        if (!author) throw new Error('Unable to find author!');

        const category = await CategoryEntity.findOne({ where: { name: categoryName } });
        if (!category) throw new Error('Unable to find category');

        // Create new post
        const post = PostEntity.create({
            title,
            type,
            content,
            author,
            thumbnail,
            category,
        });

        try {
            await PostEntity.save(post);
        } catch (err) {
            logger.error('Unable to save post! Error: ', err);
            throw new Error(`Unable to save post! ${err}`);
        }

        return post;
    }

    @Mutation(() => Boolean)
    // TODO: Apply auth middleware
    async updatePostStats(
        @PubSub(PostTopics.NEW_STATS) publish: Publisher<PostStatPayload>,
        @Arg('postId', () => Int) postId: number,
        @Arg('likes', () => Int, { nullable: true }) likes: number,
        @Arg('views', () => Int, { nullable: true }) views: number
    ): Promise<boolean> {
        if (!postId) throw new Error('You must provide a postId!');

        try {
            await PostEntity.update({ id: postId }, { likes, views });
        } catch (err) {
            logger.error(
                `Failed to update post stats with postId: ${postId}! Error: `,
                err
            );
            throw new Error('Unable to update post stats!');
        }

        // Publish new information to our subscribers
        await publish({ postId });
        return true;
    }

    @Mutation(() => Boolean)
    // TODO: Apply auth middleware
    async updatePost(
        @Arg('postId', () => Int) postId: number,
        @Arg('authorId', () => Int) authorId: number,
        @Arg('title', () => String, { nullable: true }) title: string,
        @Arg('content', () => String, { nullable: true }) content: string,
        @Ctx() { req }: Context
    ): Promise<boolean> {
        if (!postId || !authorId) {
            throw new Error('You must provide a postId and authorId!');
        }

        const isAuthor = checkAuthor(req, authorId, AuthorError.UPDATE_ERROR);

        try {
            if (isAuthor) await PostEntity.update({ id: postId }, { title, content });
        } catch (err) {
            logger.error(`Failed to update post with postId: ${postId}! Error: `, err);
            throw new Error('Unable to update post!');
        }

        return true;
    }

    @Mutation(() => Boolean)
    // TODO: Apply auth middleware
    async deletePost(
        @Arg('postId', () => Int) postId: number,
        @Arg('authorId', () => Int) authorId: number,
        @Ctx() { req }: Context
    ): Promise<boolean> {
        if (!postId || !authorId) {
            throw new Error('You must provide a postId and authorId!');
        }

        const isAuthor = checkAuthor(req, authorId, AuthorError.DELETE_ERROR);

        try {
            if (isAuthor) await PostEntity.delete({ id: postId });
        } catch (err) {
            logger.error(`Failed to delete post with postId: ${postId}! Error: `, err);
            throw new Error('Failed to delete post!');
        }

        return true;
    }

    @Subscription(() => PostEntity, { topics: PostTopics.NEW_STATS })
    async postStatsSub(@Root() { postId }: PostStatPayload): Promise<PostEntity> {
        const post = await PostEntity.findOne(postId);
        if (!post) throw new Error(`Unable to find post with postId: ${postId}`);
        return post;
    }
}
