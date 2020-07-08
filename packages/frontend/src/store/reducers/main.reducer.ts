import { combineReducers } from 'redux';

import { authReducer } from './auth.reducer';
import { AuthState } from '../types/auth.types';

import { navigationReducer } from './navigation.reducer';
import { NavigatonState } from '../types/navigation.types';

export type StoreState = {
    authReducer: AuthState;
    navigationReducer: NavigatonState;
};

export const reducers = combineReducers<StoreState>({
    authReducer,
    navigationReducer,
});
