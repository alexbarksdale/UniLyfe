import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class University {
    @Field(() => [String])
    webPages!: string[];

    @Field()
    name!: string;

    @Field()
    alphaTwoCode!: string;

    @Field(() => String, { nullable: true })
    stateProvince?: string | null;

    @Field(() => [String])
    domains!: string[];

    @Field()
    country!: string;
}
