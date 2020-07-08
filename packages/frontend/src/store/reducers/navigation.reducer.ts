import {
    NavigatonState,
    NavigationActions,
    NavigationTypes,
    SetCategoryAction,
    SetBrowsingAction,
} from '../types/navigation.types';

const INIT_STATE: NavigatonState = {
    category: null,
    browsing: true,
};

const setCategory = (
    state: NavigatonState,
    action: SetCategoryAction
): NavigatonState => {
    return { ...state, category: action.payload };
};

const setBrowsing = (
    state: NavigatonState,
    action: SetBrowsingAction
): NavigatonState => {
    return { ...state, browsing: action.payload };
};

export function navigationReducer(state = INIT_STATE, action: NavigationActions) {
    switch (action.type) {
        case NavigationTypes.SET_CATEGORY:
            return setCategory(state, action);
        case NavigationTypes.SET_BROWSING:
            return setBrowsing(state, action);
        default:
            return state;
    }
}
