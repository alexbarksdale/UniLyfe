import express, { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { UserEntity } from '../entity/User.entity';
import { genAccessToken, genRefreshToken, sendRefreshToken } from '../utils/jwt.util';
import { logger } from '../utils/logger.util';

export const authRouter = express.Router();

authRouter.get('/confirmation/:token', async (req: Request, res: Response) => {
    try {
        const { userId }: any = verify(req.params.token, process.env.EMAIL_TOKEN_SECRET!);

        const user = await UserEntity.findOne({ where: { id: userId } });
        if (!user) throw new Error('Unable to find user!');

        user.confirmed = true;
        await user.save();
    } catch (err) {
        logger.error('Unable to confirm token!', err);
        throw new Error('Unable to confirm token!');
    }
    return res.redirect(`${process.env.WEB_IP}/login`);
});

authRouter.post('/auth/refresh', async (req: Request, res: Response) => {
    const token = req.cookies.trident;
    if (!token) return res.send({ authenticated: false, accessToken: '' });

    let payload: any;
    try {
        payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
    } catch (err) {
        return res.status(401).send({ authenticated: false, accessToken: '' });
    }

    // Token is valid
    const user = await UserEntity.findOne({ id: payload.userId });
    if (!user) return res.status(404).send({ authenticated: false, accessToken: '' });

    // Verify that the user's token hasn't been revoked
    if (user.tokenVersion !== payload.tokenVersion) {
        return res.status(404).send({ authenticated: false, accessToken: '' });
    }

    // User exists, sending tokens
    sendRefreshToken(res, genRefreshToken(user));
    return res.send({ authenticated: true, accessToken: genAccessToken(user) });
});
