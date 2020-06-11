import { MiddlewareFn } from 'type-graphql';
import { verify } from 'jsonwebtoken';

import { ReqResContext } from '../../context/reqres.context';
import { handleError, AuthError } from '../../utils/errors.util';

interface PayloadInterface {
    userId: string;
    userEmail: string;
}

export const mustAuth: MiddlewareFn<ReqResContext> = ({ context }, next) => {
    const authorized = context.req.headers.authorization;
    if (!authorized) return handleError(AuthError.NOT_AUTHENTICATED);

    // We're splitting 'Bearer (token)' from the Authorization header.
    const token = authorized.split(' ')[1];
    if (!token) return handleError(AuthError.MISSING_TOKEN);

    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    context.payload = payload as PayloadInterface;

    return next();
};
