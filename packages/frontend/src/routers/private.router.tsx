import React from 'react';
import { Route, Redirect, RouteProps, RouteComponentProps } from 'react-router-dom';

interface ProtectedRouteProps extends RouteProps {
    isAuth: boolean;
    Component: React.FC<RouteComponentProps>;
}

export function PrivateRoute({
    isAuth,
    Component,
    ...rest
}: ProtectedRouteProps): JSX.Element {
    return (
        <>
            <Route
                {...rest}
                render={(props) =>
                    isAuth ? (
                        <Component {...props} />
                    ) : (
                        <Redirect to={{ pathname: '/login' }} />
                    )
                }
            />
        </>
    );
}
