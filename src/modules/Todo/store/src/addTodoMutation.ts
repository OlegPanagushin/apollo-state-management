/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TaskState } from "./../../../../globalTypes";

// ====================================================
// GraphQL mutation operation: addTodoMutation
// ====================================================

export interface addTodoMutation_addTodo {
  __typename: "Todo";
  id: string;
  text: string;
  state: TaskState;
}

export interface addTodoMutation {
  addTodo: addTodoMutation_addTodo | null;
}

export interface addTodoMutationVariables {
  text: string;
}
