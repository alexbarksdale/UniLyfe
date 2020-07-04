import { GetPostsQuery } from '../../../generated/graphql';

export interface AppProps {
    feedData: GetPostsQuery | undefined;
}
