import { MiddlewareFn } from 'type-graphql';
import { verify } from 'jsonwebtoken';

import { Context } from '../../context/context';
import { handleError, AuthError } from '../../utils/errors.util';

type Payload = {
    userId: string;
    userEmail: string;
};

export const mustAuth: MiddlewareFn<Context> = ({ context }, next) => {
    const authorized = context.req.headers.authorization;
    if (!authorized) return handleError(AuthError.NOT_AUTHENTICATED);

    // We're splitting 'Bearer (token)' from the Authorization header.
    const token = authorized.split(' ')[1];
    if (!token) return handleError(AuthError.MISSING_TOKEN);

    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    context.payload = payload as Payload;

    return next();
};
