import gql from 'graphql-tag'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type CreatePostInput = {
  title: Scalars['String']
  body: Scalars['String']
}

export type Mutation = {
  __typename?: 'Mutation'
  createPost: Post
}

export type MutationCreatePostArgs = {
  post: CreatePostInput
}

export type Post = {
  __typename?: 'Post'
  id: Scalars['ID']
  title: Scalars['String']
  body: Scalars['String']
  userId: Scalars['String']
  user: User
}

export type Query = {
  __typename?: 'Query'
  post: Post
  posts: Array<Post>
  user: User
}

export type QueryPostArgs = {
  id: Scalars['String']
}

export type QueryPostsArgs = {
  limit?: Maybe<Scalars['Int']>
}

export type QueryUserArgs = {
  id: Scalars['String']
}

export type User = {
  __typename?: 'User'
  id: Scalars['ID']
  name: Scalars['String']
  posts: Array<Post>
}

export type GetPostQueryVariables = Exact<{
  id: Scalars['String']
}>

export type GetPostQuery = { __typename?: 'Query' } & {
  post: { __typename?: 'Post' } & Pick<Post, 'id' | 'title' | 'body'> & {
      user: { __typename?: 'User' } & Pick<User, 'id' | 'name'>
    }
}

export const GetPost = gql`
  query getPost($id: String!) {
    post(id: $id) {
      id
      title
      body
      user {
        id
        name
      }
    }
  }
`

export interface PossibleTypesResultData {
  possibleTypes: {
    [key: string]: string[]
  }
}
const result: PossibleTypesResultData = {
  possibleTypes: {},
}
export default result
