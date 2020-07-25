import { StoreCommentsAction, CommentTypes, CommentState } from '../types/comment.types';

export const storeComments = (data: CommentState): StoreCommentsAction => {
    return { type: CommentTypes.STORE_COMMENTS, payload: data };
};
