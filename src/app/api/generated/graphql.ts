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
  createPost: Post;
  deletePost: Scalars['Boolean'];
  dislike: Scalars['Boolean'];
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


export type MutationCreatePostArgs = {
  content: Scalars['String'];
};


export type MutationDeletePostArgs = {
  id: Scalars['String'];
};


export type MutationDislikeArgs = {
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
  content: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  likedBy?: Maybe<Array<User>>;
  updatedAt: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  me?: Maybe<User>;
  post?: Maybe<Post>;
  posts: Array<Post>;
  userFeed: Array<Post>;
};


export type QueryPostArgs = {
  id: Scalars['String'];
};

export type RegisterInput = {
  email: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  username: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  bio?: Maybe<Scalars['String']>;
  bookmarks?: Maybe<Array<Post>>;
  createdAt: Scalars['String'];
  email: Scalars['String'];
  followers?: Maybe<Array<User>>;
  following?: Maybe<Array<User>>;
  id: Scalars['ID'];
  likes?: Maybe<Array<Post>>;
  name?: Maybe<Scalars['String']>;
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

export type AddBookmarkMutationVariables = Exact<{
  postId: Scalars['String'];
}>;


export type AddBookmarkMutation = { __typename?: 'Mutation', addBookmark: boolean };

export type CreatePostMutationVariables = Exact<{
  content: Scalars['String'];
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Post', id: string, content: string, authorId: string, createdAt: string, updatedAt: string } };

export type DeletePostMutationVariables = Exact<{
  postId: Scalars['String'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost: boolean };

export type DislikeMutationVariables = Exact<{
  postId: Scalars['String'];
}>;


export type DislikeMutation = { __typename?: 'Mutation', dislike: boolean };

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

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = { __typename?: 'Query', hello: string };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename: 'User', id: string, username: string, email: string, name?: string | null, createdAt: string, updatedAt: string } | null };

export type PostQueryVariables = Exact<{
  postId: Scalars['String'];
}>;


export type PostQuery = { __typename?: 'Query', post?: { __typename?: 'Post', id: string, content: string, authorId: string, createdAt: string, updatedAt: string, author?: { __typename?: 'User', name?: string | null, username: string } | null } | null };

export type PostsQueryVariables = Exact<{ [key: string]: never; }>;


export type PostsQuery = { __typename?: 'Query', posts: Array<{ __typename?: 'Post', id: string, content: string, authorId: string, createdAt: string, updatedAt: string, author?: { __typename?: 'User', name?: string | null, username: string } | null }> };

export type UserFeedQueryVariables = Exact<{ [key: string]: never; }>;


export type UserFeedQuery = { __typename?: 'Query', userFeed: Array<{ __typename?: 'Post', id: string, content: string, authorId: string, createdAt: string, updatedAt: string, author?: { __typename?: 'User', username: string, name?: string | null } | null }> };


export const AddBookmarkDocument = `
    mutation AddBookmark($postId: String!) {
  addBookmark(id: $postId)
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
export const HelloDocument = `
    query Hello {
  hello
}
    `;
export const MeDocument = `
    query Me {
  me {
    id
    username
    email
    name
    createdAt
    updatedAt
    __typename
  }
}
    `;
export const PostDocument = `
    query Post($postId: String!) {
  post(id: $postId) {
    id
    content
    authorId
    author {
      name
      username
    }
    createdAt
    updatedAt
  }
}
    `;
export const PostsDocument = `
    query Posts {
  posts {
    id
    content
    authorId
    author {
      name
      username
    }
    createdAt
    updatedAt
  }
}
    `;
export const UserFeedDocument = `
    query UserFeed {
  userFeed {
    id
    content
    authorId
    author {
      username
      name
    }
    createdAt
    updatedAt
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    AddBookmark: build.mutation<AddBookmarkMutation, AddBookmarkMutationVariables>({
      query: (variables) => ({ document: AddBookmarkDocument, variables })
    }),
    CreatePost: build.mutation<CreatePostMutation, CreatePostMutationVariables>({
      query: (variables) => ({ document: CreatePostDocument, variables })
    }),
    DeletePost: build.mutation<DeletePostMutation, DeletePostMutationVariables>({
      query: (variables) => ({ document: DeletePostDocument, variables })
    }),
    Dislike: build.mutation<DislikeMutation, DislikeMutationVariables>({
      query: (variables) => ({ document: DislikeDocument, variables })
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
    Hello: build.query<HelloQuery, HelloQueryVariables | void>({
      query: (variables) => ({ document: HelloDocument, variables })
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
    UserFeed: build.query<UserFeedQuery, UserFeedQueryVariables | void>({
      query: (variables) => ({ document: UserFeedDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };


