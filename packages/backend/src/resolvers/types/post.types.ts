import { InputType, Field, Int } from 'type-graphql';

@InputType()
export class PostUpdateInput {
    @Field(() => String, { nullable: true })
    title?: string;

    @Field(() => String, { nullable: true })
    content?: string;

    @Field(() => Int, { nullable: true })
    upVotes?: number;

    @Field(() => Int, { nullable: true })
    downVotes?: number;
}
