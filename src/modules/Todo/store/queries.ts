import gql from 'graphql-tag'

export * from './src/todoFragment'
export * from './src/todoEditFragment'
export * from './src/todosQuery'
export * from './src/todosByStateQuery'
export * from './src/addTodoMutation'
export * from './src/removeTodoMutation'
export * from './src/editTodoMutation'

export const TODO_FRAGMENT = gql`
  fragment todoFragment on Todo {
    id
    text
    state
  }
`

export const TODO_EDIT_FRAGMENT = gql`
  fragment todoEditFragment on Todo {
    text
    state
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

export const TODOS_BY_STATE = gql`
  ${TODO_FRAGMENT}
  query todosByStateQuery($state: TaskState) {
    todosByState(state: $state) @client {
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

export const EDIT_TODO = gql`
  mutation editTodoMutation($id: String!, $text: String, $state: TaskState) {
    editTodo(id: $id, text: $text, state: $state) @client
  }
`
