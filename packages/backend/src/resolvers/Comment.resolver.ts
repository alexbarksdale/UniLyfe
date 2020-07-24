import {
    Resolver,
    Query,
    Mutation,
    Root,
    Subscription,
    Arg,
    Int,
    Ctx,
    PubSub,
    Publisher,
} from 'type-graphql';

import { CommentEntity } from '../entity/Comment.entity';
import { UserEntity } from '../entity/User.entity';
import { Context } from '../context/context';
import { logger } from '../utils/logger.util';
import { checkAuthor, AuthorError } from '../utils/checkAuthor.util';
import { CommentPayload, CommentTopics, CommentResponse } from './types/comment.types';
import { PostEntity } from '../entity/Post.entity';

// TODO: Secure the queries and mutations after testing
@Resolver()
export class CommentResolver {
    @Query(() => [CommentEntity])
    async getPostComments(
        @Arg('postId', () => Int) postId: number
    ): Promise<CommentEntity[]> {
        if (!postId) throw new Error('You must provide a postId!');
        return CommentEntity.find({
            where: { postId },
            relations: ['author'],
            order: {
                // THIS IS A BUG
                createdAt: 'ASC',
            },
        });
    }

    @Mutation(() => CommentEntity)
    // TODO: Apply auth middleware
    async createComment(
        @PubSub(CommentTopics.NEW_COMMENT) publish: Publisher<CommentPayload>,
        @Arg('postId', () => Int) postId: number,
        @Arg('authorId') authorId: number,
        @Arg('content') content: string,
        @Arg('replyId', () => Int, { nullable: true }) replyId: number
    ): Promise<CommentEntity> {
        if (!postId || !authorId) {
            throw new Error('You must provide a postId and authorId');
        }

        const author = await UserEntity.findOne({ where: { id: authorId } });
        if (!author) throw new Error('Unable to find author!');

        // Create comment
        const comment = CommentEntity.create({
            postId,
            author,
            content,
        });

        // Check if comment is a reply to another comment
        if (replyId) comment.replyId = replyId;

        try {
            await CommentEntity.save(comment);
        } catch (err) {
            logger.error('Unable to save comment', err);
            throw new Error('Unable to save comment!');
        }

        await publish({ comment, postId });
        return comment;
    }

    @Mutation(() => Boolean)
    // TODO: Apply auth middleware
    async updateComment(
        @Arg('commentId', () => Int) commentId: number,
        @Arg('authorId', () => Int) authorId: number,
        @Arg('content') content: string,
        @Ctx() { req }: Context
    ): Promise<boolean> {
        if (!commentId || !content || !authorId) {
            throw new Error('You must provide the commentId, authorId, and content!');
        }

        const isAuthor = checkAuthor(req, authorId, AuthorError.UPDATE_ERROR);

        try {
            if (isAuthor) await CommentEntity.update({ id: commentId }, { content });
        } catch (err) {
            logger.error('Unable to update comment!', err);
            throw new Error('Unable to update comment!');
        }
        return true;
    }

    @Mutation(() => Boolean)
    // TODO: Apply auth middleware
    async deleteComment(
        @Arg('commentId', () => Int) commentId: number,
        @Arg('authorId', () => Int) authorId: number,
        @Ctx() { req }: Context
    ): Promise<boolean> {
        if (!commentId || !authorId) {
            throw new Error('You must provide the commentId and authorId!');
        }

        const isAuthor = checkAuthor(req, authorId, AuthorError.DELETE_ERROR);

        try {
            if (isAuthor) await CommentEntity.delete({ id: commentId });
        } catch (err) {
            logger.error('Unable to delete comment!', err);
            throw new Error('Unable to delete comment!');
        }

        return true;
    }

    @Subscription(() => CommentResponse, { topics: CommentTopics.NEW_COMMENT })
    async recentCommentSub(
        @Root() { comment, postId }: CommentPayload
    ): Promise<CommentResponse> {
        const post = await PostEntity.findOne({
            where: { id: postId },
            relations: ['category'],
        });
        if (!post) throw new Error(`Unable to find post with postId: ${postId}`);
        return {
            comment,
            post,
        };
    }
}
