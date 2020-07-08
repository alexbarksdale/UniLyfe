import {
    SetCategoryAction,
    SetBrowsingAction,
    NavigationTypes,
} from '../types/navigation.types';

export const setCategory = (category: string | null): SetCategoryAction => {
    return { type: NavigationTypes.SET_CATEGORY, payload: category };
};

export const setBrowsing = (browsing: boolean): SetBrowsingAction => {
    return { type: NavigationTypes.SET_BROWSING, payload: browsing };
};
