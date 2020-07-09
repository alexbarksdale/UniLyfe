import { Resolver, Query, Mutation, Arg, Int, Ctx } from 'type-graphql';

import { CommentEntity } from '../entity/Comment.entity';
import { UserEntity } from '../entity/User.entity';
import { Context } from '../context/context';
import { logger } from '../utils/logger.util';
import { checkAuthor, AuthorError } from '../utils/checkAuthor.util';

// Note to self: When interating over the comments, to find the replies take the id of the comment
// and find any "key": value i.e: '"replies": (id)' with the matching id to the comment.

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
                createdAt: 'ASC',
            },
        });
    }

    @Mutation(() => CommentEntity)
    // TODO: Apply auth middleware
    async createComment(
        @Arg('postId', () => Int) postId: number,
        @Arg('authorEmail') authorEmail: string,
        @Arg('content') content: string,
        @Arg('replyId', () => Int, { nullable: true }) replyId: number
    ): Promise<CommentEntity> {
        if (!postId || !authorEmail) {
            throw new Error('You must provide a postId and authorEmail');
        }

        const author = await UserEntity.findOne({ where: { email: authorEmail } });
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
