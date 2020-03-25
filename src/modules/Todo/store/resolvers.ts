import { initialState } from './initialState'
import { TODOS, todosQuery, todoFragment, TODO_EDIT_FRAGMENT } from './queries'
import { TAppResolvers } from '../../../lib/types/gql'
import { TaskState } from '../../../globalTypes'

let counter = initialState.todos.length

export const resolvers: TAppResolvers = {
  Mutation: {
    addTodo: (_, { text }, { cache }) => {
      const prev = cache.readQuery<todosQuery>({ query: TODOS })
      const todo = { __typename: 'Todo', id: (++counter).toString(), text, state: TaskState.IDLE }
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

      prev.todos.splice(idx, 1)
      cache.writeQuery({ query: TODOS, data: { todos: prev.todos } })

      return true
    },
    editTodo: (_, { id, text, state }: { id: string; text: string; state: TaskState }, { cache }) => {
      const todo = cache.readFragment<todoFragment>({ fragment: TODO_EDIT_FRAGMENT, id })
      const data = { ...todo, text, state }

      cache.writeFragment({ fragment: TODO_EDIT_FRAGMENT, id, data })

      return true
    },
  },

  Query: {
    todosByState: (_, { state }: { state: TaskState }, { cache }) => {
      const data = cache.readQuery<todosQuery>({ query: TODOS })

      if (!data || !data.todos) return []

      const todos = [...data.todos]

      if (!state) return todos
      return todos.filter((x) => x.state === state)
    },
  },
}
