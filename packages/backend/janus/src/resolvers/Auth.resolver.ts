import { Resolver, Query, Mutation, Arg, Ctx } from 'type-graphql';
import { hash, compare } from 'bcrypt';
import { ApolloError } from 'apollo-server-express';

import { UserEntity } from '../entity/User.entity';
import { AuthContext } from '../context/auth.context';
import { RegisterResponse, LoginResponse } from './types/auth.types';
import { genAccessToken, genRefreshToken, sendRefreshToken } from '../utils/jwt.utils';
import { handleError } from '../utils/errors.utils';
import { AuthErrorTypes } from '../utils/types/error.types';

@Resolver()
export class AuthResolver {
    @Query(() => [UserEntity])
    users() {
        return UserEntity.find();
    }

    @Mutation(() => RegisterResponse)
    async register(
        @Arg('email') email: string,
        @Arg('password') password: string
    ): Promise<RegisterResponse | ApolloError> {
        if (!email || !password) return handleError(AuthErrorTypes.MISSING_CREDENTIALS);

        const doesUserExist = await UserEntity.findOne({ where: { email } });
        if (doesUserExist) return handleError(AuthErrorTypes.USER_EXISTS);

        // Create a new user
        const user = UserEntity.create();
        user.email = email;
        user.password = await hash(password, 12);

        try {
            await UserEntity.save(user);
        } catch (err) {
            return handleError(AuthErrorTypes.REGISTRATION_FAIL);
        }

        return {
            registerMsg: 'Please check your email to confirm your registration.',
            registerSuccess: true,
        };
    }

    @Mutation(() => LoginResponse)
    async login(
        @Arg('email') email: string,
        @Arg('password') password: string,
        @Ctx() { res }: AuthContext
    ): Promise<LoginResponse | ApolloError> {
        if (!email || !password) return handleError(AuthErrorTypes.MISSING_CREDENTIALS);

        const user = await UserEntity.findOne({ where: { email } });
        if (!user) return handleError(AuthErrorTypes.INVALID_CREDENTIALS);

        const validPassword = await compare(password, user.password);
        if (!validPassword) return handleError(AuthErrorTypes.INVALID_CREDENTIALS);

        // User is authenticated
        sendRefreshToken(res, genRefreshToken(user));

        return {
            user,
            accessToken: genAccessToken(user),
        };
    }

    @Mutation(() => Boolean)
    logout(@Ctx() { res }: AuthContext) {
        res.clearCookie('triton');
        return true;
    }
}
