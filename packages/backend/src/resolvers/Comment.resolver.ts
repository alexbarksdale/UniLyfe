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
    /** recentComments handles fetching the most recent comments made. */
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

    /** getPostComments handles fetching all comments for a given post.
     * @param {number} postId The ID of the post.
     * */
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

    /** createComment handles creating a comment.
     * @param {Publisher} publish A publisher to notify all subscribers.
     * @param {number}    postId The ID of the post.
     * @param {number}    authorId The ID of the author.
     * @param {string}    content The content of the comment.
     * @param {number}    replyId The reply ID.
     * */
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

    /** updateComment handles updating a comment.
     * @param {number}   commentId The comment ID.
     * @param {number}   authorId The ID of the author.
     * @param {string}   content The content of the comment.
     * @param {Context}  req Represents the request made.
     * */
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

    /** deleteComment handles deleting a comment.
     * @param {number}   commentId The comment ID.
     * @param {number}   authorId The ID of the author.
     * @param {Context}  req Represents the request made.
     * */
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
