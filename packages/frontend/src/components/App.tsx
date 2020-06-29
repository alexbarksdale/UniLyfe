import React from 'react';
import { ThemeProvider } from 'styled-components';

import { BaseRouter } from '../routers/base.router';
import { theme } from '../utils/theme.util';
import { GlobalStyle } from './shared-styles/global.styles';

export function App(): JSX.Element {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <BaseRouter />
        </ThemeProvider>
    );
}
