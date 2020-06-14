import React from 'react';
import { Route } from 'react-router-dom';

import { Home } from '../components/home/Home';

export function BaseRouter(): JSX.Element {
    return <Route path='/' component={Home} />;
}
