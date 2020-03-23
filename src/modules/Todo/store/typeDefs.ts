import gql from 'graphql-tag'

export const typeDefs = gql`
  type Todo {
    id: String!
    text: String!
    done: Boolean!
  }

  extend type Query {
    todos: [Todo!]!
  }

  extend type Mutation {
    addTodo(text: String!): Todo
    editTodo(id: String!, text: String!): Boolean
    removeTodo(id: String!): Boolean
    toggleTodo(id: String!, done: Boolean!): Boolean
  }
`
