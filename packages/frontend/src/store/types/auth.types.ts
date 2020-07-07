export type AuthState = {
    readonly isAuth: boolean;
};

export enum AuthTypes {
    SET_AUTH = 'SET_AUTH',
}

export type SetAuthAction = {
    type: AuthTypes.SET_AUTH;
    payload: boolean;
};

export type AuthActions = SetAuthAction;
