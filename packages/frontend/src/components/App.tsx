import React from 'react';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import history from '../utils/history.util';
import { BaseRouter } from '../routers/base.router';
import { theme } from '../utils/theme.util';
import { GlobalStyle } from '../utils/globalStyles.util';
import { Navigation } from './navbar/Navigation';

export function App(): JSX.Element {
    return (
        <Router history={history}>
            <ThemeProvider theme={theme}>
                <GlobalStyle />
                <BaseRouter />
                <Navigation />
            </ThemeProvider>
        </Router>
    );
}
