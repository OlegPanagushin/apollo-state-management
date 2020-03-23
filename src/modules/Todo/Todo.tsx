import React, { ChangeEventHandler, FC, MouseEventHandler, useState } from 'react'
import { useMutation, useQuery } from '@apollo/react-hooks'
import {
  AppBar,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from '@material-ui/core'
import { Add, Delete, PlaylistAdd } from '@material-ui/icons'
import { motion, AnimatePresence } from 'framer-motion'

import { useStyles } from './Todo.styles'
import {
  TODOS,
  todosQuery,
  ADD_TODO,
  addTodoMutation,
  addTodoMutationVariables,
  REMOVE_TODO,
  removeTodoMutation,
  removeTodoMutationVariables,
  TOGGLE_TODO,
  toggleTodoMutation,
  toggleTodoMutationVariables,
} from './store/queries'

export const Todo: FC = () => {
  const [mutationAdd] = useMutation<addTodoMutation, addTodoMutationVariables>(ADD_TODO)
  const [mutationRemove] = useMutation<removeTodoMutation, removeTodoMutationVariables>(REMOVE_TODO)
  const [mutationToggle] = useMutation<toggleTodoMutation, toggleTodoMutationVariables>(TOGGLE_TODO)
  const { data } = useQuery<todosQuery>(TODOS)
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [task, setTask] = useState('')
  const onAddClick = () => {
    setOpen(true)
  }
  const onCancelClick: MouseEventHandler = () => {
    setOpen(false)
    setTask('')
  }
  const onCreateClick: MouseEventHandler = () => {
    mutationAdd({ variables: { text: task } })
    setOpen(false)
    setTask('')
  }
  const onInputChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = (e) => {
    setTask(e.target.value)
  }

  const animate = { opacity: 1 }
  const initial = { opacity: 0 }
  const exit = { opacity: 0 }

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <PlaylistAdd className={classes.icon} fontSize="large" />
          <Typography variant="h6">Tasks</Typography>
        </Toolbar>
      </AppBar>

      <Paper className={classes.todos}>
        <List>
          <AnimatePresence>
            {data?.todos.map(({ id, done, text }) => {
              return (
                <ListItem
                  animate={animate}
                  button
                  component={motion.div}
                  dense
                  exit={exit}
                  initial={initial}
                  key={id}
                  onClick={() => mutationToggle({ variables: { id, done: !done } })}
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={done}
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
          </AnimatePresence>
        </List>
      </Paper>

      <Fab className={classes.addButton} color="primary" onClick={onAddClick} variant="round">
        <Add />
      </Fab>

      <Dialog aria-labelledby="form-dialog-title" fullWidth maxWidth="sm" open={open}>
        <DialogTitle id="form-dialog-title">Create Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            label="Task"
            margin="dense"
            onChange={onInputChange}
            type="text"
            value={task}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancelClick} color="primary">
            Cancel
          </Button>
          <Button onClick={onCreateClick} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
