import { api } from 'src/app/api/baseApi';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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
  authorId: Scalars['ID'];
  content: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  post?: Maybe<Post>;
  postId: Scalars['ID'];
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
  id: Scalars['String'];
};


export type MutationCreateCommentArgs = {
  content: Scalars['String'];
  postId: Scalars['String'];
};


export type MutationCreatePostArgs = {
  content: Scalars['String'];
};


export type MutationDeleteCommentArgs = {
  id: Scalars['String'];
};


export type MutationDeletePostArgs = {
  id: Scalars['String'];
};


export type MutationDislikeArgs = {
  id: Scalars['String'];
};


export type MutationEditCommentArgs = {
  content: Scalars['String'];
  id: Scalars['String'];
};


export type MutationEditPostArgs = {
  content: Scalars['String'];
  id: Scalars['String'];
};


export type MutationEditUserArgs = {
  input: EditUserInput;
};


export type MutationFollowArgs = {
  followId: Scalars['String'];
};


export type MutationLikeArgs = {
  id: Scalars['String'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationRemoveBookmarkArgs = {
  id: Scalars['String'];
};


export type MutationUnfollowArgs = {
  unfollowId: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  author?: Maybe<User>;
  authorId: Scalars['ID'];
  comments?: Maybe<Comment>;
  content: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  isBookmarkedByMe: Scalars['Boolean'];
  isLikedByMe: Scalars['Boolean'];
  likedBy?: Maybe<Array<User>>;
  likes: Scalars['Int'];
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
  postId: Scalars['String'];
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
  createdAt: Scalars['String'];
  email: Scalars['String'];
  followers?: Maybe<Array<User>>;
  following?: Maybe<Array<User>>;
  id: Scalars['ID'];
  isMyFollower: Scalars['Boolean'];
  likes?: Maybe<Array<Post>>;
  name?: Maybe<Scalars['String']>;
  numFollowers?: Maybe<Scalars['Int']>;
  numFollowing?: Maybe<Scalars['Int']>;
  portfolioLink?: Maybe<Scalars['String']>;
  posts?: Maybe<Array<Post>>;
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type PostWithAuthorFieldFragment = { __typename?: 'Post', id: string, content: string, likes: number, isLikedByMe: boolean, isBookmarkedByMe: boolean, authorId: string, createdAt: string, updatedAt: string, author?: { __typename?: 'User', id: string, name?: string | null, username: string, amIFollowingThem: boolean } | null };

export type RegularErrorFragment = { __typename?: 'FieldError', field?: string | null, message: string };

export type RegularUserFragment = { __typename?: 'User', id: string, name?: string | null, username: string, amIFollowingThem: boolean };

export type RegularUserResponseFragment = { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field?: string | null, message: string }> | null, user?: { __typename?: 'User', id: string, name?: string | null, username: string, amIFollowingThem: boolean } | null };

export type AddBookmarkMutationVariables = Exact<{
  postId: Scalars['String'];
}>;


export type AddBookmarkMutation = { __typename?: 'Mutation', addBookmark: boolean };

export type CreateCommentMutationVariables = Exact<{
  content: Scalars['String'];
  postId: Scalars['String'];
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'Comment', id: string, content: string, authorId: string, postId: string, createdAt: string, updatedAt: string } };

export type CreatePostMutationVariables = Exact<{
  content: Scalars['String'];
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Post', id: string, content: string, authorId: string, createdAt: string, updatedAt: string } };

export type DeleteCommentMutationVariables = Exact<{
  commentId: Scalars['String'];
}>;


export type DeleteCommentMutation = { __typename?: 'Mutation', deleteComment: boolean };

export type DeletePostMutationVariables = Exact<{
  postId: Scalars['String'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost: boolean };

export type DislikeMutationVariables = Exact<{
  postId: Scalars['String'];
}>;


export type DislikeMutation = { __typename?: 'Mutation', dislike: boolean };

export type EditCommentMutationVariables = Exact<{
  content: Scalars['String'];
  commentId: Scalars['String'];
}>;


export type EditCommentMutation = { __typename?: 'Mutation', editComment?: { __typename?: 'Comment', id: string, content: string, authorId: string, postId: string, createdAt: string, updatedAt: string } | null };

export type EditPostMutationVariables = Exact<{
  content: Scalars['String'];
  postId: Scalars['String'];
}>;


export type EditPostMutation = { __typename?: 'Mutation', editPost?: { __typename?: 'Post', id: string, content: string, authorId: string, createdAt: string, updatedAt: string } | null };

export type EditUserMutationVariables = Exact<{
  input: EditUserInput;
}>;


export type EditUserMutation = { __typename?: 'Mutation', editUser: { __typename?: 'UserResponse', user?: { __typename?: 'User', id: string, username: string, name?: string | null, bio?: string | null, portfolioLink?: string | null, createdAt: string, updatedAt: string } | null, errors?: Array<{ __typename?: 'FieldError', field?: string | null, message: string }> | null } };

export type FollowMutationVariables = Exact<{
  followId: Scalars['String'];
}>;


export type FollowMutation = { __typename?: 'Mutation', follow: boolean };

export type LikeMutationVariables = Exact<{
  postId: Scalars['String'];
}>;


export type LikeMutation = { __typename?: 'Mutation', like: boolean };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', user?: { __typename?: 'User', id: string, name?: string | null, username: string, email: string, createdAt: string, updatedAt: string } | null, errors?: Array<{ __typename?: 'FieldError', field?: string | null, message: string }> | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  input: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', user?: { __typename: 'User', id: string, email: string, name?: string | null, username: string, createdAt: string, updatedAt: string } | null, errors?: Array<{ __typename?: 'FieldError', field?: string | null, message: string }> | null } };

export type RemoveBookmarkMutationVariables = Exact<{
  postId: Scalars['String'];
}>;


export type RemoveBookmarkMutation = { __typename?: 'Mutation', removeBookmark: boolean };

export type UnfollowMutationVariables = Exact<{
  unfollowId: Scalars['String'];
}>;


export type UnfollowMutation = { __typename?: 'Mutation', unfollow: boolean };

export type BookmarkedPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type BookmarkedPostsQuery = { __typename?: 'Query', bookmarkedPosts?: Array<{ __typename?: 'Post', id: string, content: string, likes: number, isLikedByMe: boolean, isBookmarkedByMe: boolean, authorId: string, createdAt: string, updatedAt: string, author?: { __typename?: 'User', id: string, name?: string | null, username: string, amIFollowingThem: boolean } | null }> | null };

export type CommentsQueryVariables = Exact<{
  postId: Scalars['String'];
}>;


export type CommentsQuery = { __typename?: 'Query', comments: Array<{ __typename?: 'Comment', id: string, content: string, authorId: string, postId: string, createdAt: string, updatedAt: string, author?: { __typename?: 'User', id: string, name?: string | null, username: string, amIFollowingThem: boolean } | null }> };

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = { __typename?: 'Query', hello: string };

export type LikedPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type LikedPostsQuery = { __typename?: 'Query', likedPosts?: Array<{ __typename?: 'Post', id: string, content: string, likes: number, isLikedByMe: boolean, isBookmarkedByMe: boolean, authorId: string, createdAt: string, updatedAt: string, author?: { __typename?: 'User', id: string, name?: string | null, username: string, amIFollowingThem: boolean } | null }> | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, name?: string | null, username: string, amIFollowingThem: boolean } | null };

export type PostQueryVariables = Exact<{
  postId: Scalars['String'];
}>;


export type PostQuery = { __typename?: 'Query', post?: { __typename?: 'Post', id: string, content: string, likes: number, isLikedByMe: boolean, isBookmarkedByMe: boolean, authorId: string, createdAt: string, updatedAt: string, author?: { __typename?: 'User', id: string, name?: string | null, username: string, amIFollowingThem: boolean } | null } | null };

export type PostsQueryVariables = Exact<{ [key: string]: never; }>;


export type PostsQuery = { __typename?: 'Query', posts: Array<{ __typename?: 'Post', id: string, content: string, likes: number, isLikedByMe: boolean, isBookmarkedByMe: boolean, authorId: string, createdAt: string, updatedAt: string, author?: { __typename?: 'User', id: string, name?: string | null, username: string, amIFollowingThem: boolean } | null }> };

export type UserQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type UserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, name?: string | null, username: string, bio?: string | null, portfolioLink?: string | null, numFollowers?: number | null, numFollowing?: number | null, isMyFollower: boolean, amIFollowingThem: boolean, posts?: Array<{ __typename?: 'Post', id: string, content: string, isBookmarkedByMe: boolean, isLikedByMe: boolean, likes: number, createdAt: string, updatedAt: string }> | null } | null };

export type UserFeedQueryVariables = Exact<{ [key: string]: never; }>;


export type UserFeedQuery = { __typename?: 'Query', userFeed: Array<{ __typename?: 'Post', id: string, content: string, likes: number, isLikedByMe: boolean, isBookmarkedByMe: boolean, authorId: string, createdAt: string, updatedAt: string, author?: { __typename?: 'User', id: string, name?: string | null, username: string, amIFollowingThem: boolean } | null }> };

export const RegularUserFragmentDoc = `
    fragment RegularUser on User {
  id
  name
  username
  amIFollowingThem
}
    `;
export const PostWithAuthorFieldFragmentDoc = `
    fragment PostWithAuthorField on Post {
  id
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
}
    ${RegularUserFragmentDoc}`;
export const RegularErrorFragmentDoc = `
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const RegularUserResponseFragmentDoc = `
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
export const AddBookmarkDocument = `
    mutation AddBookmark($postId: String!) {
  addBookmark(id: $postId)
}
    `;
export const CreateCommentDocument = `
    mutation CreateComment($content: String!, $postId: String!) {
  createComment(content: $content, postId: $postId) {
    id
    content
    authorId
    postId
    createdAt
    updatedAt
  }
}
    `;
export const CreatePostDocument = `
    mutation CreatePost($content: String!) {
  createPost(content: $content) {
    id
    content
    authorId
    createdAt
    updatedAt
  }
}
    `;
export const DeleteCommentDocument = `
    mutation DeleteComment($commentId: String!) {
  deleteComment(id: $commentId)
}
    `;
export const DeletePostDocument = `
    mutation DeletePost($postId: String!) {
  deletePost(id: $postId)
}
    `;
export const DislikeDocument = `
    mutation Dislike($postId: String!) {
  dislike(id: $postId)
}
    `;
export const EditCommentDocument = `
    mutation EditComment($content: String!, $commentId: String!) {
  editComment(content: $content, id: $commentId) {
    id
    content
    authorId
    postId
    createdAt
    updatedAt
  }
}
    `;
export const EditPostDocument = `
    mutation EditPost($content: String!, $postId: String!) {
  editPost(content: $content, id: $postId) {
    id
    content
    authorId
    createdAt
    updatedAt
  }
}
    `;
export const EditUserDocument = `
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
    }
    errors {
      field
      message
    }
  }
}
    `;
export const FollowDocument = `
    mutation Follow($followId: String!) {
  follow(followId: $followId)
}
    `;
export const LikeDocument = `
    mutation Like($postId: String!) {
  like(id: $postId)
}
    `;
export const LoginDocument = `
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
      field
      message
    }
  }
}
    `;
export const LogoutDocument = `
    mutation Logout {
  logout
}
    `;
export const RegisterDocument = `
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
      field
      message
    }
  }
}
    `;
export const RemoveBookmarkDocument = `
    mutation RemoveBookmark($postId: String!) {
  removeBookmark(id: $postId)
}
    `;
export const UnfollowDocument = `
    mutation Unfollow($unfollowId: String!) {
  unfollow(unfollowId: $unfollowId)
}
    `;
export const BookmarkedPostsDocument = `
    query BookmarkedPosts {
  bookmarkedPosts {
    ...PostWithAuthorField
  }
}
    ${PostWithAuthorFieldFragmentDoc}`;
export const CommentsDocument = `
    query Comments($postId: String!) {
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
  }
}
    ${RegularUserFragmentDoc}`;
export const HelloDocument = `
    query Hello {
  hello
}
    `;
export const LikedPostsDocument = `
    query LikedPosts {
  likedPosts {
    ...PostWithAuthorField
  }
}
    ${PostWithAuthorFieldFragmentDoc}`;
export const MeDocument = `
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;
export const PostDocument = `
    query Post($postId: String!) {
  post(id: $postId) {
    ...PostWithAuthorField
  }
}
    ${PostWithAuthorFieldFragmentDoc}`;
export const PostsDocument = `
    query Posts {
  posts {
    ...PostWithAuthorField
  }
}
    ${PostWithAuthorFieldFragmentDoc}`;
export const UserDocument = `
    query User($username: String!) {
  user(username: $username) {
    id
    name
    username
    bio
    portfolioLink
    numFollowers
    numFollowing
    isMyFollower
    amIFollowingThem
    posts {
      id
      content
      isBookmarkedByMe
      isLikedByMe
      likes
      createdAt
      updatedAt
    }
  }
}
    `;
export const UserFeedDocument = `
    query UserFeed {
  userFeed {
    ...PostWithAuthorField
  }
}
    ${PostWithAuthorFieldFragmentDoc}`;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    AddBookmark: build.mutation<AddBookmarkMutation, AddBookmarkMutationVariables>({
      query: (variables) => ({ document: AddBookmarkDocument, variables })
    }),
    CreateComment: build.mutation<CreateCommentMutation, CreateCommentMutationVariables>({
      query: (variables) => ({ document: CreateCommentDocument, variables })
    }),
    CreatePost: build.mutation<CreatePostMutation, CreatePostMutationVariables>({
      query: (variables) => ({ document: CreatePostDocument, variables })
    }),
    DeleteComment: build.mutation<DeleteCommentMutation, DeleteCommentMutationVariables>({
      query: (variables) => ({ document: DeleteCommentDocument, variables })
    }),
    DeletePost: build.mutation<DeletePostMutation, DeletePostMutationVariables>({
      query: (variables) => ({ document: DeletePostDocument, variables })
    }),
    Dislike: build.mutation<DislikeMutation, DislikeMutationVariables>({
      query: (variables) => ({ document: DislikeDocument, variables })
    }),
    EditComment: build.mutation<EditCommentMutation, EditCommentMutationVariables>({
      query: (variables) => ({ document: EditCommentDocument, variables })
    }),
    EditPost: build.mutation<EditPostMutation, EditPostMutationVariables>({
      query: (variables) => ({ document: EditPostDocument, variables })
    }),
    EditUser: build.mutation<EditUserMutation, EditUserMutationVariables>({
      query: (variables) => ({ document: EditUserDocument, variables })
    }),
    Follow: build.mutation<FollowMutation, FollowMutationVariables>({
      query: (variables) => ({ document: FollowDocument, variables })
    }),
    Like: build.mutation<LikeMutation, LikeMutationVariables>({
      query: (variables) => ({ document: LikeDocument, variables })
    }),
    Login: build.mutation<LoginMutation, LoginMutationVariables>({
      query: (variables) => ({ document: LoginDocument, variables })
    }),
    Logout: build.mutation<LogoutMutation, LogoutMutationVariables | void>({
      query: (variables) => ({ document: LogoutDocument, variables })
    }),
    Register: build.mutation<RegisterMutation, RegisterMutationVariables>({
      query: (variables) => ({ document: RegisterDocument, variables })
    }),
    RemoveBookmark: build.mutation<RemoveBookmarkMutation, RemoveBookmarkMutationVariables>({
      query: (variables) => ({ document: RemoveBookmarkDocument, variables })
    }),
    Unfollow: build.mutation<UnfollowMutation, UnfollowMutationVariables>({
      query: (variables) => ({ document: UnfollowDocument, variables })
    }),
    BookmarkedPosts: build.query<BookmarkedPostsQuery, BookmarkedPostsQueryVariables | void>({
      query: (variables) => ({ document: BookmarkedPostsDocument, variables })
    }),
    Comments: build.query<CommentsQuery, CommentsQueryVariables>({
      query: (variables) => ({ document: CommentsDocument, variables })
    }),
    Hello: build.query<HelloQuery, HelloQueryVariables | void>({
      query: (variables) => ({ document: HelloDocument, variables })
    }),
    LikedPosts: build.query<LikedPostsQuery, LikedPostsQueryVariables | void>({
      query: (variables) => ({ document: LikedPostsDocument, variables })
    }),
    Me: build.query<MeQuery, MeQueryVariables | void>({
      query: (variables) => ({ document: MeDocument, variables })
    }),
    Post: build.query<PostQuery, PostQueryVariables>({
      query: (variables) => ({ document: PostDocument, variables })
    }),
    Posts: build.query<PostsQuery, PostsQueryVariables | void>({
      query: (variables) => ({ document: PostsDocument, variables })
    }),
    User: build.query<UserQuery, UserQueryVariables>({
      query: (variables) => ({ document: UserDocument, variables })
    }),
    UserFeed: build.query<UserFeedQuery, UserFeedQueryVariables | void>({
      query: (variables) => ({ document: UserFeedDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };


