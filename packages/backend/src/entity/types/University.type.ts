import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class University {
    @Field(() => [String])
    webPages!: Array<string>;

    @Field()
    name!: string;

    @Field()
    alphaTwoCode!: string;

    @Field(() => String, { nullable: true })
    stateProvince?: string | null;

    @Field(() => [String])
    domains!: Array<string>;

    @Field()
    country!: string;
}
