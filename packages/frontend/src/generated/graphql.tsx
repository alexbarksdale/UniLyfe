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
  title: Scalars['String'];
  content: Scalars['String'];
  likes: Scalars['Int'];
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
  university: University;
  universityName: Scalars['String'];
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
  getUser: UserEntity;
  me?: Maybe<UserEntity>;
  getCategories: Array<CategoryEntity>;
  getCategoryPosts: Array<CategoryEntity>;
  getPostComments: Array<CommentEntity>;
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
  logout: Scalars['Boolean'];
  createCategory: Scalars['Boolean'];
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


export type MutationCreateCategoryArgs = {
  name: Scalars['String'];
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
  categoryName: Scalars['String'];
  authorId: Scalars['Float'];
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
  authorId: Scalars['Float'];
  title: Scalars['String'];
  content: Scalars['String'];
  categoryName: Scalars['String'];
}>;


export type CreatePostMutation = (
  { __typename?: 'Mutation' }
  & { createPost: (
    { __typename?: 'PostEntity' }
    & Pick<PostEntity, 'id' | 'title' | 'content' | 'likes' | 'views' | 'createdAt'>
    & { category: (
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
    & Pick<CategoryEntity, 'name'>
    & { posts?: Maybe<Array<(
      { __typename?: 'PostEntity' }
      & Pick<PostEntity, 'id' | 'title' | 'content' | 'likes' | 'views' | 'createdAt'>
      & { author: (
        { __typename?: 'UserEntity' }
        & Pick<UserEntity, 'id' | 'username' | 'email'>
        & { university: (
          { __typename?: 'University' }
          & Pick<University, 'domains'>
        ) }
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
    & Pick<PostEntity, 'id' | 'title' | 'content' | 'likes' | 'views' | 'createdAt'>
    & { category: (
      { __typename?: 'CategoryEntity' }
      & Pick<CategoryEntity, 'id' | 'name'>
    ), author: (
      { __typename?: 'UserEntity' }
      & Pick<UserEntity, 'id' | 'username' | 'email' | 'universityName'>
    ) }
  ) }
);

export type GetPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPostsQuery = (
  { __typename?: 'Query' }
  & { getPosts: Array<(
    { __typename?: 'PostEntity' }
    & Pick<PostEntity, 'id' | 'title' | 'content' | 'likes' | 'views' | 'createdAt'>
    & { category: (
      { __typename?: 'CategoryEntity' }
      & Pick<CategoryEntity, 'id' | 'name'>
    ), author: (
      { __typename?: 'UserEntity' }
      & Pick<UserEntity, 'id' | 'username' | 'email' | 'universityName'>
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
      & Pick<UserEntity, 'id' | 'email' | 'username' | 'universityName'>
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
    & Pick<UserEntity, 'id' | 'email' | 'username' | 'universityName'>
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
    mutation CreatePost($authorId: Float!, $title: String!, $content: String!, $categoryName: String!) {
  createPost(authorId: $authorId, title: $title, content: $content, categoryName: $categoryName) {
    id
    title
    content
    likes
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
 *      authorId: // value for 'authorId'
 *      title: // value for 'title'
 *      content: // value for 'content'
 *      categoryName: // value for 'categoryName'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        return ApolloReactHooks.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, baseOptions);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = ApolloReactCommon.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = ApolloReactCommon.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
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
    name
    posts {
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
        university {
          domains
        }
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
    title
    content
    likes
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
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    user {
      id
      email
      username
      universityName
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
    universityName
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