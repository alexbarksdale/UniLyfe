import { Resolver, Query, Mutation, Arg } from 'type-graphql';

import { logger } from '../utils/logger.utils';
import { CommentEntity } from '../entity/Comment.entity';
import { UserEntity } from '../entity/User.entity';

// Note to self: When interating over the comments, to find the replies take the id of the comment
// and find any "key": value i.e: '"replies": (id)' with the matching id to the comment.

@Resolver()
export class CommentResolver {
    @Query(() => [CommentEntity])
    async fetchComments() {
        return CommentEntity.find({ relations: ['author'] });
    }

    // TODO: getPostComments

    @Mutation(() => Boolean)
    async createComment(
        @Arg('postId') postId: number,
        @Arg('authorEmail') authorEmail: string,
        @Arg('content') content: string,
        @Arg('replyId', { nullable: true }) replyId: number
    ) {
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

        return true;
    }

    // TODO: deleteComment
}
