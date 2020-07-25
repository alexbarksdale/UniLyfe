import { combineReducers } from 'redux';

import { authReducer } from './auth.reducer';
import { AuthState } from '../types/auth.types';

import { navigationReducer } from './navigation.reducer';
import { NavigatonState } from '../types/navigation.types';

import { commentReducer } from './comment.reducer';
import { CommentState } from '../types/comment.types';

export type StoreState = {
    authReducer: AuthState;
    navigationReducer: NavigatonState;
    commentReducer: CommentState;
};

export const reducers = combineReducers<StoreState>({
    authReducer,
    navigationReducer,
    commentReducer,
});
