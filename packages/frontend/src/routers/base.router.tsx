import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import { PrivateRoute } from './private.router';
import { Home } from '../components/pages/home/Home';
import { Category } from '../components/pages/category/Category';
import { Navigation } from '../components/navigation/Navigation';
import { Authentication } from '../components/authentication/Authentication';
import { PostView } from '../components/post-view/PostView';
import { CreatePost } from '../components/create-post/CreatePost';
import { Settings } from '../components/settings/Settings';

type AppProps = {
    isAuth: boolean;
};

export function BaseRouter({ isAuth }: AppProps): JSX.Element {
    return (
        <BrowserRouter>
            <Navigation />
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/category/:category' component={Category} />
                <Route exact path='/category/:category/:id/:slug' component={PostView} />
                <PrivateRoute
                    exact
                    path='/create'
                    component={CreatePost}
                    isAuth={isAuth}
                />
                <Route
                    exact
                    path='/login'
                    render={({ history }) => (
                        <Authentication typeLogin history={history} />
                    )}
                />
                <Route exact path='/signup' component={Authentication} />
                <PrivateRoute
                    exact
                    path='/settings'
                    component={Settings}
                    isAuth={isAuth}
                />
                <Route path='/' render={() => <div>404 - TODO</div>} />
            </Switch>
        </BrowserRouter>
    );
}
