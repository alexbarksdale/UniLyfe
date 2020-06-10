import { Resolver, Query, Mutation, Arg } from 'type-graphql';

import { logger } from '../utils/logger.utils';
import { CommentEntity } from '../entity/Comment.entity';
import { UserEntity } from '../entity/User.entity';

// Note to self: When interating over the comments, to find the replies take the id of the comment
// and find any "key": value i.e: '"replies": (id)' with the matching id to the comment.

@Resolver()
export class CommentResolver {
    @Query(() => [CommentEntity])
    async getPostComments(@Arg('postId') postId: number): Promise<CommentEntity[]> {
        if (!postId) throw new Error('You must provide a postId!');
        return CommentEntity.find({ where: { postId }, relations: ['author'] });
    }

    @Mutation(() => CommentEntity)
    async createComment(
        @Arg('postId') postId: number,
        @Arg('authorEmail') authorEmail: string,
        @Arg('content') content: string,
        @Arg('replyId', { nullable: true }) replyId: number
    ): Promise<CommentEntity> {
        if (!postId || !authorEmail) throw new Error('You must provide a postId and authorEmail');

        const author = await UserEntity.findOne({ where: { email: authorEmail } });
        if (!author) throw new Error('Unable to find author!');

        // Create comment
        const comment = CommentEntity.create();
        comment.postId = postId;
        comment.author = author;
        comment.content = content;

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

    // TODO: deleteComment
}
