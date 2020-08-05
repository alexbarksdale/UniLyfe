import React from 'react';
import { Route, Redirect, RouteProps, RouteComponentProps } from 'react-router-dom';

interface ProtectedRouteProps extends RouteProps {
    isAuth: boolean;
    component: React.FC<RouteComponentProps>;
}

export function PrivateRoute({
    isAuth,
    component,
    ...rest
}: ProtectedRouteProps): JSX.Element {
    return (
        <>
            <Route
                {...rest}
                render={(props) =>
                    isAuth ? (
                        <Route {...props} component={component} />
                    ) : (
                        <Redirect to={{ pathname: '/login' }} />
                    )
                }
            />
        </>
    );
}
