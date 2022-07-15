import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Comment = {
  __typename?: 'Comment';
  author?: Maybe<User>;
  authorId: Scalars['Float'];
  content: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['Float'];
  post?: Maybe<Post>;
  postId: Scalars['Float'];
  updatedAt: Scalars['String'];
};

export type EditUserInput = {
  bio?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  portfolioLink?: InputMaybe<Scalars['String']>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field?: Maybe<Scalars['String']>;
  message: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addBookmark: Scalars['Boolean'];
  createComment: Comment;
  createPost: Post;
  deleteComment: Scalars['Boolean'];
  deletePost: Scalars['Boolean'];
  dislike: Scalars['Boolean'];
  editComment?: Maybe<Comment>;
  editPost?: Maybe<Post>;
  editUser: UserResponse;
  follow: Scalars['Boolean'];
  like: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
  removeBookmark: Scalars['Boolean'];
  unfollow: Scalars['Boolean'];
};


export type MutationAddBookmarkArgs = {
  id: Scalars['Int'];
};


export type MutationCreateCommentArgs = {
  content: Scalars['String'];
  postId: Scalars['Int'];
};


export type MutationCreatePostArgs = {
  content: Scalars['String'];
};


export type MutationDeleteCommentArgs = {
  id: Scalars['Int'];
};


export type MutationDeletePostArgs = {
  id: Scalars['Int'];
};


export type MutationDislikeArgs = {
  id: Scalars['Int'];
};


export type MutationEditCommentArgs = {
  content: Scalars['String'];
  id: Scalars['Int'];
};


export type MutationEditPostArgs = {
  content: Scalars['String'];
  id: Scalars['Int'];
};


export type MutationEditUserArgs = {
  input: EditUserInput;
};


export type MutationFollowArgs = {
  followId: Scalars['Int'];
};


export type MutationLikeArgs = {
  id: Scalars['Int'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationRemoveBookmarkArgs = {
  id: Scalars['Int'];
};


export type MutationUnfollowArgs = {
  unfollowId: Scalars['Int'];
};

export type Post = {
  __typename?: 'Post';
  author?: Maybe<User>;
  authorId: Scalars['Float'];
  comments?: Maybe<Comment>;
  content: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['Float'];
  isBookmarkedByMe: Scalars['Boolean'];
  isLikedByMe: Scalars['Boolean'];
  likedBy?: Maybe<Array<User>>;
  likes: Scalars['Int'];
  publicId: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  bookmarkedPosts?: Maybe<Array<Post>>;
  comments: Array<Comment>;
  hello: Scalars['String'];
  likedPosts?: Maybe<Array<Post>>;
  me?: Maybe<User>;
  post?: Maybe<Post>;
  posts: Array<Post>;
  user?: Maybe<User>;
  userFeed: Array<Post>;
};


export type QueryCommentsArgs = {
  postId: Scalars['Int'];
};


export type QueryPostArgs = {
  id: Scalars['String'];
};


export type QueryUserArgs = {
  username: Scalars['String'];
};

export type RegisterInput = {
  email: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  username: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  amIFollowingThem: Scalars['Boolean'];
  bio?: Maybe<Scalars['String']>;
  bookmarks?: Maybe<Array<Post>>;
  createdAt?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  followers?: Maybe<Array<User>>;
  following?: Maybe<Array<User>>;
  id: Scalars['Float'];
  isMyFollower: Scalars['Boolean'];
  likes?: Maybe<Array<Post>>;
  name?: Maybe<Scalars['String']>;
  numFollowers?: Maybe<Scalars['Int']>;
  numFollowing?: Maybe<Scalars['Int']>;
  portfolioLink?: Maybe<Scalars['String']>;
  posts?: Maybe<Array<Post>>;
  updatedAt?: Maybe<Scalars['String']>;
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type PostWithAuthorFieldFragment = { __typename: 'Post', id: number, publicId: string, content: string, likes: number, isLikedByMe: boolean, isBookmarkedByMe: boolean, authorId: number, createdAt: string, updatedAt: string, author?: { __typename: 'User', id: number, name?: string | null, username: string, amIFollowingThem: boolean } | null };

export type RegularErrorFragment = { __typename?: 'FieldError', field?: string | null, message: string };

export type RegularUserFragment = { __typename: 'User', id: number, name?: string | null, username: string, amIFollowingThem: boolean };

export type RegularUserResponseFragment = { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field?: string | null, message: string }> | null, user?: { __typename: 'User', id: number, name?: string | null, username: string, amIFollowingThem: boolean } | null };

export type AddBookmarkMutationVariables = Exact<{
  postId: Scalars['Int'];
}>;


export type AddBookmarkMutation = { __typename?: 'Mutation', addBookmark: boolean };

export type CreateCommentMutationVariables = Exact<{
  content: Scalars['String'];
  postId: Scalars['Int'];
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename: 'Comment', id: number, content: string, authorId: number, postId: number, createdAt: string, updatedAt: string } };

export type CreatePostMutationVariables = Exact<{
  content: Scalars['String'];
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename: 'Post', id: number, publicId: string, content: string, authorId: number, createdAt: string, updatedAt: string } };

export type DeleteCommentMutationVariables = Exact<{
  commentId: Scalars['Int'];
}>;


export type DeleteCommentMutation = { __typename?: 'Mutation', deleteComment: boolean };

export type DeletePostMutationVariables = Exact<{
  postId: Scalars['Int'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost: boolean };

export type DislikeMutationVariables = Exact<{
  postId: Scalars['Int'];
}>;


export type DislikeMutation = { __typename?: 'Mutation', dislike: boolean };

export type EditCommentMutationVariables = Exact<{
  content: Scalars['String'];
  commentId: Scalars['Int'];
}>;


export type EditCommentMutation = { __typename?: 'Mutation', editComment?: { __typename: 'Comment', id: number, content: string, authorId: number, postId: number, createdAt: string, updatedAt: string } | null };

export type EditPostMutationVariables = Exact<{
  content: Scalars['String'];
  postId: Scalars['Int'];
}>;


export type EditPostMutation = { __typename?: 'Mutation', editPost?: { __typename: 'Post', id: number, content: string, authorId: number, createdAt: string, updatedAt: string } | null };

export type EditUserMutationVariables = Exact<{
  input: EditUserInput;
}>;


export type EditUserMutation = { __typename?: 'Mutation', editUser: { __typename?: 'UserResponse', user?: { __typename: 'User', id: number, username: string, name?: string | null, bio?: string | null, portfolioLink?: string | null, createdAt?: string | null, updatedAt?: string | null } | null, errors?: Array<{ __typename?: 'FieldError', field?: string | null, message: string }> | null } };

export type FollowMutationVariables = Exact<{
  followId: Scalars['Int'];
}>;


export type FollowMutation = { __typename?: 'Mutation', follow: boolean };

export type LikeMutationVariables = Exact<{
  postId: Scalars['Int'];
}>;


export type LikeMutation = { __typename?: 'Mutation', like: boolean };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', user?: { __typename?: 'User', id: number, name?: string | null, username: string, email: string, createdAt?: string | null, updatedAt?: string | null } | null, errors?: Array<{ __typename?: 'FieldError', field?: string | null, message: string }> | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  input: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', user?: { __typename: 'User', id: number, email: string, name?: string | null, username: string, createdAt?: string | null, updatedAt?: string | null } | null, errors?: Array<{ __typename?: 'FieldError', field?: string | null, message: string }> | null } };

export type RemoveBookmarkMutationVariables = Exact<{
  postId: Scalars['Int'];
}>;


export type RemoveBookmarkMutation = { __typename?: 'Mutation', removeBookmark: boolean };

export type UnfollowMutationVariables = Exact<{
  unfollowId: Scalars['Int'];
}>;


export type UnfollowMutation = { __typename?: 'Mutation', unfollow: boolean };

export type BookmarkedPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type BookmarkedPostsQuery = { __typename?: 'Query', bookmarkedPosts?: Array<{ __typename: 'Post', id: number, publicId: string, content: string, likes: number, isLikedByMe: boolean, isBookmarkedByMe: boolean, authorId: number, createdAt: string, updatedAt: string, author?: { __typename: 'User', id: number, name?: string | null, username: string, amIFollowingThem: boolean } | null }> | null };

export type CommentsQueryVariables = Exact<{
  postId: Scalars['Int'];
}>;


export type CommentsQuery = { __typename?: 'Query', comments: Array<{ __typename: 'Comment', id: number, content: string, authorId: number, postId: number, createdAt: string, updatedAt: string, author?: { __typename: 'User', id: number, name?: string | null, username: string, amIFollowingThem: boolean } | null }> };

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = { __typename?: 'Query', hello: string };

export type LikedPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type LikedPostsQuery = { __typename?: 'Query', likedPosts?: Array<{ __typename: 'Post', id: number, publicId: string, content: string, likes: number, isLikedByMe: boolean, isBookmarkedByMe: boolean, authorId: number, createdAt: string, updatedAt: string, author?: { __typename: 'User', id: number, name?: string | null, username: string, amIFollowingThem: boolean } | null }> | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename: 'User', id: number, name?: string | null, username: string, amIFollowingThem: boolean } | null };

export type PostQueryVariables = Exact<{
  postId: Scalars['String'];
}>;


export type PostQuery = { __typename?: 'Query', post?: { __typename: 'Post', id: number, publicId: string, content: string, likes: number, isLikedByMe: boolean, isBookmarkedByMe: boolean, authorId: number, createdAt: string, updatedAt: string, author?: { __typename: 'User', id: number, name?: string | null, username: string, amIFollowingThem: boolean } | null } | null };

export type PostsQueryVariables = Exact<{ [key: string]: never; }>;


export type PostsQuery = { __typename?: 'Query', posts: Array<{ __typename: 'Post', id: number, publicId: string, content: string, likes: number, isLikedByMe: boolean, isBookmarkedByMe: boolean, authorId: number, createdAt: string, updatedAt: string, author?: { __typename: 'User', id: number, name?: string | null, username: string, amIFollowingThem: boolean } | null }> };

export type UserQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type UserQuery = { __typename?: 'Query', user?: { __typename: 'User', bio?: string | null, portfolioLink?: string | null, numFollowers?: number | null, numFollowing?: number | null, isMyFollower: boolean, id: number, name?: string | null, username: string, amIFollowingThem: boolean, posts?: Array<{ __typename: 'Post', id: number, publicId: string, content: string, likes: number, isLikedByMe: boolean, isBookmarkedByMe: boolean, authorId: number, createdAt: string, updatedAt: string, author?: { __typename: 'User', id: number, name?: string | null, username: string, amIFollowingThem: boolean } | null }> | null } | null };

export type UserFeedQueryVariables = Exact<{ [key: string]: never; }>;


export type UserFeedQuery = { __typename?: 'Query', userFeed: Array<{ __typename: 'Post', id: number, publicId: string, content: string, likes: number, isLikedByMe: boolean, isBookmarkedByMe: boolean, authorId: number, createdAt: string, updatedAt: string, author?: { __typename: 'User', id: number, name?: string | null, username: string, amIFollowingThem: boolean } | null }> };

export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  name
  username
  amIFollowingThem
  __typename
}
    `;
export const PostWithAuthorFieldFragmentDoc = gql`
    fragment PostWithAuthorField on Post {
  id
  publicId
  content
  likes
  isLikedByMe
  isBookmarkedByMe
  authorId
  author {
    ...RegularUser
  }
  createdAt
  updatedAt
  __typename
}
    ${RegularUserFragmentDoc}`;
export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on UserResponse {
  errors {
    ...RegularError
  }
  user {
    ...RegularUser
  }
}
    ${RegularErrorFragmentDoc}
${RegularUserFragmentDoc}`;
export const AddBookmarkDocument = gql`
    mutation AddBookmark($postId: Int!) {
  addBookmark(id: $postId)
}
    `;
export type AddBookmarkMutationFn = Apollo.MutationFunction<AddBookmarkMutation, AddBookmarkMutationVariables>;

/**
 * __useAddBookmarkMutation__
 *
 * To run a mutation, you first call `useAddBookmarkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddBookmarkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addBookmarkMutation, { data, loading, error }] = useAddBookmarkMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useAddBookmarkMutation(baseOptions?: Apollo.MutationHookOptions<AddBookmarkMutation, AddBookmarkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddBookmarkMutation, AddBookmarkMutationVariables>(AddBookmarkDocument, options);
      }
export type AddBookmarkMutationHookResult = ReturnType<typeof useAddBookmarkMutation>;
export type AddBookmarkMutationResult = Apollo.MutationResult<AddBookmarkMutation>;
export type AddBookmarkMutationOptions = Apollo.BaseMutationOptions<AddBookmarkMutation, AddBookmarkMutationVariables>;
export const CreateCommentDocument = gql`
    mutation CreateComment($content: String!, $postId: Int!) {
  createComment(content: $content, postId: $postId) {
    id
    content
    authorId
    postId
    createdAt
    updatedAt
    __typename
  }
}
    `;
export type CreateCommentMutationFn = Apollo.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

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
 *      content: // value for 'content'
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, options);
      }
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;
export const CreatePostDocument = gql`
    mutation CreatePost($content: String!) {
  createPost(content: $content) {
    id
    publicId
    content
    authorId
    createdAt
    updatedAt
    __typename
  }
}
    `;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

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
 *      content: // value for 'content'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const DeleteCommentDocument = gql`
    mutation DeleteComment($commentId: Int!) {
  deleteComment(id: $commentId)
}
    `;
export type DeleteCommentMutationFn = Apollo.MutationFunction<DeleteCommentMutation, DeleteCommentMutationVariables>;

/**
 * __useDeleteCommentMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentMutation, { data, loading, error }] = useDeleteCommentMutation({
 *   variables: {
 *      commentId: // value for 'commentId'
 *   },
 * });
 */
export function useDeleteCommentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCommentMutation, DeleteCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCommentMutation, DeleteCommentMutationVariables>(DeleteCommentDocument, options);
      }
export type DeleteCommentMutationHookResult = ReturnType<typeof useDeleteCommentMutation>;
export type DeleteCommentMutationResult = Apollo.MutationResult<DeleteCommentMutation>;
export type DeleteCommentMutationOptions = Apollo.BaseMutationOptions<DeleteCommentMutation, DeleteCommentMutationVariables>;
export const DeletePostDocument = gql`
    mutation DeletePost($postId: Int!) {
  deletePost(id: $postId)
}
    `;
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, options);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const DislikeDocument = gql`
    mutation Dislike($postId: Int!) {
  dislike(id: $postId)
}
    `;
export type DislikeMutationFn = Apollo.MutationFunction<DislikeMutation, DislikeMutationVariables>;

/**
 * __useDislikeMutation__
 *
 * To run a mutation, you first call `useDislikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDislikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dislikeMutation, { data, loading, error }] = useDislikeMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useDislikeMutation(baseOptions?: Apollo.MutationHookOptions<DislikeMutation, DislikeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DislikeMutation, DislikeMutationVariables>(DislikeDocument, options);
      }
export type DislikeMutationHookResult = ReturnType<typeof useDislikeMutation>;
export type DislikeMutationResult = Apollo.MutationResult<DislikeMutation>;
export type DislikeMutationOptions = Apollo.BaseMutationOptions<DislikeMutation, DislikeMutationVariables>;
export const EditCommentDocument = gql`
    mutation EditComment($content: String!, $commentId: Int!) {
  editComment(content: $content, id: $commentId) {
    id
    content
    authorId
    postId
    createdAt
    updatedAt
    __typename
  }
}
    `;
export type EditCommentMutationFn = Apollo.MutationFunction<EditCommentMutation, EditCommentMutationVariables>;

/**
 * __useEditCommentMutation__
 *
 * To run a mutation, you first call `useEditCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editCommentMutation, { data, loading, error }] = useEditCommentMutation({
 *   variables: {
 *      content: // value for 'content'
 *      commentId: // value for 'commentId'
 *   },
 * });
 */
export function useEditCommentMutation(baseOptions?: Apollo.MutationHookOptions<EditCommentMutation, EditCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditCommentMutation, EditCommentMutationVariables>(EditCommentDocument, options);
      }
export type EditCommentMutationHookResult = ReturnType<typeof useEditCommentMutation>;
export type EditCommentMutationResult = Apollo.MutationResult<EditCommentMutation>;
export type EditCommentMutationOptions = Apollo.BaseMutationOptions<EditCommentMutation, EditCommentMutationVariables>;
export const EditPostDocument = gql`
    mutation EditPost($content: String!, $postId: Int!) {
  editPost(content: $content, id: $postId) {
    id
    content
    authorId
    createdAt
    updatedAt
    __typename
  }
}
    `;
export type EditPostMutationFn = Apollo.MutationFunction<EditPostMutation, EditPostMutationVariables>;

/**
 * __useEditPostMutation__
 *
 * To run a mutation, you first call `useEditPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editPostMutation, { data, loading, error }] = useEditPostMutation({
 *   variables: {
 *      content: // value for 'content'
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useEditPostMutation(baseOptions?: Apollo.MutationHookOptions<EditPostMutation, EditPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditPostMutation, EditPostMutationVariables>(EditPostDocument, options);
      }
export type EditPostMutationHookResult = ReturnType<typeof useEditPostMutation>;
export type EditPostMutationResult = Apollo.MutationResult<EditPostMutation>;
export type EditPostMutationOptions = Apollo.BaseMutationOptions<EditPostMutation, EditPostMutationVariables>;
export const EditUserDocument = gql`
    mutation EditUser($input: EditUserInput!) {
  editUser(input: $input) {
    user {
      id
      username
      name
      bio
      portfolioLink
      createdAt
      updatedAt
      __typename
    }
    errors {
      ...RegularError
    }
  }
}
    ${RegularErrorFragmentDoc}`;
export type EditUserMutationFn = Apollo.MutationFunction<EditUserMutation, EditUserMutationVariables>;

/**
 * __useEditUserMutation__
 *
 * To run a mutation, you first call `useEditUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editUserMutation, { data, loading, error }] = useEditUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditUserMutation(baseOptions?: Apollo.MutationHookOptions<EditUserMutation, EditUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditUserMutation, EditUserMutationVariables>(EditUserDocument, options);
      }
export type EditUserMutationHookResult = ReturnType<typeof useEditUserMutation>;
export type EditUserMutationResult = Apollo.MutationResult<EditUserMutation>;
export type EditUserMutationOptions = Apollo.BaseMutationOptions<EditUserMutation, EditUserMutationVariables>;
export const FollowDocument = gql`
    mutation Follow($followId: Int!) {
  follow(followId: $followId)
}
    `;
export type FollowMutationFn = Apollo.MutationFunction<FollowMutation, FollowMutationVariables>;

/**
 * __useFollowMutation__
 *
 * To run a mutation, you first call `useFollowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFollowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [followMutation, { data, loading, error }] = useFollowMutation({
 *   variables: {
 *      followId: // value for 'followId'
 *   },
 * });
 */
export function useFollowMutation(baseOptions?: Apollo.MutationHookOptions<FollowMutation, FollowMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FollowMutation, FollowMutationVariables>(FollowDocument, options);
      }
export type FollowMutationHookResult = ReturnType<typeof useFollowMutation>;
export type FollowMutationResult = Apollo.MutationResult<FollowMutation>;
export type FollowMutationOptions = Apollo.BaseMutationOptions<FollowMutation, FollowMutationVariables>;
export const LikeDocument = gql`
    mutation Like($postId: Int!) {
  like(id: $postId)
}
    `;
export type LikeMutationFn = Apollo.MutationFunction<LikeMutation, LikeMutationVariables>;

/**
 * __useLikeMutation__
 *
 * To run a mutation, you first call `useLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likeMutation, { data, loading, error }] = useLikeMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useLikeMutation(baseOptions?: Apollo.MutationHookOptions<LikeMutation, LikeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LikeMutation, LikeMutationVariables>(LikeDocument, options);
      }
export type LikeMutationHookResult = ReturnType<typeof useLikeMutation>;
export type LikeMutationResult = Apollo.MutationResult<LikeMutation>;
export type LikeMutationOptions = Apollo.BaseMutationOptions<LikeMutation, LikeMutationVariables>;
export const LoginDocument = gql`
    mutation Login($input: LoginInput!) {
  login(input: $input) {
    user {
      id
      name
      username
      email
      createdAt
      updatedAt
    }
    errors {
      ...RegularError
    }
  }
}
    ${RegularErrorFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

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
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

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
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($input: RegisterInput!) {
  register(input: $input) {
    user {
      id
      email
      name
      username
      createdAt
      updatedAt
      __typename
    }
    errors {
      ...RegularError
    }
  }
}
    ${RegularErrorFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

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
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const RemoveBookmarkDocument = gql`
    mutation RemoveBookmark($postId: Int!) {
  removeBookmark(id: $postId)
}
    `;
export type RemoveBookmarkMutationFn = Apollo.MutationFunction<RemoveBookmarkMutation, RemoveBookmarkMutationVariables>;

/**
 * __useRemoveBookmarkMutation__
 *
 * To run a mutation, you first call `useRemoveBookmarkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveBookmarkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeBookmarkMutation, { data, loading, error }] = useRemoveBookmarkMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useRemoveBookmarkMutation(baseOptions?: Apollo.MutationHookOptions<RemoveBookmarkMutation, RemoveBookmarkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveBookmarkMutation, RemoveBookmarkMutationVariables>(RemoveBookmarkDocument, options);
      }
export type RemoveBookmarkMutationHookResult = ReturnType<typeof useRemoveBookmarkMutation>;
export type RemoveBookmarkMutationResult = Apollo.MutationResult<RemoveBookmarkMutation>;
export type RemoveBookmarkMutationOptions = Apollo.BaseMutationOptions<RemoveBookmarkMutation, RemoveBookmarkMutationVariables>;
export const UnfollowDocument = gql`
    mutation Unfollow($unfollowId: Int!) {
  unfollow(unfollowId: $unfollowId)
}
    `;
export type UnfollowMutationFn = Apollo.MutationFunction<UnfollowMutation, UnfollowMutationVariables>;

/**
 * __useUnfollowMutation__
 *
 * To run a mutation, you first call `useUnfollowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnfollowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unfollowMutation, { data, loading, error }] = useUnfollowMutation({
 *   variables: {
 *      unfollowId: // value for 'unfollowId'
 *   },
 * });
 */
export function useUnfollowMutation(baseOptions?: Apollo.MutationHookOptions<UnfollowMutation, UnfollowMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnfollowMutation, UnfollowMutationVariables>(UnfollowDocument, options);
      }
export type UnfollowMutationHookResult = ReturnType<typeof useUnfollowMutation>;
export type UnfollowMutationResult = Apollo.MutationResult<UnfollowMutation>;
export type UnfollowMutationOptions = Apollo.BaseMutationOptions<UnfollowMutation, UnfollowMutationVariables>;
export const BookmarkedPostsDocument = gql`
    query BookmarkedPosts {
  bookmarkedPosts {
    ...PostWithAuthorField
    __typename
  }
}
    ${PostWithAuthorFieldFragmentDoc}`;

/**
 * __useBookmarkedPostsQuery__
 *
 * To run a query within a React component, call `useBookmarkedPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useBookmarkedPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBookmarkedPostsQuery({
 *   variables: {
 *   },
 * });
 */
export function useBookmarkedPostsQuery(baseOptions?: Apollo.QueryHookOptions<BookmarkedPostsQuery, BookmarkedPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BookmarkedPostsQuery, BookmarkedPostsQueryVariables>(BookmarkedPostsDocument, options);
      }
export function useBookmarkedPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BookmarkedPostsQuery, BookmarkedPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BookmarkedPostsQuery, BookmarkedPostsQueryVariables>(BookmarkedPostsDocument, options);
        }
export type BookmarkedPostsQueryHookResult = ReturnType<typeof useBookmarkedPostsQuery>;
export type BookmarkedPostsLazyQueryHookResult = ReturnType<typeof useBookmarkedPostsLazyQuery>;
export type BookmarkedPostsQueryResult = Apollo.QueryResult<BookmarkedPostsQuery, BookmarkedPostsQueryVariables>;
export const CommentsDocument = gql`
    query Comments($postId: Int!) {
  comments(postId: $postId) {
    id
    content
    authorId
    author {
      ...RegularUser
    }
    postId
    createdAt
    updatedAt
    __typename
  }
}
    ${RegularUserFragmentDoc}`;

/**
 * __useCommentsQuery__
 *
 * To run a query within a React component, call `useCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommentsQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useCommentsQuery(baseOptions: Apollo.QueryHookOptions<CommentsQuery, CommentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CommentsQuery, CommentsQueryVariables>(CommentsDocument, options);
      }
export function useCommentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CommentsQuery, CommentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CommentsQuery, CommentsQueryVariables>(CommentsDocument, options);
        }
export type CommentsQueryHookResult = ReturnType<typeof useCommentsQuery>;
export type CommentsLazyQueryHookResult = ReturnType<typeof useCommentsLazyQuery>;
export type CommentsQueryResult = Apollo.QueryResult<CommentsQuery, CommentsQueryVariables>;
export const HelloDocument = gql`
    query Hello {
  hello
}
    `;

/**
 * __useHelloQuery__
 *
 * To run a query within a React component, call `useHelloQuery` and pass it any options that fit your needs.
 * When your component renders, `useHelloQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHelloQuery({
 *   variables: {
 *   },
 * });
 */
export function useHelloQuery(baseOptions?: Apollo.QueryHookOptions<HelloQuery, HelloQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HelloQuery, HelloQueryVariables>(HelloDocument, options);
      }
export function useHelloLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HelloQuery, HelloQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HelloQuery, HelloQueryVariables>(HelloDocument, options);
        }
export type HelloQueryHookResult = ReturnType<typeof useHelloQuery>;
export type HelloLazyQueryHookResult = ReturnType<typeof useHelloLazyQuery>;
export type HelloQueryResult = Apollo.QueryResult<HelloQuery, HelloQueryVariables>;
export const LikedPostsDocument = gql`
    query LikedPosts {
  likedPosts {
    ...PostWithAuthorField
    __typename
  }
}
    ${PostWithAuthorFieldFragmentDoc}`;

/**
 * __useLikedPostsQuery__
 *
 * To run a query within a React component, call `useLikedPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useLikedPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLikedPostsQuery({
 *   variables: {
 *   },
 * });
 */
export function useLikedPostsQuery(baseOptions?: Apollo.QueryHookOptions<LikedPostsQuery, LikedPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LikedPostsQuery, LikedPostsQueryVariables>(LikedPostsDocument, options);
      }
export function useLikedPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LikedPostsQuery, LikedPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LikedPostsQuery, LikedPostsQueryVariables>(LikedPostsDocument, options);
        }
export type LikedPostsQueryHookResult = ReturnType<typeof useLikedPostsQuery>;
export type LikedPostsLazyQueryHookResult = ReturnType<typeof useLikedPostsLazyQuery>;
export type LikedPostsQueryResult = Apollo.QueryResult<LikedPostsQuery, LikedPostsQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

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
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const PostDocument = gql`
    query Post($postId: String!) {
  post(id: $postId) {
    ...PostWithAuthorField
    __typename
  }
}
    ${PostWithAuthorFieldFragmentDoc}`;

/**
 * __usePostQuery__
 *
 * To run a query within a React component, call `usePostQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function usePostQuery(baseOptions: Apollo.QueryHookOptions<PostQuery, PostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostQuery, PostQueryVariables>(PostDocument, options);
      }
export function usePostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostQuery, PostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostQuery, PostQueryVariables>(PostDocument, options);
        }
export type PostQueryHookResult = ReturnType<typeof usePostQuery>;
export type PostLazyQueryHookResult = ReturnType<typeof usePostLazyQuery>;
export type PostQueryResult = Apollo.QueryResult<PostQuery, PostQueryVariables>;
export const PostsDocument = gql`
    query Posts {
  posts {
    ...PostWithAuthorField
    __typename
  }
}
    ${PostWithAuthorFieldFragmentDoc}`;

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePostsQuery(baseOptions?: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
      }
export function usePostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
        }
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsQueryResult = Apollo.QueryResult<PostsQuery, PostsQueryVariables>;
export const UserDocument = gql`
    query User($username: String!) {
  user(username: $username) {
    ...RegularUser
    bio
    portfolioLink
    numFollowers
    numFollowing
    isMyFollower
    posts {
      ...PostWithAuthorField
    }
  }
}
    ${RegularUserFragmentDoc}
${PostWithAuthorFieldFragmentDoc}`;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const UserFeedDocument = gql`
    query UserFeed {
  userFeed {
    ...PostWithAuthorField
    __typename
  }
}
    ${PostWithAuthorFieldFragmentDoc}`;

/**
 * __useUserFeedQuery__
 *
 * To run a query within a React component, call `useUserFeedQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserFeedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserFeedQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserFeedQuery(baseOptions?: Apollo.QueryHookOptions<UserFeedQuery, UserFeedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserFeedQuery, UserFeedQueryVariables>(UserFeedDocument, options);
      }
export function useUserFeedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserFeedQuery, UserFeedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserFeedQuery, UserFeedQueryVariables>(UserFeedDocument, options);
        }
export type UserFeedQueryHookResult = ReturnType<typeof useUserFeedQuery>;
export type UserFeedLazyQueryHookResult = ReturnType<typeof useUserFeedLazyQuery>;
export type UserFeedQueryResult = Apollo.QueryResult<UserFeedQuery, UserFeedQueryVariables>;