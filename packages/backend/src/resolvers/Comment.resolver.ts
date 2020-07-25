import {
    Resolver,
    Query,
    Mutation,
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
    @Query(() => CommentResponse)
    @Subscription(() => CommentResponse, { topics: CommentTopics.NEW_COMMENT })
    async recentComments(): Promise<CommentResponse> {
        const comments = await CommentEntity.find({
            take: 5,
            order: {
                createdAt: 'DESC',
            },
            relations: ['author'],
        });
        if (!comments) throw new Error('Unable to find comments!');

        // Find posts associated with the comment so we can route the user to it on the web app.
        const posts = comments.map(async (comment) => {
            const post = await PostEntity.findOne({
                where: { id: comment.postId },
                relations: ['category'],
            });
            if (!post || typeof post === 'undefined') {
                throw new Error('Unable to find post!');
            }
            return post;
        });

        return {
            comments,
            posts,
        };
    }

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
}
