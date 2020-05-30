import { Field, ObjectType } from 'type-graphql';
import { UserEntity } from '../../entity/User.entity';

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
    @Field()
    user!: UserEntity;

    @Field()
    accessToken!: string;
}

