import { combineReducers } from 'redux';

import { authReducer } from './auth.reducer';
import { AuthState } from '../types/auth.types';

type StoreState = {
    authReducer: AuthState;
};

export const reducers = combineReducers<StoreState>({
    authReducer,
});
