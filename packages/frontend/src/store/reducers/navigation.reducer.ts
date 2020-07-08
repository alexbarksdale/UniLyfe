import {
    NavigatonState,
    NavigationActions,
    NavigationTypes,
    SetCategoryAction,
    SetBrowsingAction,
} from '../types/navigation.types';

const INIT_STATE: NavigatonState = {
    category: {
        unilyfe: '',
        forum: null,
    },
    browsing: true,
};

const setUnilyfeCategory = (
    state: NavigatonState,
    action: SetCategoryAction
): NavigatonState => {
    return { ...state, category: { unilyfe: action.payload, forum: null } };
};

const setForumCategory = (
    state: NavigatonState,
    action: SetCategoryAction
): NavigatonState => {
    return { ...state, category: { unilyfe: null, forum: action.payload } };
};

const setBrowsing = (
    state: NavigatonState,
    action: SetBrowsingAction
): NavigatonState => {
    return { ...state, browsing: action.payload };
};

export function navigationReducer(state = INIT_STATE, action: NavigationActions) {
    switch (action.type) {
        case NavigationTypes.SET_UNILYFE_CATEGORY:
            return setUnilyfeCategory(state, action);
        case NavigationTypes.SET_FORUM_CATEGORY:
            return setForumCategory(state, action);
        case NavigationTypes.SET_BROWSING:
            return setBrowsing(state, action);
        default:
            return state;
    }
}
