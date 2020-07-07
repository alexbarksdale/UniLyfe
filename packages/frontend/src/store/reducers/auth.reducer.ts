import { AuthState, AuthActions, AuthTypes, SetAuthAction } from '../types/auth.types';

const INIT_STATE: AuthState = {
    isAuth: false,
};

const setAuth = (state: AuthState, action: SetAuthAction): AuthState => {
    return { ...state, isAuth: action.payload };
};

export function authReducer(state = INIT_STATE, action: AuthActions): AuthState {
    switch (action.type) {
        case AuthTypes.SET_AUTH:
            return setAuth(state, action);
        default:
            return state;
    }
}
