import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';

import { BaseRouter } from '../routers/base.router';
import { theme } from '../utils/theme.util';
import { GlobalStyle } from './shared-styles/global.styles';
import { setToken, getToken } from '../utils/accessToken.util';

export function App(): JSX.Element {
    const [loading, setLoading] = useState(true);
    console.log('Current token:', getToken());

    useEffect(() => {
        fetch('http://localhost:4000/auth/refresh', {
            method: 'POST',
            credentials: 'include',
        })
            .then(async (res) => {
                const { accessToken } = await res.json();
                setToken(accessToken);
                console.log('refresh: ', accessToken);
                setLoading(false);
            })
            .catch((err) => {
                console.log('App.ts', err);
            });
    }, []);

    if (loading) {
        return <div>loading...</div>;
    }

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <BaseRouter />
        </ThemeProvider>
    );
}
