import { Resolver, Query, Mutation, Arg, Ctx } from 'type-graphql';
import { hash, compare } from 'bcrypt';
import { ApolloError } from 'apollo-server-express';
import ShortUniqueId from 'short-unique-id';
import { verify } from 'jsonwebtoken';

import { UserEntity } from '../entity/User.entity';
import { Context } from '../context/context';
import { UniEmail, RegisterResponse, LoginResponse } from './types/auth.types';
import { genAccessToken, genRefreshToken, sendRefreshToken } from '../utils/jwt.util';
import { handleError, AuthError } from '../utils/errors.util';
import uni_emails from '../assets/uni_emails.json';

// TODO: Secure the queries and mutations after testing
@Resolver()
export class AuthResolver {
    // REMINDER: Remove this before production. This is only for testing.
    @Query(() => [UserEntity])
    users(): Promise<UserEntity[]> {
        return UserEntity.find();
    }

    @Query(() => UserEntity, { nullable: true })
    async me(@Ctx() { req }: Context): Promise<UserEntity | ApolloError | null> {
        const authorized = req.headers.authorization;
        if (!authorized) return null;

        const token = authorized.split(' ')[1];
        if (!token) return handleError(AuthError.MISSING_TOKEN);

        const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);

        const user = await UserEntity.findOne({ where: { id: payload.userId } });
        if (!user) return null;

        return user;
    }

    @Mutation(() => RegisterResponse)
    async register(
        @Arg('email') email: string,
        @Arg('password') password: string
    ): Promise<RegisterResponse | ApolloError> {
        if (!email || !password) return handleError(AuthError.MISSING_CREDENTIALS);

        const doesUserExist = await UserEntity.findOne({ where: { email } });
        if (doesUserExist) return handleError(AuthError.USER_EXISTS);

        const validUniEmail: UniEmail | undefined = uni_emails.find((uniEmail) => {
            return email.includes(uniEmail.domains[0]);
        });

        if (typeof validUniEmail === 'undefined') {
            return handleError(AuthError.INVALID_UNI_EMAIL);
        }

        // Function to create a unique id that acts as a user's username
        const shortUid = new ShortUniqueId();

        // Create a new user
        const user = UserEntity.create({
            email,
            username: shortUid(),
            password: await hash(password, 12),
        });

        try {
            await UserEntity.save(user);
        } catch (err) {
            return handleError(AuthError.REGISTRATION_FAIL);
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
        @Ctx() { res }: Context
    ): Promise<LoginResponse | ApolloError> {
        if (!email || !password) return handleError(AuthError.MISSING_CREDENTIALS);

        const user = await UserEntity.findOne({ where: { email } });
        if (!user) return handleError(AuthError.INVALID_CREDENTIALS);

        const validPassword = await compare(password, user.password);
        if (!validPassword) return handleError(AuthError.INVALID_CREDENTIALS);

        // User is authenticated
        sendRefreshToken(res, genRefreshToken(user));

        return {
            user,
            accessToken: genAccessToken(user),
        };
    }

    @Mutation(() => Boolean)
    logout(@Ctx() { res }: Context): boolean {
        res.clearCookie('trident', { path: '/auth/refresh' });
        return true;
    }
}
