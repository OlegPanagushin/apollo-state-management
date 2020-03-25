import { TaskState } from '../../../globalTypes'

export const initialState = {
  todos: [
    {
      __typename: 'Todo',
      id: '1',
      text: 'Create boilerplate',
      state: TaskState.IDLE,
    },
    {
      __typename: 'Todo',
      id: '2',
      text: '???',
      state: TaskState.DONE,
    },
    {
      __typename: 'Todo',
      id: '3',
      text: 'Profit',
      state: TaskState.IDLE,
    },
  ],
}
