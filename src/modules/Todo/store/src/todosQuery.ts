/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: todosQuery
// ====================================================

export interface todosQuery_todos {
  __typename: "Todo";
  id: string;
  text: string;
  done: boolean;
}

export interface todosQuery {
  todos: todosQuery_todos[];
}
