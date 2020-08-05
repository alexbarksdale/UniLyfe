import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type CategoryEntity = {
  __typename?: 'CategoryEntity';
  id: Scalars['Int'];
  name: Scalars['String'];
  posts?: Maybe<Array<PostEntity>>;
};

export type PostEntity = {
  __typename?: 'PostEntity';
  id: Scalars['Int'];
  type: Scalars['String'];
  thumbnail?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  content: Scalars['String'];
  likes?: Maybe<Array<UserEntity>>;
  views: Scalars['Int'];
  author: UserEntity;
  category: CategoryEntity;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};


export type CommentEntity = {
  __typename?: 'CommentEntity';
  id: Scalars['Int'];
  postId: Scalars['Int'];
  author: UserEntity;
  content: Scalars['String'];
  replyId?: Maybe<Scalars['Int']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type University = {
  __typename?: 'University';
  webPages: Array<Scalars['String']>;
  name: Scalars['String'];
  alphaTwoCode: Scalars['String'];
  stateProvince?: Maybe<Scalars['String']>;
  domains: Array<Scalars['String']>;
  country: Scalars['String'];
};

export type UserEntity = {
  __typename?: 'UserEntity';
  id: Scalars['Int'];
  username: Scalars['String'];
  email: Scalars['String'];
  profileImg?: Maybe<Scalars['String']>;
  university: University;
  universityName: Scalars['String'];
  likes: Array<PostEntity>;
  posts: Array<PostEntity>;
  comments: Array<CommentEntity>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

/** Provides a boolean to determine if the user was registered and an optional message of choice. */
export type RegisterResponse = {
  __typename?: 'RegisterResponse';
  registerMsg: Scalars['String'];
  registerSuccess: Scalars['Boolean'];
};

/** Provides the user's information as well as a JWT access token. */
export type LoginResponse = {
  __typename?: 'LoginResponse';
  user: UserEntity;
  accessToken: Scalars['String'];
};

/** Response for recent comments query. */
export type CommentResponse = {
  __typename?: 'CommentResponse';
  comments: Array<CommentEntity>;
  posts: Array<PostEntity>;
};

/** Response for comment subscription. */
export type CommentSubResponse = {
  __typename?: 'CommentSubResponse';
  comment: CommentEntity;
  post: PostEntity;
};

/** NewsArticle 'source' types */
export type NewsSource = {
  __typename?: 'NewsSource';
  id?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

/** NewsResponse 'articles' types */
export type NewsArticle = {
  __typename?: 'NewsArticle';
  source: NewsSource;
  author?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  description: Scalars['String'];
  url: Scalars['String'];
  urlToImage: Scalars['String'];
  publishedAt: Scalars['String'];
  content?: Maybe<Scalars['String']>;
};

/** Response from NewsApi.org */
export type NewsData = {
  __typename?: 'NewsData';
  status: Scalars['String'];
  totalResults: Scalars['Int'];
  articles: Array<NewsArticle>;
};

/** Axios response for NewsApi.org */
export type NewsResponse = {
  __typename?: 'NewsResponse';
  status: Scalars['String'];
  totalResults: Scalars['Int'];
  articles: Array<NewsArticle>;
};

/** Response for updating a post. Returns the post updated and if the post was updated. */
export type UpdateResponse = {
  __typename?: 'UpdateResponse';
  post: PostEntity;
  liked: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  users: Array<UserEntity>;
  getUser: UserEntity;
  me?: Maybe<UserEntity>;
  getCategories: Array<CategoryEntity>;
  getCategoryPosts: Array<CategoryEntity>;
  recentComments: CommentResponse;
  getPostComments: Array<CommentEntity>;
  getUniNews: NewsResponse;
  ourPicks: Array<PostEntity>;
  getPosts: Array<PostEntity>;
  getPost: PostEntity;
};


export type QueryGetUserArgs = {
  email: Scalars['String'];
};


export type QueryGetCategoryPostsArgs = {
  categoryName: Scalars['String'];
};


export type QueryGetPostCommentsArgs = {
  postId: Scalars['Int'];
};


export type QueryGetPostArgs = {
  postId: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register: RegisterResponse;
  login: LoginResponse;
  updateAccount: Scalars['Boolean'];
  logout: Scalars['Boolean'];
  createCategory: Scalars['Boolean'];
  createComment: CommentEntity;
  updateComment: Scalars['Boolean'];
  deleteComment: Scalars['Boolean'];
  createTextPost: PostEntity;
  updatePostStats: UpdateResponse;
  updatePost: Scalars['Boolean'];
  deletePost: Scalars['Boolean'];
};


export type MutationRegisterArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationUpdateAccountArgs = {
  newPassword?: Maybe<Scalars['String']>;
  currentPassword?: Maybe<Scalars['String']>;
  profileImg?: Maybe<Scalars['String']>;
  userId: Scalars['Float'];
};


export type MutationCreateCategoryArgs = {
  name: Scalars['String'];
};


export type MutationCreateCommentArgs = {
  replyId?: Maybe<Scalars['Int']>;
  content: Scalars['String'];
  authorId: Scalars['Float'];
  postId: Scalars['Int'];
};


export type MutationUpdateCommentArgs = {
  content: Scalars['String'];
  authorId: Scalars['Int'];
  commentId: Scalars['Int'];
};


export type MutationDeleteCommentArgs = {
  authorId: Scalars['Int'];
  commentId: Scalars['Int'];
};


export type MutationCreateTextPostArgs = {
  categoryName: Scalars['String'];
  thumbnail?: Maybe<Scalars['String']>;
  authorId: Scalars['Float'];
  content: Scalars['String'];
  type: Scalars['String'];
  title: Scalars['String'];
};


export type MutationUpdatePostStatsArgs = {
  views?: Maybe<Scalars['Int']>;
  userId?: Maybe<Scalars['Int']>;
  postId: Scalars['Int'];
};


export type MutationUpdatePostArgs = {
  content?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  authorId: Scalars['Int'];
  postId: Scalars['Int'];
};


export type MutationDeletePostArgs = {
  authorId: Scalars['Int'];
  postId: Scalars['Int'];
};

export type Subscription = {
  __typename?: 'Subscription';
  recentComments: CommentResponse;
  postStatsSub: PostEntity;
};

export type CreateCommentMutationVariables = Exact<{
  postId: Scalars['Int'];
  authorId: Scalars['Float'];
  content: Scalars['String'];
  replyId?: Maybe<Scalars['Int']>;
}>;


export type CreateCommentMutation = (
  { __typename?: 'Mutation' }
  & { createComment: (
    { __typename?: 'CommentEntity' }
    & Pick<CommentEntity, 'id' | 'postId' | 'content' | 'replyId'>
    & { author: (
      { __typename?: 'UserEntity' }
      & Pick<UserEntity, 'id' | 'username' | 'universityName'>
    ) }
  ) }
);

export type CreateTextPostMutationVariables = Exact<{
  authorId: Scalars['Float'];
  type: Scalars['String'];
  title: Scalars['String'];
  content: Scalars['String'];
  thumbnail?: Maybe<Scalars['String']>;
  categoryName: Scalars['String'];
}>;


export type CreateTextPostMutation = (
  { __typename?: 'Mutation' }
  & { createTextPost: (
    { __typename?: 'PostEntity' }
    & Pick<PostEntity, 'id' | 'thumbnail' | 'title' | 'type' | 'content' | 'views' | 'createdAt'>
    & { likes?: Maybe<Array<(
      { __typename?: 'UserEntity' }
      & Pick<UserEntity, 'id' | 'username'>
    )>>, category: (
      { __typename?: 'CategoryEntity' }
      & Pick<CategoryEntity, 'id' | 'name'>
    ), author: (
      { __typename?: 'UserEntity' }
      & Pick<UserEntity, 'id' | 'username' | 'email' | 'universityName'>
    ) }
  ) }
);

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesQuery = (
  { __typename?: 'Query' }
  & { getCategories: Array<(
    { __typename?: 'CategoryEntity' }
    & Pick<CategoryEntity, 'id' | 'name'>
  )> }
);

export type GetCategoryPostsQueryVariables = Exact<{
  categoryName: Scalars['String'];
}>;


export type GetCategoryPostsQuery = (
  { __typename?: 'Query' }
  & { getCategoryPosts: Array<(
    { __typename?: 'CategoryEntity' }
    & { posts?: Maybe<Array<(
      { __typename?: 'PostEntity' }
      & Pick<PostEntity, 'id' | 'thumbnail' | 'title' | 'content' | 'views' | 'createdAt'>
      & { likes?: Maybe<Array<(
        { __typename?: 'UserEntity' }
        & Pick<UserEntity, 'id' | 'username'>
      )>>, category: (
        { __typename?: 'CategoryEntity' }
        & Pick<CategoryEntity, 'id' | 'name'>
      ), author: (
        { __typename?: 'UserEntity' }
        & Pick<UserEntity, 'id' | 'username' | 'email' | 'universityName'>
      ) }
    )>> }
  )> }
);

export type GetPostQueryVariables = Exact<{
  postId: Scalars['Int'];
}>;


export type GetPostQuery = (
  { __typename?: 'Query' }
  & { getPost: (
    { __typename?: 'PostEntity' }
    & Pick<PostEntity, 'id' | 'thumbnail' | 'title' | 'content' | 'views' | 'createdAt'>
    & { likes?: Maybe<Array<(
      { __typename?: 'UserEntity' }
      & Pick<UserEntity, 'id' | 'username'>
    )>>, category: (
      { __typename?: 'CategoryEntity' }
      & Pick<CategoryEntity, 'id' | 'name'>
    ), author: (
      { __typename?: 'UserEntity' }
      & Pick<UserEntity, 'id' | 'username' | 'email' | 'universityName'>
    ) }
  ) }
);

export type GetPostCommentsQueryVariables = Exact<{
  postId: Scalars['Int'];
}>;


export type GetPostCommentsQuery = (
  { __typename?: 'Query' }
  & { getPostComments: Array<(
    { __typename?: 'CommentEntity' }
    & Pick<CommentEntity, 'id' | 'postId' | 'content' | 'replyId' | 'createdAt'>
    & { author: (
      { __typename?: 'UserEntity' }
      & Pick<UserEntity, 'id' | 'username' | 'universityName'>
    ) }
  )> }
);

export type GetPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPostsQuery = (
  { __typename?: 'Query' }
  & { getPosts: Array<(
    { __typename?: 'PostEntity' }
    & Pick<PostEntity, 'id' | 'thumbnail' | 'title' | 'content' | 'views' | 'createdAt'>
    & { likes?: Maybe<Array<(
      { __typename?: 'UserEntity' }
      & Pick<UserEntity, 'id' | 'username'>
    )>>, category: (
      { __typename?: 'CategoryEntity' }
      & Pick<CategoryEntity, 'id' | 'name'>
    ), author: (
      { __typename?: 'UserEntity' }
      & Pick<UserEntity, 'id' | 'username' | 'email' | 'universityName'>
    ) }
  )> }
);

export type GetUniNewsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUniNewsQuery = (
  { __typename?: 'Query' }
  & { getUniNews: (
    { __typename?: 'NewsResponse' }
    & Pick<NewsResponse, 'status' | 'totalResults'>
    & { articles: Array<(
      { __typename?: 'NewsArticle' }
      & Pick<NewsArticle, 'author' | 'title' | 'description' | 'url' | 'urlToImage' | 'publishedAt' | 'content'>
      & { source: (
        { __typename?: 'NewsSource' }
        & Pick<NewsSource, 'id' | 'name'>
      ) }
    )> }
  ) }
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'accessToken'>
    & { user: (
      { __typename?: 'UserEntity' }
      & Pick<UserEntity, 'id' | 'profileImg' | 'email' | 'username' | 'universityName'>
      & { likes: Array<(
        { __typename?: 'PostEntity' }
        & Pick<PostEntity, 'id' | 'title'>
      )> }
    ) }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'UserEntity' }
    & Pick<UserEntity, 'id' | 'profileImg' | 'email' | 'username' | 'universityName'>
    & { likes: Array<(
      { __typename?: 'PostEntity' }
      & Pick<PostEntity, 'id' | 'title'>
    )> }
  )> }
);

export type OurPicksQueryVariables = Exact<{ [key: string]: never; }>;


export type OurPicksQuery = (
  { __typename?: 'Query' }
  & { ourPicks: Array<(
    { __typename?: 'PostEntity' }
    & Pick<PostEntity, 'id' | 'title' | 'content' | 'thumbnail' | 'createdAt'>
    & { author: (
      { __typename?: 'UserEntity' }
      & Pick<UserEntity, 'id' | 'username'>
    ), category: (
      { __typename?: 'CategoryEntity' }
      & Pick<CategoryEntity, 'id' | 'name'>
    ) }
  )> }
);

export type PostStatsSubSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type PostStatsSubSubscription = (
  { __typename?: 'Subscription' }
  & { postStatsSub: (
    { __typename?: 'PostEntity' }
    & Pick<PostEntity, 'id' | 'views'>
    & { likes?: Maybe<Array<(
      { __typename?: 'UserEntity' }
      & Pick<UserEntity, 'id' | 'username'>
    )>> }
  ) }
);

export type RecentCommentsSubSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type RecentCommentsSubSubscription = (
  { __typename?: 'Subscription' }
  & { recentComments: (
    { __typename?: 'CommentResponse' }
    & { comments: Array<(
      { __typename?: 'CommentEntity' }
      & Pick<CommentEntity, 'id' | 'content' | 'createdAt'>
      & { author: (
        { __typename?: 'UserEntity' }
        & Pick<UserEntity, 'id' | 'username'>
      ) }
    )>, posts: Array<(
      { __typename?: 'PostEntity' }
      & Pick<PostEntity, 'id' | 'title'>
      & { category: (
        { __typename?: 'CategoryEntity' }
        & Pick<CategoryEntity, 'id' | 'name'>
      ) }
    )> }
  ) }
);

export type RecentCommentsQueryVariables = Exact<{ [key: string]: never; }>;


export type RecentCommentsQuery = (
  { __typename?: 'Query' }
  & { recentComments: (
    { __typename?: 'CommentResponse' }
    & { comments: Array<(
      { __typename?: 'CommentEntity' }
      & Pick<CommentEntity, 'id' | 'content' | 'createdAt'>
      & { author: (
        { __typename?: 'UserEntity' }
        & Pick<UserEntity, 'id' | 'username'>
      ) }
    )>, posts: Array<(
      { __typename?: 'PostEntity' }
      & Pick<PostEntity, 'id' | 'title'>
      & { category: (
        { __typename?: 'CategoryEntity' }
        & Pick<CategoryEntity, 'id' | 'name'>
      ) }
    )> }
  ) }
);

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'RegisterResponse' }
    & Pick<RegisterResponse, 'registerMsg' | 'registerSuccess'>
  ) }
);

export type UpdateAccountMutationVariables = Exact<{
  userId: Scalars['Float'];
  profileImg?: Maybe<Scalars['String']>;
  currentPassword: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type UpdateAccountMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateAccount'>
);

export type UpdatePostStatsMutationVariables = Exact<{
  postId: Scalars['Int'];
  userId?: Maybe<Scalars['Int']>;
  views?: Maybe<Scalars['Int']>;
}>;


export type UpdatePostStatsMutation = (
  { __typename?: 'Mutation' }
  & { updatePostStats: (
    { __typename?: 'UpdateResponse' }
    & Pick<UpdateResponse, 'liked'>
    & { post: (
      { __typename?: 'PostEntity' }
      & { likes?: Maybe<Array<(
        { __typename?: 'UserEntity' }
        & Pick<UserEntity, 'id' | 'username'>
      )>> }
    ) }
  ) }
);


export const CreateCommentDocument = gql`
    mutation CreateComment($postId: Int!, $authorId: Float!, $content: String!, $replyId: Int) {
  createComment(postId: $postId, authorId: $authorId, content: $content, replyId: $replyId) {
    id
    postId
    content
    replyId
    author {
      id
      username
      universityName
    }
  }
}
    `;
export type CreateCommentMutationFn = ApolloReactCommon.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *      authorId: // value for 'authorId'
 *      content: // value for 'content'
 *      replyId: // value for 'replyId'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, baseOptions);
      }
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = ApolloReactCommon.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;
export const CreateTextPostDocument = gql`
    mutation CreateTextPost($authorId: Float!, $type: String!, $title: String!, $content: String!, $thumbnail: String, $categoryName: String!) {
  createTextPost(authorId: $authorId, type: $type, title: $title, content: $content, thumbnail: $thumbnail, categoryName: $categoryName) {
    id
    thumbnail
    title
    type
    content
    likes {
      id
      username
    }
    views
    createdAt
    category {
      id
      name
    }
    author {
      id
      username
      email
      universityName
    }
  }
}
    `;
export type CreateTextPostMutationFn = ApolloReactCommon.MutationFunction<CreateTextPostMutation, CreateTextPostMutationVariables>;

/**
 * __useCreateTextPostMutation__
 *
 * To run a mutation, you first call `useCreateTextPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTextPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTextPostMutation, { data, loading, error }] = useCreateTextPostMutation({
 *   variables: {
 *      authorId: // value for 'authorId'
 *      type: // value for 'type'
 *      title: // value for 'title'
 *      content: // value for 'content'
 *      thumbnail: // value for 'thumbnail'
 *      categoryName: // value for 'categoryName'
 *   },
 * });
 */
export function useCreateTextPostMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateTextPostMutation, CreateTextPostMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateTextPostMutation, CreateTextPostMutationVariables>(CreateTextPostDocument, baseOptions);
      }
export type CreateTextPostMutationHookResult = ReturnType<typeof useCreateTextPostMutation>;
export type CreateTextPostMutationResult = ApolloReactCommon.MutationResult<CreateTextPostMutation>;
export type CreateTextPostMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateTextPostMutation, CreateTextPostMutationVariables>;
export const GetCategoriesDocument = gql`
    query GetCategories {
  getCategories {
    id
    name
  }
}
    `;

/**
 * __useGetCategoriesQuery__
 *
 * To run a query within a React component, call `useGetCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCategoriesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
        return ApolloReactHooks.useQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, baseOptions);
      }
export function useGetCategoriesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, baseOptions);
        }
export type GetCategoriesQueryHookResult = ReturnType<typeof useGetCategoriesQuery>;
export type GetCategoriesLazyQueryHookResult = ReturnType<typeof useGetCategoriesLazyQuery>;
export type GetCategoriesQueryResult = ApolloReactCommon.QueryResult<GetCategoriesQuery, GetCategoriesQueryVariables>;
export const GetCategoryPostsDocument = gql`
    query GetCategoryPosts($categoryName: String!) {
  getCategoryPosts(categoryName: $categoryName) {
    posts {
      id
      thumbnail
      title
      content
      likes {
        id
        username
      }
      views
      createdAt
      category {
        id
        name
      }
      author {
        id
        username
        email
        universityName
      }
    }
  }
}
    `;

/**
 * __useGetCategoryPostsQuery__
 *
 * To run a query within a React component, call `useGetCategoryPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoryPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoryPostsQuery({
 *   variables: {
 *      categoryName: // value for 'categoryName'
 *   },
 * });
 */
export function useGetCategoryPostsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetCategoryPostsQuery, GetCategoryPostsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetCategoryPostsQuery, GetCategoryPostsQueryVariables>(GetCategoryPostsDocument, baseOptions);
      }
export function useGetCategoryPostsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCategoryPostsQuery, GetCategoryPostsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetCategoryPostsQuery, GetCategoryPostsQueryVariables>(GetCategoryPostsDocument, baseOptions);
        }
export type GetCategoryPostsQueryHookResult = ReturnType<typeof useGetCategoryPostsQuery>;
export type GetCategoryPostsLazyQueryHookResult = ReturnType<typeof useGetCategoryPostsLazyQuery>;
export type GetCategoryPostsQueryResult = ApolloReactCommon.QueryResult<GetCategoryPostsQuery, GetCategoryPostsQueryVariables>;
export const GetPostDocument = gql`
    query GetPost($postId: Int!) {
  getPost(postId: $postId) {
    id
    thumbnail
    title
    content
    views
    createdAt
    likes {
      id
      username
    }
    category {
      id
      name
    }
    author {
      id
      username
      email
      universityName
    }
  }
}
    `;

/**
 * __useGetPostQuery__
 *
 * To run a query within a React component, call `useGetPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useGetPostQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetPostQuery, GetPostQueryVariables>) {
        return ApolloReactHooks.useQuery<GetPostQuery, GetPostQueryVariables>(GetPostDocument, baseOptions);
      }
export function useGetPostLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetPostQuery, GetPostQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetPostQuery, GetPostQueryVariables>(GetPostDocument, baseOptions);
        }
export type GetPostQueryHookResult = ReturnType<typeof useGetPostQuery>;
export type GetPostLazyQueryHookResult = ReturnType<typeof useGetPostLazyQuery>;
export type GetPostQueryResult = ApolloReactCommon.QueryResult<GetPostQuery, GetPostQueryVariables>;
export const GetPostCommentsDocument = gql`
    query GetPostComments($postId: Int!) {
  getPostComments(postId: $postId) {
    id
    postId
    content
    replyId
    author {
      id
      username
      universityName
    }
    createdAt
  }
}
    `;

/**
 * __useGetPostCommentsQuery__
 *
 * To run a query within a React component, call `useGetPostCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostCommentsQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useGetPostCommentsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetPostCommentsQuery, GetPostCommentsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetPostCommentsQuery, GetPostCommentsQueryVariables>(GetPostCommentsDocument, baseOptions);
      }
export function useGetPostCommentsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetPostCommentsQuery, GetPostCommentsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetPostCommentsQuery, GetPostCommentsQueryVariables>(GetPostCommentsDocument, baseOptions);
        }
export type GetPostCommentsQueryHookResult = ReturnType<typeof useGetPostCommentsQuery>;
export type GetPostCommentsLazyQueryHookResult = ReturnType<typeof useGetPostCommentsLazyQuery>;
export type GetPostCommentsQueryResult = ApolloReactCommon.QueryResult<GetPostCommentsQuery, GetPostCommentsQueryVariables>;
export const GetPostsDocument = gql`
    query GetPosts {
  getPosts {
    id
    thumbnail
    title
    content
    views
    createdAt
    likes {
      id
      username
    }
    category {
      id
      name
    }
    author {
      id
      username
      email
      universityName
    }
  }
}
    `;

/**
 * __useGetPostsQuery__
 *
 * To run a query within a React component, call `useGetPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPostsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, baseOptions);
      }
export function useGetPostsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, baseOptions);
        }
export type GetPostsQueryHookResult = ReturnType<typeof useGetPostsQuery>;
export type GetPostsLazyQueryHookResult = ReturnType<typeof useGetPostsLazyQuery>;
export type GetPostsQueryResult = ApolloReactCommon.QueryResult<GetPostsQuery, GetPostsQueryVariables>;
export const GetUniNewsDocument = gql`
    query GetUniNews {
  getUniNews {
    status
    totalResults
    articles {
      source {
        id
        name
      }
      author
      title
      description
      url
      urlToImage
      publishedAt
      content
    }
  }
}
    `;

/**
 * __useGetUniNewsQuery__
 *
 * To run a query within a React component, call `useGetUniNewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUniNewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUniNewsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUniNewsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUniNewsQuery, GetUniNewsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetUniNewsQuery, GetUniNewsQueryVariables>(GetUniNewsDocument, baseOptions);
      }
export function useGetUniNewsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUniNewsQuery, GetUniNewsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetUniNewsQuery, GetUniNewsQueryVariables>(GetUniNewsDocument, baseOptions);
        }
export type GetUniNewsQueryHookResult = ReturnType<typeof useGetUniNewsQuery>;
export type GetUniNewsLazyQueryHookResult = ReturnType<typeof useGetUniNewsLazyQuery>;
export type GetUniNewsQueryResult = ApolloReactCommon.QueryResult<GetUniNewsQuery, GetUniNewsQueryVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    user {
      id
      profileImg
      email
      username
      universityName
      likes {
        id
        title
      }
    }
    accessToken
  }
}
    `;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = ApolloReactCommon.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return ApolloReactHooks.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = ApolloReactCommon.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = ApolloReactCommon.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    profileImg
    email
    username
    universityName
    likes {
      id
      title
    }
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>;
export const OurPicksDocument = gql`
    query OurPicks {
  ourPicks {
    id
    title
    content
    thumbnail
    author {
      id
      username
    }
    category {
      id
      name
    }
    createdAt
  }
}
    `;

/**
 * __useOurPicksQuery__
 *
 * To run a query within a React component, call `useOurPicksQuery` and pass it any options that fit your needs.
 * When your component renders, `useOurPicksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOurPicksQuery({
 *   variables: {
 *   },
 * });
 */
export function useOurPicksQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<OurPicksQuery, OurPicksQueryVariables>) {
        return ApolloReactHooks.useQuery<OurPicksQuery, OurPicksQueryVariables>(OurPicksDocument, baseOptions);
      }
export function useOurPicksLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<OurPicksQuery, OurPicksQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<OurPicksQuery, OurPicksQueryVariables>(OurPicksDocument, baseOptions);
        }
export type OurPicksQueryHookResult = ReturnType<typeof useOurPicksQuery>;
export type OurPicksLazyQueryHookResult = ReturnType<typeof useOurPicksLazyQuery>;
export type OurPicksQueryResult = ApolloReactCommon.QueryResult<OurPicksQuery, OurPicksQueryVariables>;
export const PostStatsSubDocument = gql`
    subscription PostStatsSub {
  postStatsSub {
    id
    likes {
      id
      username
    }
    views
  }
}
    `;

/**
 * __usePostStatsSubSubscription__
 *
 * To run a query within a React component, call `usePostStatsSubSubscription` and pass it any options that fit your needs.
 * When your component renders, `usePostStatsSubSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostStatsSubSubscription({
 *   variables: {
 *   },
 * });
 */
export function usePostStatsSubSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<PostStatsSubSubscription, PostStatsSubSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<PostStatsSubSubscription, PostStatsSubSubscriptionVariables>(PostStatsSubDocument, baseOptions);
      }
export type PostStatsSubSubscriptionHookResult = ReturnType<typeof usePostStatsSubSubscription>;
export type PostStatsSubSubscriptionResult = ApolloReactCommon.SubscriptionResult<PostStatsSubSubscription>;
export const RecentCommentsSubDocument = gql`
    subscription RecentCommentsSub {
  recentComments {
    comments {
      id
      content
      author {
        id
        username
      }
      createdAt
    }
    posts {
      id
      title
      category {
        id
        name
      }
    }
  }
}
    `;

/**
 * __useRecentCommentsSubSubscription__
 *
 * To run a query within a React component, call `useRecentCommentsSubSubscription` and pass it any options that fit your needs.
 * When your component renders, `useRecentCommentsSubSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRecentCommentsSubSubscription({
 *   variables: {
 *   },
 * });
 */
export function useRecentCommentsSubSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<RecentCommentsSubSubscription, RecentCommentsSubSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<RecentCommentsSubSubscription, RecentCommentsSubSubscriptionVariables>(RecentCommentsSubDocument, baseOptions);
      }
export type RecentCommentsSubSubscriptionHookResult = ReturnType<typeof useRecentCommentsSubSubscription>;
export type RecentCommentsSubSubscriptionResult = ApolloReactCommon.SubscriptionResult<RecentCommentsSubSubscription>;
export const RecentCommentsDocument = gql`
    query RecentComments {
  recentComments {
    comments {
      id
      content
      author {
        id
        username
      }
      createdAt
    }
    posts {
      id
      title
      category {
        id
        name
      }
    }
  }
}
    `;

/**
 * __useRecentCommentsQuery__
 *
 * To run a query within a React component, call `useRecentCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRecentCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRecentCommentsQuery({
 *   variables: {
 *   },
 * });
 */
export function useRecentCommentsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<RecentCommentsQuery, RecentCommentsQueryVariables>) {
        return ApolloReactHooks.useQuery<RecentCommentsQuery, RecentCommentsQueryVariables>(RecentCommentsDocument, baseOptions);
      }
export function useRecentCommentsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<RecentCommentsQuery, RecentCommentsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<RecentCommentsQuery, RecentCommentsQueryVariables>(RecentCommentsDocument, baseOptions);
        }
export type RecentCommentsQueryHookResult = ReturnType<typeof useRecentCommentsQuery>;
export type RecentCommentsLazyQueryHookResult = ReturnType<typeof useRecentCommentsLazyQuery>;
export type RecentCommentsQueryResult = ApolloReactCommon.QueryResult<RecentCommentsQuery, RecentCommentsQueryVariables>;
export const RegisterDocument = gql`
    mutation Register($email: String!, $password: String!) {
  register(email: $email, password: $password) {
    registerMsg
    registerSuccess
  }
}
    `;
export type RegisterMutationFn = ApolloReactCommon.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return ApolloReactHooks.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = ApolloReactCommon.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = ApolloReactCommon.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const UpdateAccountDocument = gql`
    mutation UpdateAccount($userId: Float!, $profileImg: String, $currentPassword: String!, $newPassword: String!) {
  updateAccount(userId: $userId, profileImg: $profileImg, currentPassword: $currentPassword, newPassword: $newPassword)
}
    `;
export type UpdateAccountMutationFn = ApolloReactCommon.MutationFunction<UpdateAccountMutation, UpdateAccountMutationVariables>;

/**
 * __useUpdateAccountMutation__
 *
 * To run a mutation, you first call `useUpdateAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAccountMutation, { data, loading, error }] = useUpdateAccountMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      profileImg: // value for 'profileImg'
 *      currentPassword: // value for 'currentPassword'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useUpdateAccountMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateAccountMutation, UpdateAccountMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateAccountMutation, UpdateAccountMutationVariables>(UpdateAccountDocument, baseOptions);
      }
export type UpdateAccountMutationHookResult = ReturnType<typeof useUpdateAccountMutation>;
export type UpdateAccountMutationResult = ApolloReactCommon.MutationResult<UpdateAccountMutation>;
export type UpdateAccountMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateAccountMutation, UpdateAccountMutationVariables>;
export const UpdatePostStatsDocument = gql`
    mutation UpdatePostStats($postId: Int!, $userId: Int, $views: Int) {
  updatePostStats(postId: $postId, userId: $userId, views: $views) {
    post {
      likes {
        id
        username
      }
    }
    liked
  }
}
    `;
export type UpdatePostStatsMutationFn = ApolloReactCommon.MutationFunction<UpdatePostStatsMutation, UpdatePostStatsMutationVariables>;

/**
 * __useUpdatePostStatsMutation__
 *
 * To run a mutation, you first call `useUpdatePostStatsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostStatsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostStatsMutation, { data, loading, error }] = useUpdatePostStatsMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *      userId: // value for 'userId'
 *      views: // value for 'views'
 *   },
 * });
 */
export function useUpdatePostStatsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdatePostStatsMutation, UpdatePostStatsMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdatePostStatsMutation, UpdatePostStatsMutationVariables>(UpdatePostStatsDocument, baseOptions);
      }
export type UpdatePostStatsMutationHookResult = ReturnType<typeof useUpdatePostStatsMutation>;
export type UpdatePostStatsMutationResult = ApolloReactCommon.MutationResult<UpdatePostStatsMutation>;
export type UpdatePostStatsMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdatePostStatsMutation, UpdatePostStatsMutationVariables>;