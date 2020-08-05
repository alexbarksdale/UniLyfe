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

        // This RegEx expression looks for two '.' in a domain.
        // Some schools use longer emails (i.e something.school.edu) and I need to grab
        // the school abbreviation. This isn't the best system to do this, but it's
        // the best I can do with limited resources regarding building a university email
        // checker from a json file. This is necessary because the site displays the school name
        // in a abbreviated way. i.e example@ttu.edu (Texas Tech University) = TTU
        // I know there will a problem if there is an even longer email, but that's a problem for another day.
        const checkLongDomain = /^(?:.*?\.){2}(.*)$/gm;
        const found = userUni.domains[0].match(checkLongDomain);

        let uniName: string;
        if (found) {
            uniName = userUni.domains[0].split('.')[1].toUpperCase();
        } else {
            uniName = userUni.domains[0].split('.')[0].toUpperCase();
        }

        // Create a new user
        const user = UserEntity.create({
            email,
            username: shortUid(),
            password: hashedPassword,
            university: userUni,
            universityName: uniName,
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

        const validPassword: boolean = await compare(password, user.password);
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
    async updateAccount(
        @Arg('userId') userId: number,
        @Arg('profileImg', { nullable: true }) profileImg: string,
        @Arg('currentPassword', { nullable: true }) currentPassword: string,
        @Arg('newPassword', { nullable: true }) newPassword: string
    ) {
        if (!userId) throw new Error('You must include a the userId');

        const user = await UserEntity.findOne({ where: { id: userId } });
        if (!user) throw new Error('Unable to find user!');

        if (profileImg) {
            try {
                await UserEntity.update(userId, { profileImg });
            } catch (err) {
                logger.error('Unable to save avatar!', err);
                throw new Error('Unable to save avatar!');
            }
        }

        if (currentPassword && newPassword) {
            const validPassword: boolean = await compare(currentPassword, user.password);
            if (!validPassword) throw new Error('Password is incorrect!');

            let hashedPassword;
            try {
                hashedPassword = await hash(newPassword, 12);
            } catch (err) {
                logger.error('Failed to hash password', err);
                throw new Error('Failed to hash password');
            }

            try {
                await UserEntity.update(userId, { password: hashedPassword });
            } catch (err) {
                logger.error('Unable to update account!', err);
                throw new Error('Unable to update account!');
            }
        } else if (!currentPassword && newPassword) {
            throw new Error('You must provide your current password!');
        }
        return true;
    }

    @Mutation(() => Boolean)
    logout(@Ctx() { res }: Context): boolean {
        res.clearCookie('trident', { path: '/auth/refresh' });
        return true;
    }
}
