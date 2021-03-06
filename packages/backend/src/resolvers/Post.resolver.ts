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
import { PostStatPayload, PostTopics, UpdateResponse } from './types/post.types';
import { OurPicks } from '../our-picks/OurPicks';

// TODO: Secure the queries and mutations after testing
@Resolver()
export class PostResolver {
    op: OurPicks;

    constructor() {
        this.op = new OurPicks();
    }

    /** ourPicks handles querying our picks posts. */
    @Query(() => [PostEntity])
    ourPicks(): PostEntity[] {
        return this.op.posts;
    }

    /** getPosts handles querying all posts. */
    @Query(() => [PostEntity])
    async getPosts(): Promise<PostEntity[]> {
        let posts: PostEntity[];
        try {
            posts = await PostEntity.find({
                relations: ['author', 'category', 'likes'],
                order: {
                    createdAt: 'DESC',
                },
            });
        } catch (err) {
            logger.error('Unable to query posts', err);
            throw new Error('Unable to query posts');
        }
        return posts;
    }

    /** getPost handles querying a post.
     * @param {number} postId The post ID>
     * */
    @Query(() => PostEntity)
    async getPost(@Arg('postId', () => Int) postId: number): Promise<PostEntity> {
        if (!postId) throw new Error('You must provide a postId!');

        const post = await PostEntity.findOne(postId, {
            relations: ['author', 'category', 'likes'],
        });
        if (!post) throw new Error(`Unable to find post with postId: ${postId}`);

        return post;
    }

    /** createTextPost handles creating a post.
     * @param {string}   title        The title of the post.
     * @param {PostType} type         The type of post.
     * @param {string}   content      The content of the post.
     * @param {number}   authorId     The ID of the author.
     * @param {string?}  thumbnail    A link to the thumbnail upload.
     * @param {string}   categoryName The name of the category.
     * */
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

    /** updatePostStats handles updating the stats of a post.
     * @param {Publisher} publish  The publisher to notify subscribers.
     * @param {number}    postId   The ID of the post.
     * @param {number?}   userId   The ID of the user.
     * @param {number?}   views    The number of views a post has.
     * */
    @Mutation(() => UpdateResponse)
    // TODO: Apply auth middleware
    async updatePostStats(
        @PubSub(PostTopics.NEW_STATS) publish: Publisher<PostStatPayload>,
        @Arg('postId', () => Int) postId: number,
        @Arg('userId', () => Int, { nullable: true }) userId: number,
        @Arg('views', () => Int, { nullable: true }) views: number
    ): Promise<UpdateResponse> {
        if (!postId) throw new Error('You must provide a postId!');

        const post = await PostEntity.findOne({
            where: { id: postId },
            relations: ['likes'],
        });
        if (!post) throw new Error('Unable to find post!');

        try {
            // If a userId is passed then we're liking a post.
            if (userId) {
                const user = await UserEntity.findOne({
                    where: { id: userId },
                    relations: ['likes'],
                });
                if (!user) throw new Error('Unable to find user!');

                // Check if the user has already liked the post.
                for await (const like of user.likes) {
                    if (like.id === post.id) {
                        post.likes = post.likes.filter(
                            (postLike) => postLike.id !== user.id
                        );
                        await post.save();
                        await publish({ postId });
                        return {
                            post,
                            liked: false,
                        };
                    }
                }

                // The user hasn't liked the post before.
                // Add to user's liked posts.
                user.likes.push(post);
                await user.save();

                // Add like to post.
                post.likes.push(user);
                await post.save();
                // If we're not liking the post, then just update the view count.
            } else {
                post.views = views;
                await post.save();
            }
        } catch (err) {
            logger.error(
                `Failed to update post stats with postId: ${postId}! Error: `,
                err
            );
            throw new Error('Unable to update post stats!');
        }

        // Publish new information to our subscribers.
        await publish({ postId });
        return {
            post,
            liked: true,
        };
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
        const post = await PostEntity.findOne(postId, { relations: ['likes'] });
        if (!post) throw new Error(`Unable to find post with postId: ${postId}`);
        return post;
    }
}
