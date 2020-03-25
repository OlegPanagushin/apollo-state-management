/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TaskState } from "./../../../../globalTypes";

// ====================================================
// GraphQL mutation operation: editTodoMutation
// ====================================================

export interface editTodoMutation {
  editTodo: boolean | null;
}

export interface editTodoMutationVariables {
  id: string;
  text?: string | null;
  state?: TaskState | null;
}
