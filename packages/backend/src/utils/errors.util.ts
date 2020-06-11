import { ApolloError } from 'apollo-server-express';

export enum AuthError {
    USER_EXISTS = 'USER_EXISTS',
    REGISTRATION_FAIL = 'REGISTRATION_FAIL',
    INVALID_UNI_EMAIL = 'INVALID_UNI_EMAIL',
    INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
    MISSING_CREDENTIALS = 'MISSING_CREDENTIALS',
    NOT_AUTHENTICATED = 'NOT_AUTHENTICATED',
    MISSING_TOKEN = 'MISSING_TOKEN',
}

function userExists(): ApolloError {
    throw new ApolloError(AuthError.USER_EXISTS, '406', {
        error: {
            title: 'User Exists',
            description: 'Email is already registered.',
        },
    });
}

function registrationFail(): ApolloError {
    throw new ApolloError(AuthError.REGISTRATION_FAIL, '500', {
        error: {
            title: 'Registration Fail',
            description: 'Failed to register user.',
        },
    });
}

function missingCrendetials(): ApolloError {
    throw new ApolloError(AuthError.MISSING_CREDENTIALS, '406', {
        error: {
            title: 'Missing Credentials',
            description: 'Required fields are missing!',
        },
    });
}

function invalidUniEmail(): ApolloError {
    throw new ApolloError(AuthError.INVALID_UNI_EMAIL, '401', {
        error: {
            title: 'Invalid Uni Email',
            description: "Couldn't find a valid university email!",
        },
    });
}

function invalidCredentials(): ApolloError {
    throw new ApolloError(AuthError.MISSING_CREDENTIALS, '401', {
        error: {
            title: 'Invalid Credentials',
            description: 'Email or password is incorrect!',
        },
    });
}

function notAuthenticated(): ApolloError {
    throw new ApolloError(AuthError.NOT_AUTHENTICATED, '401', {
        error: {
            title: 'Not Authenticated',
            description: 'You are not authorized!',
        },
    });
}

function missingToken(): ApolloError {
    throw new ApolloError(AuthError.MISSING_TOKEN, '406', {
        error: {
            title: 'Missing Token',
            description: "You haven't provided a token or valid format. Format: 'Bearer (token)'",
        },
    });
}

export async function handleError(error: AuthError) {
    switch (error) {
        case AuthError.USER_EXISTS:
            return userExists();
        case AuthError.REGISTRATION_FAIL:
            return registrationFail();
        case AuthError.MISSING_CREDENTIALS:
            return missingCrendetials();
        case AuthError.INVALID_UNI_EMAIL:
            return invalidUniEmail();
        case AuthError.INVALID_CREDENTIALS:
            return invalidCredentials();
        case AuthError.NOT_AUTHENTICATED:
            return notAuthenticated();
        case AuthError.MISSING_TOKEN:
            return missingToken();
        default:
            throw new Error('Internal server error');
    }
}
