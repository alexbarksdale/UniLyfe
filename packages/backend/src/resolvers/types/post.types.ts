import { ObjectType, Field, Int } from 'type-graphql';

// Used to dictate what subscription topic to talk to
export enum PostTopics {
    NEW_STATS = 'NEW_STATS',
}

export type PostStatPayload = {
    postId: number;
    likes?: number;
    views?: number;
};

@ObjectType()
export class PostStat {
    @Field(() => Int)
    postId!: number;

    @Field(() => Int, { nullable: true })
    likes?: number;

    @Field(() => Int, { nullable: true })
    views?: number;
}
