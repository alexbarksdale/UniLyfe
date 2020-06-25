import React from 'react';

import { AuthForm, AuthInput } from '../shared-styles/auth.styles';

export function Register(): JSX.Element {
    return (
        <AuthForm>
            <label htmlFor='email'>
                Enter your university email
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
            <label htmlFor='confirm-password'>
                Confirm your password
                <AuthInput
                    id='confirm-password'
                    type='password'
                    placeholder='Confirm your password'
                />
            </label>
            <button type='submit'>Sign Up</button>
        </AuthForm>
    );
}
