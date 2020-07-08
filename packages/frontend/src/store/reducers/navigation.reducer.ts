import {
    NavigatonState,
    NavigationActions,
    NavigationTypes,
    SetCategoryAction,
} from '../types/navigation.types';

const INIT_STATE: NavigatonState = {
    category: null,
};

const setCategory = (state: NavigatonState, action: SetCategoryAction) => {
    return { ...state, category: action.payload };
};

export function navigationReducer(state = INIT_STATE, action: NavigationActions) {
    switch (action.type) {
        case NavigationTypes.SET_CATEGORY:
            return setCategory(state, action);
        default:
            return state;
    }
}
