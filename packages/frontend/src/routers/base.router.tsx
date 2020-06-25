import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import { Home } from '../components/home/Home';
import { Authentication } from '../components/authentication/Authentication';
import { Navigation } from '../components/navigation/Navigation';

export function BaseRouter(): JSX.Element {
    return (
        <BrowserRouter>
            <Navigation />
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/login' render={() => <Authentication typeLogin />} />
                <Route exact path='/signup' component={Authentication} />
                <Route path='/' render={() => <div>404 - TODO</div>} />
            </Switch>
        </BrowserRouter>
    );
}
