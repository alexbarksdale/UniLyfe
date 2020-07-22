type LikeType = {
    id: number;
    username: string;
};

export type FeedDataType = {
    author: {
        email: string;
        id: number;
        universityName: string;
        username: string;
    };
    category: {
        id: number;
        name: string;
    };
    content: string;
    createdAt: Date;
    thumbnail?: string | null;
    id: number;
    likes: LikeType[];
    title: string;
    views: number;
};

export interface AppProps {
    feedData: FeedDataType[];
}
