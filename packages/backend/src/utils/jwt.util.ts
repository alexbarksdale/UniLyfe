import { Response } from 'express';
import { sign } from 'jsonwebtoken';

import { getConnection } from 'typeorm';

import { UserEntity } from '../entity/User.entity';

export const genAccessToken = (user: UserEntity) => {
    return sign(
        { userId: user.id, userEmail: user.email },
        process.env.ACCESS_TOKEN_SECRET!,
        {
            expiresIn: '13m',
        }
    );
};

export const genRefreshToken = (user: UserEntity) => {
    return sign(
        { userId: user.id, userEmail: user.email, tokenVersion: user.tokenVersion },
        process.env.REFRESH_TOKEN_SECRET!,
        {
            expiresIn: '5d',
        }
    );
};

export const sendRefreshToken = (res: Response, token: string) => {
    res.cookie('trident', token, {
        httpOnly: true,
        path: '/auth/refresh',
    });
};

/*
 * The UserEntity contains a 'tokenVersion' which we use verify that the user hasn't
 * had their token revoked. By calling this function, we increase the user's tokenVersion by one
 * and when the refresh token route (/auth/refresh_token) is called, we check if
 * the user's 'tokenVersion' is equal to the refresh token's 'tokenVersion'.
 * If they aren't equal we don't send the user a new refresh token, essentially
 * revoking their token. The refresh token we generate contains the 'tokenVersion'
 * which you'll find above in 'genRefreshToken()'. Note that the accessToken does
 * not contain the tokenVersion.
 *
 * Use this function when creating something like forgotPassword or something where
 * you need to revoke a users's access to your application.
 */
export const revokeRefreshToken = async (userId: number): Promise<boolean> => {
    try {
        await getConnection()
            .getRepository(UserEntity)
            .increment({ id: userId }, 'tokenVersion', 1);
    } catch (_) {
        throw new Error('Unable to revoke token from user!');
    }

    return true;
};
