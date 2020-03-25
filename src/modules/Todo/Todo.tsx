import React, { ChangeEventHandler, FC, MouseEventHandler, useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import {
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  Paper,
  Tab,
  Tabs,
  TextField,
  Toolbar,
  Typography,
} from '@material-ui/core'
import { Add, PlaylistAdd } from '@material-ui/icons'

import { TodoList } from './components/TodoList'
import { ADD_TODO, addTodoMutation, addTodoMutationVariables } from './store/queries'
import { useStyles } from './Todo.styles'
import { TaskState } from '../../globalTypes'

type tabChangeEventHandler = (event: React.ChangeEvent<{}>, value: any) => void

const getTaskStateFromTabIdx = (tabIdx: number): TaskState | undefined => {
  switch (tabIdx) {
    case 1:
      return TaskState.IDLE
    case 2:
      return TaskState.DONE
    default:
      return undefined
  }
}

export const Todo: FC = () => {
  const [mutationAdd] = useMutation<addTodoMutation, addTodoMutationVariables>(ADD_TODO)
  const classes = useStyles()
  const [tab, setTab] = useState(0)
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

  const handleChange: tabChangeEventHandler = (_, newValue) => {
    setTab(newValue)
  }

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <PlaylistAdd className={classes.icon} fontSize="large" />
          <Typography variant="h6">Tasks</Typography>
        </Toolbar>
      </AppBar>

      <Paper className={classes.todos}>
        <Tabs
          value={tab}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="todo list"
        >
          <Tab label="All" />
          <Tab label="Pending" />
          <Tab label="Done" />
        </Tabs>
        <TodoList taskState={getTaskStateFromTabIdx(tab)} />
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
