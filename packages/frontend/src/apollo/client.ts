import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink, Observable } from 'apollo-link';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import jwtDecode from 'jwt-decode';

import { setToken, getToken } from '../utils/accessToken.util';

const cache = new InMemoryCache({});

const requestLink = new ApolloLink(
    (operation, forward) =>
        new Observable((observer) => {
            let handle: any;
            // For each request we make we send the following
            Promise.resolve(operation)
                .then((operation) => {
                    const accessToken = getToken();
                    if (accessToken) {
                        operation.setContext({
                            headers: {
                                authorization: `bearer ${accessToken}`,
                            },
                        });
                    }
                })

                .then(() => {
                    handle = forward(operation).subscribe({
                        next: observer.next.bind(observer),
                        error: observer.error.bind(observer),
                        complete: observer.complete.bind(observer),
                    });
                })
                .catch(observer.error.bind(observer));

            return () => {
                if (handle) handle.unsubscribe();
            };
        })
);

export const client = new ApolloClient({
    link: ApolloLink.from([
        new TokenRefreshLink({
            accessTokenField: 'accessToken',
            isTokenValidOrUndefined: () => {
                const token = getToken();
                if (!token) return true;

                try {
                    const { exp } = jwtDecode(token);
                    if (Date.now() >= exp * 1000) {
                        return false;
                    }
                    return true;
                } catch {
                    return false;
                }
            },
            fetchAccessToken: () => {
                return fetch('http://localhost:4000/auth/refresh', {
                    method: 'POST',
                    credentials: 'include',
                });
            },
            handleFetch: (accessToken: string) => {
                setToken(accessToken);
            },
            handleError: (err: Error) => {
                console.warn('Your refresh token is invalid. Try to relogin');
                console.error('Handle error: ', err);
            },
        }) as any,
        onError(({ graphQLErrors, networkError }) => {
            console.log('GraphQL error: ', graphQLErrors);
            console.log('Network error: ', networkError);
        }),
        requestLink,
        new HttpLink({
            uri: 'http://localhost:4000/api/graphql',
            credentials: 'include',
        }),
    ]),
    cache,
});
