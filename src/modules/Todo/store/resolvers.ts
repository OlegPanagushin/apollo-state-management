import { TAppResolvers } from '../../../lib/types/gql'
import { TODOS, todosQuery, TODO_DONE_FRAGMENT, todoDoneFragment } from './queries'
import { initialState } from './initialState'

let counter = initialState.todos.length

export const resolvers: TAppResolvers = {
  Mutation: {
    addTodo: (_, { text }, { cache }) => {
      const prev = cache.readQuery<todosQuery>({ query: TODOS })
      const todo = { __typename: 'Todo', id: (++counter).toString(), text, done: false }
      const todos = [...(prev?.todos || []), todo]
      const data = { todos }

      cache.writeQuery({ query: TODOS, data })

      return todo
    },
    removeTodo: (_, { id }: { id: string }, { cache }) => {
      const prev = cache.readQuery<todosQuery>({ query: TODOS })
      if (!prev) return

      const idx = prev.todos.findIndex((todo) => todo.id === id)

      if (!prev || idx === undefined || idx === -1) return false

      const newTodos = [...prev.todos]

      newTodos.splice(idx, 1)
      cache.writeQuery({ query: TODOS, data: { todos: newTodos } })

      return true
    },
    toggleTodo: (_, { id, done }: { id: string; done: boolean }, { cache }) => {
      cache.writeFragment<todoDoneFragment>({
        fragment: TODO_DONE_FRAGMENT,
        id: id,
        data: {
          __typename: 'Todo',
          done,
        },
      })

      return true
    },
  },

  Query: {},
}
