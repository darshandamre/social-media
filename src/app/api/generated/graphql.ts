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

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
};


export type MutationLoginArgs = {
  input: UserLoginInput;
};


export type MutationRegisterArgs = {
  input: UserRegisterInput;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  me?: Maybe<User>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lastName?: Maybe<Scalars['String']>;
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type UserLoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UserRegisterInput = {
  email: Scalars['String'];
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type LoginMutationVariables = Exact<{
  input: UserLoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, username: string, email: string, createdAt: string, updatedAt: string } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  input: UserRegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, username: string, createdAt: string, updatedAt: string } | null } };

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = { __typename?: 'Query', hello: string };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename: 'User', id: string, username: string, email: string, firstName?: string | null, lastName?: string | null, createdAt: string, updatedAt: string } | null };


export const LoginDocument = `
    mutation Login($input: UserLoginInput!) {
  login(input: $input) {
    errors {
      field
      message
    }
    user {
      id
      firstName
      lastName
      username
      email
      createdAt
      updatedAt
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
    mutation Register($input: UserRegisterInput!) {
  register(input: $input) {
    errors {
      field
      message
    }
    user {
      id
      email
      firstName
      lastName
      username
      createdAt
      updatedAt
      __typename
    }
  }
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
    firstName
    lastName
    createdAt
    updatedAt
    __typename
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    Login: build.mutation<LoginMutation, LoginMutationVariables>({
      query: (variables) => ({ document: LoginDocument, variables })
    }),
    Logout: build.mutation<LogoutMutation, LogoutMutationVariables | void>({
      query: (variables) => ({ document: LogoutDocument, variables })
    }),
    Register: build.mutation<RegisterMutation, RegisterMutationVariables>({
      query: (variables) => ({ document: RegisterDocument, variables })
    }),
    Hello: build.query<HelloQuery, HelloQueryVariables | void>({
      query: (variables) => ({ document: HelloDocument, variables })
    }),
    Me: build.query<MeQuery, MeQueryVariables | void>({
      query: (variables) => ({ document: MeDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };


