import { SetCategoryAction, NavigationTypes } from '../types/navigation.types';

export const setCategory = (category: string): SetCategoryAction => {
    return { type: NavigationTypes.SET_CATEGORY, payload: category };
};
