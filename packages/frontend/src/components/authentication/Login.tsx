import React from 'react';

import { AuthForm, AuthInput } from '../shared-styles/auth.styles';

export function Login(): JSX.Element {
    return (
        <AuthForm>
            <label htmlFor='email'>
                Enter your email
                <AuthInput id='email' type='email' placeholder='Enter your email' />
            </label>
            <label htmlFor='password'>
                Enter your password
                <AuthInput
                    id='password'
                    type='password'
                    placeholder='Enter your password'
                />
            </label>
            <button type='submit'>Login</button>
        </AuthForm>
    );
}
