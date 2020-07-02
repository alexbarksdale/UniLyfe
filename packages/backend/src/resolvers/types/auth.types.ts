import { Field, ObjectType } from 'type-graphql';

import { UserEntity } from '../../entity/User.entity';

export type UniEmail = {
    web_pages: string[];
    name: string;
    alpha_two_code: string;
    state_province: string | null;
    domains: string[];
    country: string;
};

@ObjectType({
    description:
        'Provides a boolean to determine if the user was registered and an optional message of choice.',
})
export class RegisterResponse {
    @Field()
    registerMsg?: string;

    @Field()
    registerSuccess!: boolean;
}

@ObjectType({
    description: "Provides the user's information as well as a JWT access token.",
})
export class LoginResponse {
    @Field(() => UserEntity)
    user!: UserEntity;

    @Field()
    accessToken!: string;
}
