import { Resolver, Query, Mutation, Arg, Ctx } from 'type-graphql';
import { hash, compare } from 'bcrypt';
import { ApolloError } from 'apollo-server-express';
import ShortUniqueId from 'short-unique-id';
import { verify } from 'jsonwebtoken';

import { UserEntity } from '../entity/User.entity';
import { Context } from '../context/context';
import { RegisterResponse, LoginResponse } from './types/auth.types';
import { genAccessToken, genRefreshToken, sendRefreshToken } from '../utils/jwt.util';
import { handleError, AuthError } from '../utils/errors.util';
import { getAndValidateEmail, UniEmail, createConfirmation } from '../utils/email.util';
import { logger } from '../utils/logger.util';

// TODO: Secure the queries and mutations after testing
@Resolver()
export class AuthResolver {
    // REMINDER: Remove this before production. This is only for testing.
    @Query(() => [UserEntity])
    users(): Promise<UserEntity[]> {
        return UserEntity.find({
            relations: ['posts', 'likes'],
        });
    }

    // TODO: Remove, this is just for testing
    @Query(() => UserEntity)
    async getUser(@Arg('email') email: string): Promise<UserEntity> {
        if (!email) throw new Error("You must provide the user's email!");

        const user = await UserEntity.findOne({
            where: { email },
            relations: ['comments', 'posts', 'likes'],
        });
        if (!user) throw new Error('Unable to find user!');

        return user;
    }

    @Query(() => UserEntity, { nullable: true })
    async me(@Ctx() { req }: Context): Promise<UserEntity | ApolloError | null> {
        const authorized = req.headers.authorization;
        if (!authorized) return null;

        const token = authorized.split(' ')[1];
        if (!token) return handleError(AuthError.MISSING_TOKEN);

        const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);

        const user = await UserEntity.findOne({
            where: { id: payload.userId },
            relations: ['comments', 'posts', 'likes'],
        });
        if (!user) return null;

        return user;
    }

    @Mutation(() => RegisterResponse)
    async register(
        @Arg('email') email: string,
        @Arg('password') password: string,
        @Ctx() { transporter }: Context
    ): Promise<RegisterResponse | ApolloError> {
        if (!email || !password) return handleError(AuthError.MISSING_CREDENTIALS);

        const doesUserExist = await UserEntity.findOne({ where: { email } });
        if (doesUserExist) return handleError(AuthError.USER_EXISTS);

        let userUni: UniEmail;
        try {
            userUni = await getAndValidateEmail(email);
        } catch (err) {
            return handleError(AuthError.INVALID_UNI_EMAIL);
        }

        // Function to create a unique id that acts as a user's username
        const shortUid = new ShortUniqueId();

        let hashedPassword;
        try {
            hashedPassword = await hash(password, 12);
        } catch (err) {
            logger.error('Failed to hash password', err);
            throw new Error('Failed to hash password');
        }

        // Create a new user
        const user = UserEntity.create({
            email,
            username: shortUid(),
            password: hashedPassword,
            university: userUni,
            universityName: userUni.domains[0].split('.')[0].toUpperCase(),
        });

        try {
            await UserEntity.save(user);
        } catch (err) {
            return handleError(AuthError.REGISTRATION_FAIL);
        }

        createConfirmation(user.id, email, transporter);

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
    ): Promise<LoginResponse> {
        if (!email || !password) {
            throw new Error('You must provide an email and password!');
        }

        const user = await UserEntity.findOne({ where: { email }, relations: ['likes'] });
        if (!user) throw new Error('Email or password is incorrect!');

        const validPassword = await compare(password, user.password);
        if (!validPassword) throw new Error('Email or password is incorrect!');

        if (!user.confirmed) throw new Error('You must confirm your email!');

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
