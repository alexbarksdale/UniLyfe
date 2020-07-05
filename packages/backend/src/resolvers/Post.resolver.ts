import { Resolver, Query, Mutation, Arg, Int, Ctx } from 'type-graphql';

import { PostEntity } from '../entity/Post.entity';
import { UserEntity } from '../entity/User.entity';
import { PostUpdateInput } from './types/post.types';
import { Context } from '../context/context';
import { logger } from '../utils/logger.util';
import { checkAuthor, AuthorError } from '../utils/checkAuthor.util';
import { CategoryEntity } from '../entity/Category.entity';

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
    async createPost(
        @Arg('title') title: string,
        @Arg('content') content: string,
        @Arg('authorId') authorId: number,
        @Arg('categoryName') categoryName: string
    ): Promise<PostEntity> {
        if (!title || !content || !authorId || !categoryName) {
            throw new Error('Missing fields!');
        }

        const author = await UserEntity.findOne({ where: { id: authorId } });
        if (!author) throw new Error('Unable to find author!');

        const category = await CategoryEntity.findOne({ where: { name: categoryName } });
        if (!category) throw new Error('Unable to find category');

        // Create new post
        const post = PostEntity.create({
            title,
            content,
            author,
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
    async updatePost(
        @Arg('postId', () => Int) postId: number,
        @Arg('authorId', () => Int) authorId: number,
        @Arg('update', () => PostUpdateInput) update: PostUpdateInput,
        @Ctx() { req }: Context
    ): Promise<boolean> {
        if (!postId || !authorId) {
            throw new Error('You must provide a postId and authorId!');
        }

        const isAuthor = checkAuthor(req, authorId, AuthorError.UPDATE_ERROR);

        try {
            if (isAuthor) await PostEntity.update({ id: postId }, update);
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
}
