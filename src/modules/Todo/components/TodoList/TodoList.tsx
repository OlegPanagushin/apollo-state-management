import React, { FC } from 'react'
import { useMutation, useQuery } from '@apollo/react-hooks'
import {
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core'
import { Delete } from '@material-ui/icons'

import {
  TODOS_BY_STATE,
  todosByStateQuery,
  todosByStateQueryVariables,
  REMOVE_TODO,
  removeTodoMutation,
  removeTodoMutationVariables,
  EDIT_TODO,
  editTodoMutation,
  editTodoMutationVariables,
} from '../../store/queries'
import { TaskState } from '../../../../globalTypes'

const toggleState = (state: TaskState): TaskState => {
  switch (state) {
    case TaskState.DONE:
      return TaskState.IDLE
    case TaskState.IDLE:
      return TaskState.DONE
    default:
      return TaskState.IN_PROGRESS
  }
}

type TOuterProps = {
  taskState?: TaskState
}

export const TodoList: FC<TOuterProps> = ({ taskState }) => {
  const [mutationRemove] = useMutation<removeTodoMutation, removeTodoMutationVariables>(REMOVE_TODO)
  const [mutationEdit] = useMutation<editTodoMutation, editTodoMutationVariables>(EDIT_TODO)
  const { data } = useQuery<todosByStateQuery, todosByStateQueryVariables>(TODOS_BY_STATE, {
    variables: { state: taskState },
  })

  return (
    <List>
      {data?.todosByState.map(({ id, state, text }) => {
        return (
          <ListItem
            button
            dense
            key={id}
            onClick={() =>
              mutationEdit({
                variables: { id, state: toggleState(state), text: text },
                refetchQueries: [{ query: TODOS_BY_STATE, variables: { state: taskState } }],
              })
            }
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={state === TaskState.DONE}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': id }}
              />
            </ListItemIcon>
            <ListItemText id={id} primary={text} />
            <ListItemSecondaryAction>
              <IconButton aria-label="comments" edge="end" onClick={() => mutationRemove({ variables: { id } })}>
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        )
      })}
    </List>
  )
}
