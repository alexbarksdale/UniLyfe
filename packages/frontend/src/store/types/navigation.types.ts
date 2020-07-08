export type NavigatonState = {
    readonly category: string | null;
};

export enum NavigationTypes {
    SET_CATEGORY = 'SET_CATEGORY',
}

export type SetCategoryAction = {
    type: NavigationTypes.SET_CATEGORY;
    payload: string;
};

export type NavigationActions = SetCategoryAction;
