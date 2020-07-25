import { ObjectType, Field } from 'type-graphql';

import { CommentEntity } from '../../entity/Comment.entity';
import { PostEntity } from '../../entity/Post.entity';

// Used to dictate what subscription topic to talk to
export enum CommentTopics {
    NEW_COMMENT = 'NEW_COMMENT',
}

export type CommentPayload = {
    comment: CommentEntity;
    postId: number;
};

@ObjectType({
    description: 'Response for recent comments query.',
})
export class CommentResponse {
    @Field(() => [CommentEntity])
    comments!: CommentEntity[];

    @Field(() => [PostEntity])
    posts!: Promise<PostEntity>[];
}

@ObjectType({
    description: 'Response for comment subscription.',
})
export class CommentSubResponse {
    @Field(() => CommentEntity)
    comment!: CommentEntity;

    @Field(() => PostEntity)
    post!: PostEntity;
}
