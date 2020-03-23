import gql from 'graphql-tag'

export * from './src/todoFragment'
export * from './src/todoDoneFragment'
export * from './src/todosQuery'
export * from './src/addTodoMutation'
export * from './src/removeTodoMutation'
export * from './src/toggleTodoMutation'

export const TODO_FRAGMENT = gql`
  fragment todoFragment on Todo {
    id
    text
    done
  }
`

export const TODO_DONE_FRAGMENT = gql`
  fragment todoDoneFragment on Todo {
    done
  }
`

export const TODOS = gql`
  ${TODO_FRAGMENT}
  query todosQuery {
    todos @client {
      ...todoFragment
    }
  }
`

export const ADD_TODO = gql`
  ${TODO_FRAGMENT}
  mutation addTodoMutation($text: String!) {
    addTodo(text: $text) @client {
      ...todoFragment
    }
  }
`

export const REMOVE_TODO = gql`
  mutation removeTodoMutation($id: String!) {
    removeTodo(id: $id) @client
  }
`

export const TOGGLE_TODO = gql`
  mutation toggleTodoMutation($id: String!, $done: Boolean!) {
    toggleTodo(id: $id, done: $done) @client
  }
`
