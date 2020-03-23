import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import { CssBaseline, ThemeProvider } from '@material-ui/core'

import { client } from './lib/services/apollo'
import { theme } from './lib/services/theme'
import { Todo } from './modules/Todo'

ReactDOM.render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Todo />
    </ThemeProvider>
  </ApolloProvider>,
  document.getElementById('root'),
)
