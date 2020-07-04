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

export type PostEntity = {
  __typename?: 'PostEntity';
  id: Scalars['Int'];
  author: UserEntity;
  title: Scalars['String'];
  content: Scalars['String'];
  likes: Scalars['Int'];
  views: Scalars['Int'];
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

export type UserEntity = {
  __typename?: 'UserEntity';
  id: Scalars['Int'];
  username: Scalars['String'];
  email: Scalars['String'];
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

export type PostUpdateInput = {
  title?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  likes?: Maybe<Scalars['Int']>;
  views?: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  users: Array<UserEntity>;
  me?: Maybe<UserEntity>;
  getPostComments: Array<CommentEntity>;
  getPosts: Array<PostEntity>;
  getPost: PostEntity;
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
  logout: Scalars['Boolean'];
  createComment: CommentEntity;
  updateComment: Scalars['Boolean'];
  deleteComment: Scalars['Boolean'];
  createPost: PostEntity;
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


export type MutationCreateCommentArgs = {
  replyId?: Maybe<Scalars['Int']>;
  content: Scalars['String'];
  authorEmail: Scalars['String'];
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


export type MutationCreatePostArgs = {
  email: Scalars['String'];
  content: Scalars['String'];
  title: Scalars['String'];
};


export type MutationUpdatePostArgs = {
  update: PostUpdateInput;
  authorId: Scalars['Int'];
  postId: Scalars['Int'];
};


export type MutationDeletePostArgs = {
  authorId: Scalars['Int'];
  postId: Scalars['Int'];
};

export type CreatePostMutationVariables = Exact<{
  email: Scalars['String'];
  title: Scalars['String'];
  content: Scalars['String'];
}>;


export type CreatePostMutation = (
  { __typename?: 'Mutation' }
  & { createPost: (
    { __typename?: 'PostEntity' }
    & Pick<PostEntity, 'id' | 'title' | 'content' | 'likes' | 'views' | 'createdAt'>
    & { author: (
      { __typename?: 'UserEntity' }
      & Pick<UserEntity, 'id' | 'username' | 'email'>
    ) }
  ) }
);

export type GetPostQueryVariables = Exact<{
  postId: Scalars['Int'];
}>;


export type GetPostQuery = (
  { __typename?: 'Query' }
  & { getPost: (
    { __typename?: 'PostEntity' }
    & Pick<PostEntity, 'id' | 'title' | 'content' | 'likes' | 'views' | 'createdAt'>
    & { author: (
      { __typename?: 'UserEntity' }
      & Pick<UserEntity, 'id' | 'username'>
    ) }
  ) }
);

export type GetPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPostsQuery = (
  { __typename?: 'Query' }
  & { getPosts: Array<(
    { __typename?: 'PostEntity' }
    & Pick<PostEntity, 'id' | 'title' | 'content' | 'likes' | 'views' | 'createdAt'>
    & { author: (
      { __typename?: 'UserEntity' }
      & Pick<UserEntity, 'id' | 'username' | 'email'>
    ) }
  )> }
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
      & Pick<UserEntity, 'id' | 'email' | 'username'>
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
    & Pick<UserEntity, 'id' | 'email' | 'username'>
  )> }
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


export const CreatePostDocument = gql`
    mutation CreatePost($email: String!, $title: String!, $content: String!) {
  createPost(email: $email, title: $title, content: $content) {
    id
    title
    content
    likes
    views
    createdAt
    author {
      id
      username
      email
    }
  }
}
    `;
export type CreatePostMutationFn = ApolloReactCommon.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      email: // value for 'email'
 *      title: // value for 'title'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        return ApolloReactHooks.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, baseOptions);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = ApolloReactCommon.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = ApolloReactCommon.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const GetPostDocument = gql`
    query GetPost($postId: Int!) {
  getPost(postId: $postId) {
    id
    title
    content
    likes
    views
    createdAt
    author {
      id
      username
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
export const GetPostsDocument = gql`
    query GetPosts {
  getPosts {
    id
    title
    content
    likes
    views
    createdAt
    author {
      id
      username
      email
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
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    user {
      id
      email
      username
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
    email
    username
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