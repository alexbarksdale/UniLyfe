import { Resolver, Query, Mutation, Arg, Ctx } from 'type-graphql';
import { hash, compare } from 'bcrypt';
import { ApolloError } from 'apollo-server-express';
import ShortUniqueId from 'short-unique-id';

import { UserEntity } from '../entity/User.entity';
import { AuthContext } from '../context/auth.context';
import { UniEmail, RegisterResponse, LoginResponse } from './types/auth.types';
import { genAccessToken, genRefreshToken, sendRefreshToken } from '../utils/jwt.utils';
import { handleError } from '../utils/errors.utils';
import { AuthErrorTypes } from '../utils/types/error.types';
import uni_emails from '../../assets/uni_emails.json';

// TODO: Secure the queries and mutations after testing
@Resolver()
export class AuthResolver {
    // REMINDER: Remove this before production. This is only for testing.
    @Query(() => [UserEntity])
    users(): Promise<UserEntity[]> {
        return UserEntity.find();
    }

    @Query(() => UserEntity)
    async getUser(@Arg('email') email: string): Promise<UserEntity> {
        if (!email) throw new Error("You must provide the user's email!");

        const user = await UserEntity.findOne({ where: { email } });
        if (!user) throw new Error('Unable to find user!');

        return user;
    }

    @Mutation(() => RegisterResponse)
    async register(
        @Arg('email') email: string,
        @Arg('password') password: string
    ): Promise<RegisterResponse | ApolloError> {
        if (!email || !password) return handleError(AuthErrorTypes.MISSING_CREDENTIALS);

        const doesUserExist = await UserEntity.findOne({ where: { email } });
        if (doesUserExist) return handleError(AuthErrorTypes.USER_EXISTS);

        const validUniEmail: UniEmail | undefined = uni_emails.find((uniEmail) => {
            return email.includes(uniEmail.domains[0]);
        });

        if (typeof validUniEmail === 'undefined') {
            return handleError(AuthErrorTypes.INVALID_UNI_EMAIL);
        }

        // Create a new user
        const user = UserEntity.create();
        // Function to create a unique id that acts as a user's username
        const shortUid = new ShortUniqueId();

        user.email = email;
        user.username = shortUid();
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
    logout(@Ctx() { res }: AuthContext): boolean {
        res.clearCookie('triton');
        return true;
    }
}
