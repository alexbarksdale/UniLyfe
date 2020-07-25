import {
    CommentState,
    CommentActions,
    CommentTypes,
    StoreCommentsAction,
} from '../types/comment.types';

const INIT_STATE: CommentState = {
    comments: [],
    posts: [],
    fetch: true,
};

const storeComments = (
    state: CommentState,
    action: StoreCommentsAction
): CommentState => {
    const { comments, posts, fetch } = action.payload;
    return { ...state, comments, posts, fetch };
};

export function commentReducer(state = INIT_STATE, action: CommentActions): CommentState {
    switch (action.type) {
        case CommentTypes.STORE_COMMENTS:
            return storeComments(state, action);
        default:
            return state;
    }
}
