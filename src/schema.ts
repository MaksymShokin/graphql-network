import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Query {
    post(id: ID!): Post
    user(id: ID!): User
    posts: [Post]!
  }

  type Mutation {
    postCreate(title: String!, content: String!): PostPayload!
    postUpdate(postId: ID!, title: String, content: String): PostPayload!
    postDelete(postId: ID!): PostPayload!
    postPublish(postId: ID!): PostPayload!
    postUnpublish(postId: ID!): PostPayload!
    signup(
      email: String!
      password: String!
      name: String!
      bio: String!
    ): UserPayload!
    signin(email: String!, password: String!): UserPayload!
  }

  type User {
    id: ID!
    email: String!
    name: String
    createdAt: String!
    profile: Profile
    posts: [Post]!
  }

  type UserPayload {
    userErrors: [String]!
    token: String
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    published: Boolean!
    createdAt: String!
    user: User!
  }

  type PostPayload {
    userErrors: [String]!
    post: Post
  }

  type Profile {
    id: ID!
    bio: String!
    user: User!
  }
`;
