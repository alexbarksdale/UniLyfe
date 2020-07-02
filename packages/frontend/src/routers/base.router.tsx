import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import { Home } from '../components/home/Home';
import { Navigation } from '../components/navigation/Navigation';
import { Authentication } from '../components/authentication/Authentication';
import { PostView } from '../components/post-view/PostView';
import { CreatePost } from '../components/create-post/CreatePost';

export function BaseRouter(): JSX.Element {
    return (
        <BrowserRouter>
            <Navigation />
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/post' component={PostView} />
                <Route exact path='/create' component={CreatePost} />
                <Route
                    exact
                    path='/login'
                    render={({ history }) => (
                        <Authentication typeLogin history={history} />
                    )}
                />
                <Route exact path='/signup' component={Authentication} />
                <Route path='/' render={() => <div>404 - TODO</div>} />
            </Switch>
        </BrowserRouter>
    );
}
