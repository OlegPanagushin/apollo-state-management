import React, { FC, useCallback, useEffect } from 'react'
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
  todosByStateQuery_todosByState,
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
  const { data, refetch } = useQuery<todosByStateQuery, todosByStateQueryVariables>(TODOS_BY_STATE, {
    variables: { state: taskState },
  })

  useEffect(() => {
    refetch()
  }, [refetch, taskState])

  const onTodoClickHandler = useCallback(
    ({ id, text, state }: todosByStateQuery_todosByState) => {
      mutationEdit({
        variables: { id, state: toggleState(state), text },
        refetchQueries: [{ query: TODOS_BY_STATE, variables: { state: taskState } }],
      })
    },
    [taskState, mutationEdit],
  )

  return (
    <List>
      {data?.todosByState.map((todo) => {
        return (
          <ListItem button dense key={todo.id} onClick={() => onTodoClickHandler(todo)}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={todo.state === TaskState.DONE}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': todo.id }}
              />
            </ListItemIcon>
            <ListItemText id={todo.id} primary={todo.text} />
            <ListItemSecondaryAction>
              <IconButton
                aria-label="comments"
                edge="end"
                onClick={() => mutationRemove({ variables: { id: todo.id } })}
              >
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        )
      })}
    </List>
  )
}
