import { ApolloCache } from 'apollo-cache'
import { Resolvers } from 'apollo-client'

type TResolverFn = (parent: any, args: any, { cache }: { cache: ApolloCache<any> }) => any
type TResolverMap = {
  [field: string]: TResolverFn
}

export type TAppResolvers = Resolvers & {
  Mutation: TResolverMap
  Query: TResolverMap
}
