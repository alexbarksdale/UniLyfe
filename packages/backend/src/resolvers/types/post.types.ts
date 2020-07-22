// import { ObjectType, Field, Int } from 'type-graphql';

// Used to dictate what subscription topic to talk to
export enum PostTopics {
    NEW_STATS = 'NEW_STATS',
}

export type PostStatPayload = {
    postId: number;
};

