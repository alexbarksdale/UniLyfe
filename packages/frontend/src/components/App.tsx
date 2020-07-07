import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import { BaseRouter } from '../routers/base.router';
import { theme } from '../utils/theme.util';
import { GlobalStyle } from './shared-styles/global.styles';
import { setToken } from '../utils/accessToken.util';
import { setAuth } from '../store/actions/auth.action';

export function App(): JSX.Element | null {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        fetch('http://localhost:4000/auth/refresh', {
            method: 'POST',
            credentials: 'include',
        })
            .then(async (res) => {
                const { accessToken } = await res.json();
                setToken(accessToken);
                setLoading(false);
                if (accessToken) {
                    dispatch(setAuth(true));
                }
            })
            .catch((err) => {
                console.log('Error getting accessToken: ', err);
            });
    }, [dispatch]);

    if (loading) return null;

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <BaseRouter />
        </ThemeProvider>
    );
}
