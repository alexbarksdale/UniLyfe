import { Dispatch } from 'redux';

import {
    SetCategoryAction,
    SetBrowsingAction,
    NavigationTypes,
} from '../types/navigation.types';

export const setBrowsing = (browsing: boolean): SetBrowsingAction => {
    return { type: NavigationTypes.SET_BROWSING, payload: browsing };
};

export const setUnilyfeCategory = (category: string | null): SetCategoryAction => {
    return { type: NavigationTypes.SET_UNILYFE_CATEGORY, payload: category };
};

export const setForumCategory = (category: string | null): SetCategoryAction => {
    return { type: NavigationTypes.SET_FORUM_CATEGORY, payload: category };
};

export const setCategory = (data: string | null = '', category: NavigationTypes) => (
    dispatch: Dispatch
) => {
    switch (category) {
        case NavigationTypes.SET_UNILYFE_CATEGORY:
            dispatch(setForumCategory(null));
            dispatch(setUnilyfeCategory(data));
            break;
        case NavigationTypes.SET_FORUM_CATEGORY:
            dispatch(setUnilyfeCategory(null));
            dispatch(setForumCategory(data));
            break;
        default:
            console.log('Failed to set category');
    }
};
