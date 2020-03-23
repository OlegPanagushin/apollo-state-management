import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'

import {
  resolvers as todoResolvers,
  typeDefs as todoTypeDefs,
  initialState as todoInitialState,
} from '../../modules/Todo/store'

const cache = new InMemoryCache({
  dataIdFromObject: (object) => object.id,
})
const client = new ApolloClient({
  cache,
  resolvers: [todoResolvers],
  typeDefs: [todoTypeDefs],
})

cache.writeData({
  data: {
    ...todoInitialState,
  },
})

export { client }
