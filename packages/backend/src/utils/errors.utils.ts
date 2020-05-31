import { ApolloError } from 'apollo-server-express';

import { AuthErrorTypes } from './types/error.types';

function userExists(): ApolloError {
    throw new ApolloError(AuthErrorTypes.USER_EXISTS, '406', {
        error: {
            title: 'User Exists',
            description: 'Email is already registered.',
        },
    });
}

function registrationFail(): ApolloError {
    throw new ApolloError(AuthErrorTypes.REGISTRATION_FAIL, '500', {
        error: {
            title: 'Registration Fail',
            description: 'Failed to register user.',
        },
    });
}

function missingCrendetials(): ApolloError {
    throw new ApolloError(AuthErrorTypes.MISSING_CREDENTIALS, '406', {
        error: {
            title: 'Missing Credentials',
            description: 'Required fields are missing!',
        },
    });
}

function invalidUniEmail(): ApolloError {
    throw new ApolloError(AuthErrorTypes.INVALID_UNI_EMAIL, '401', {
        error: {
            title: 'Invalid Uni Email',
            description: "Couldn't find a valid university email!",
        },
    });
}

function invalidCredentials(): ApolloError {
    throw new ApolloError(AuthErrorTypes.MISSING_CREDENTIALS, '401', {
        error: {
            title: 'Invalid Credentials',
            description: 'Email or password is incorrect!',
        },
    });
}

function notAuthenticated(): ApolloError {
    throw new ApolloError(AuthErrorTypes.NOT_AUTHENTICATED, '401', {
        error: {
            title: 'Not Authenticated',
            description: 'You are not authorized!',
        },
    });
}

function missingToken(): ApolloError {
    throw new ApolloError(AuthErrorTypes.MISSING_TOKEN, '406', {
        error: {
            title: 'Missing Token',
            description: "You haven't provided a token or valid format. Format: 'Bearer (token)'",
        },
    });
}

export async function handleError(error: AuthErrorTypes) {
    switch (error) {
        case AuthErrorTypes.USER_EXISTS:
            return userExists();
        case AuthErrorTypes.REGISTRATION_FAIL:
            return registrationFail();
        case AuthErrorTypes.MISSING_CREDENTIALS:
            return missingCrendetials();
        case AuthErrorTypes.INVALID_UNI_EMAIL:
            return invalidUniEmail();
        case AuthErrorTypes.INVALID_CREDENTIALS:
            return invalidCredentials();
        case AuthErrorTypes.NOT_AUTHENTICATED:
            return notAuthenticated();
        case AuthErrorTypes.MISSING_TOKEN:
            return missingToken();
        default:
            throw new Error('Internal server error');
    }
}
