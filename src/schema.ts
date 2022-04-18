import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Query {
    post(id: ID!): Post
    user(id: ID!): User
    posts: [Post]!
  }

  type Mutation {
    postCreate(title: String!, content: String!): PostPayload!
    postUpdate(id: ID!, title: String, content: String, published: Boolean): PostPayload!
    postDelete(id: ID!): PostPayload!
  }

  type User {
    id: ID!
    email: String!
    name: String
    createdAt: String!
    profile: Profile
    posts: [Post]!
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
