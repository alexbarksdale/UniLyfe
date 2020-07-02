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
    upVotes: Scalars['Int'];
    downVotes: Scalars['Int'];
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
    upVotes?: Maybe<Scalars['Int']>;
    downVotes?: Maybe<Scalars['Int']>;
};

export type Query = {
    __typename?: 'Query';
    users: Array<UserEntity>;
    getUser: UserEntity;
    getPostComments: Array<CommentEntity>;
    getPost: PostEntity;
};

export type QueryGetUserArgs = {
    email: Scalars['String'];
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

export type LoginMutationVariables = Exact<{
    email: Scalars['String'];
    password: Scalars['String'];
}>;

export type LoginMutation = { __typename?: 'Mutation' } & {
    login: { __typename?: 'LoginResponse' } & Pick<LoginResponse, 'accessToken'> & {
            user: { __typename?: 'UserEntity' } & Pick<
                UserEntity,
                'id' | 'email' | 'username'
            >;
        };
};

export type RegisterMutationVariables = Exact<{
    email: Scalars['String'];
    password: Scalars['String'];
}>;

export type RegisterMutation = { __typename?: 'Mutation' } & {
    register: { __typename?: 'RegisterResponse' } & Pick<
        RegisterResponse,
        'registerMsg' | 'registerSuccess'
    >;
};

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
export type LoginMutationFn = ApolloReactCommon.MutationFunction<
    LoginMutation,
    LoginMutationVariables
>;

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
export function useLoginMutation(
    baseOptions?: ApolloReactHooks.MutationHookOptions<
        LoginMutation,
        LoginMutationVariables
    >
) {
    return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(
        LoginDocument,
        baseOptions
    );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<
    LoginMutation,
    LoginMutationVariables
>;
export const RegisterDocument = gql`
    mutation Register($email: String!, $password: String!) {
        register(email: $email, password: $password) {
            registerMsg
            registerSuccess
        }
    }
`;
export type RegisterMutationFn = ApolloReactCommon.MutationFunction<
    RegisterMutation,
    RegisterMutationVariables
>;

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
export function useRegisterMutation(
    baseOptions?: ApolloReactHooks.MutationHookOptions<
        RegisterMutation,
        RegisterMutationVariables
    >
) {
    return ApolloReactHooks.useMutation<RegisterMutation, RegisterMutationVariables>(
        RegisterDocument,
        baseOptions
    );
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = ApolloReactCommon.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = ApolloReactCommon.BaseMutationOptions<
    RegisterMutation,
    RegisterMutationVariables
>;

