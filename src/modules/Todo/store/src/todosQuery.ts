/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TaskState } from "./../../../../globalTypes";

// ====================================================
// GraphQL query operation: todosQuery
// ====================================================

export interface todosQuery_todos {
  __typename: "Todo";
  id: string;
  text: string;
  state: TaskState;
}

export interface todosQuery {
  todos: todosQuery_todos[];
}
