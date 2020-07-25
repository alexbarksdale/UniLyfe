export type CommentsRes = {
    id: number;
    content: string;
    author: {
        id: number;
        username: string;
    };
    createdAt: Date;
};

type PostsRes = {
    id: number;
    title: string;
    category: {
        id: number;
        name: string;
    };
};

export type CommentState = {
    readonly comments: CommentsRes[];
    readonly posts: PostsRes[];
    readonly fetch?: boolean;
};

export enum CommentTypes {
    STORE_COMMENTS = 'STORE_COMMENTS',
}

export type StoreCommentsAction = {
    type: CommentTypes.STORE_COMMENTS;
    payload: CommentState;
};

export type CommentActions = StoreCommentsAction;
