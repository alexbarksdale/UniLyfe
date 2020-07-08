export type NavigatonState = {
    readonly category: {
        unilyfe?: string | null;
        forum?: string | null;
    };
    readonly browsing: boolean;
};

export enum NavigationTypes {
    SET_FORUM_CATEGORY = 'SET_FORUM_CATEGORY',
    SET_UNILYFE_CATEGORY = 'SET_UNILYFE_CATEGORY',
    SET_BROWSING = 'SET_BROWSING',
}

export type SetCategoryAction = {
    type: NavigationTypes.SET_FORUM_CATEGORY | NavigationTypes.SET_UNILYFE_CATEGORY;
    payload: string | null;
};

export type SetBrowsingAction = {
    type: NavigationTypes.SET_BROWSING;
    payload: boolean;
};

export type NavigationActions = SetCategoryAction | SetBrowsingAction;
