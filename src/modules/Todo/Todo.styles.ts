import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(1),
  },

  addButton: {
    bottom: theme.spacing(2),
    position: 'fixed',
    right: theme.spacing(2),
  },

  todos: {
    margin: `${theme.spacing(4)}px auto ${theme.spacing(10)}px`,
    maxWidth: 500,
  },
}))
