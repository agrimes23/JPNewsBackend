const typeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type KanjiList {
    word: [String!]
  }

  type Article {
    source: ArticleSource
    author: String
    title: String
    description: String
    url: String
    urlToImage: String
    publishedAt: String
    content: String
  }

  type ArticleSource {
    id: String
    name: String
  }

  type ApiResponse {
    status: String
    totalResults: Int
    articles: [Article]
  }

  type Query {
    getUsers: [User]
    getUserById(id: ID!): User
    getKanji(level: String!): KanjiList
    getArticles: ApiResponse
  }

  type Mutation {
    registerUser(input: UserInput!): AuthPayload
    loginUser(input: LoginInput!): AuthPayload
    deleteUser(id: ID!): [User]
  }

  input UserInput {
    name: String!
    email: String!
    password: String!
  }

  input LoginInput {
  email: String!
  password: String!
}

  type AuthPayload {
    user: User
    token: String
  }

`;

module.exports = typeDefs
