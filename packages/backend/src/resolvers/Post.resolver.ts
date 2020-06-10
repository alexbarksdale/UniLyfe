import { Resolver, Query, Mutation, Arg, Int } from 'type-graphql';

import { PostEntity } from '../entity/Post.entity';
import { UserEntity } from '../entity/User.entity';
import { PostUpdateInput } from './types/post.types';
import { logger } from '../utils/logger.utils';

// TODO: Secure the queries and mutations after testing
@Resolver()
export class PostResolver {
    @Query(() => PostEntity)
    async getPost(@Arg('postId', () => Int) postId: number): Promise<PostEntity> {
        if (!postId) throw new Error('You must provide a postId!');

        const post = await PostEntity.findOne(postId, { relations: ['author'] });
        if (!post) throw new Error(`Unable to find post with postId: ${postId}`);

        return post;
    }

    @Mutation(() => PostEntity)
    async createPost(
        @Arg('title') title: string,
        @Arg('content') content: string,
        @Arg('email') email: string
    ): Promise<PostEntity> {
        if (!title || !content || !email) throw new Error('Missing fields!');

        const postAuthor = await UserEntity.findOne({ where: { email } });
        if (!postAuthor) throw new Error('Unable to find author!');

        // Create new post
        const post = PostEntity.create();
        post.title = title;
        post.content = content;
        post.author = postAuthor;

        try {
            await PostEntity.save(post);
        } catch (err) {
            logger.error('Unable to save post! Error: ', err);
            throw new Error(`Unable to save post! ${err}`);
        }

        return post;
    }

    @Mutation(() => Boolean)
    async updatePost(
        @Arg('postId', () => Int) postId: number,
        @Arg('update', () => PostUpdateInput) update: PostUpdateInput
    ): Promise<boolean> {
        if (!postId) throw new Error('You must provide a postId!');

        try {
            await PostEntity.update({ id: postId }, update);
        } catch (err) {
            logger.error(`Failed to update post with postId: ${postId}! Error: `, err);
            throw new Error('Unable to update post!');
        }

        return true;
    }

    @Mutation(() => Boolean)
    async deletePost(@Arg('postId', () => Int) postId: number): Promise<boolean> {
        if (!postId) throw new Error('You must provide a postId!');

        try {
            await PostEntity.delete({ id: postId });
        } catch (err) {
            logger.error(`Failed to delete post with postId: ${postId}! Error: `, err);
            throw new Error('Failed to delete post!');
        }

        return true;
    }
}
