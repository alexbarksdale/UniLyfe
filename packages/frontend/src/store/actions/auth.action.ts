import { SetAuthAction, AuthTypes } from '../types/auth.types';

export const setAuth = (data: boolean): SetAuthAction => {
    return { type: AuthTypes.SET_AUTH, payload: data };
};
