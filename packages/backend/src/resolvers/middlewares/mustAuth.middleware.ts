import { MiddlewareFn } from 'type-graphql';
import { verify } from 'jsonwebtoken';

import { AuthContext } from '../../context/auth.context';
import { handleError } from '../../utils/errors.utils';
import { AuthErrorTypes } from '../../utils/types/error.types';

interface PayloadInterface {
    userId: string;
    userEmail: string;
}

export const mustAuth: MiddlewareFn<AuthContext> = ({ context }, next) => {
    const authorized = context.req.headers.authorization;
    if (!authorized) return handleError(AuthErrorTypes.NOT_AUTHENTICATED);

    // We're splitting 'Bearer (token)' from the Authorization header.
    const token = authorized.split(' ')[1];
    if (!token) return handleError(AuthErrorTypes.MISSING_TOKEN);

    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    context.payload = payload as PayloadInterface;

    return next();
};
