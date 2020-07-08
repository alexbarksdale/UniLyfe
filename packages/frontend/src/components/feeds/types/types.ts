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
    id: number;
    likes: number;
    title: string;
    views: number;
};

export interface AppProps {
    feedData: FeedDataType[];
}
