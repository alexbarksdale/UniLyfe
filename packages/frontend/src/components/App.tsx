import React, { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';

import { BaseRouter } from '../routers/base.router';
import { theme } from '../utils/theme.util';
import { GlobalStyle } from './shared-styles/global.styles';
import { setToken } from '../utils/accessToken.util';

export function App(): JSX.Element | null {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:4000/auth/refresh', {
            method: 'POST',
            credentials: 'include',
        })
            .then(async (res) => {
                const { accessToken } = await res.json();
                setToken(accessToken);
                setLoading(false);
            })
            .catch((err) => {
                console.log('Error getting accessToken: ', err);
            });
    }, []);

    if (loading) return null;

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <BaseRouter />
        </ThemeProvider>
    );
}
