import gql from 'graphql-tag'

export const typeDefs = gql`
  enum TaskState {
    IDLE
    IN_PROGRESS
    DONE
  }

  type Todo {
    id: String!
    text: String!
    state: TaskState!
  }

  extend type Query {
    todos: [Todo!]!
    todosByState(state: TaskState): [Todo!]!
  }

  extend type Mutation {
    addTodo(text: String!): Todo
    editTodo(id: String!, text: String, state: TaskState): Boolean
    removeTodo(id: String!): Boolean
  }
`
