export type CommentType = {
    id: number;
    postId: number;
    content: string;
    replyId?: number | null | undefined;
    author: {
        id: number;
        profileImg?: string | null | undefined;
        username: string;
        universityName: string;
    };
    createdAt: Date;
};
