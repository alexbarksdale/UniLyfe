import { combineReducers } from 'redux';

export interface StoreState {
    placeholder: number;
}

export const reducers = combineReducers<StoreState>({
    placeholder: () => 1,
});
