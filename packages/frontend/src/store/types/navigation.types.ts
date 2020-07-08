export type NavigatonState = {
    readonly category: string | null;
    readonly browsing: boolean;
};

export enum NavigationTypes {
    SET_CATEGORY = 'SET_CATEGORY',
    SET_BROWSING = 'SET_BROWSING',
}

export type SetCategoryAction = {
    type: NavigationTypes.SET_CATEGORY;
    payload: string | null;
};

export type SetBrowsingAction = {
    type: NavigationTypes.SET_BROWSING;
    payload: boolean;
};

export type NavigationActions = SetCategoryAction | SetBrowsingAction;
