import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import { BaseRouter } from '../routers/base.router';
import { theme } from '../utils/theme.util';
import { GlobalStyle } from './shared-styles/global.styles';
import { setToken } from '../utils/accessToken.util';
import { setAuth } from '../store/actions/auth.action';
import { StoreState } from '../store/reducers/main.reducer';

export function App(): JSX.Element | null {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const isAuth = useSelector((state: StoreState) => state.authReducer.isAuth);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_IP}/auth/refresh`, {
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
            <BaseRouter isAuth={isAuth} />
        </ThemeProvider>
    );
}
