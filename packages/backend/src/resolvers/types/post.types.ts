import { ObjectType, Field } from 'type-graphql';

import { PostEntity } from '../../entity/Post.entity';

// Used to dictate what subscription topic to talk to
export enum PostTopics {
    NEW_STATS = 'NEW_STATS',
}

export type PostStatPayload = {
    postId: number;
};

@ObjectType({
    description:
        'Response for updating a post. Returns the post updated and if the post was updated.',
})
export class UpdateResponse {
    @Field(() => PostEntity)
    post!: PostEntity;

    @Field()
    liked!: boolean;
}
