/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TaskState } from "./../../../../globalTypes";

// ====================================================
// GraphQL query operation: todosByStateQuery
// ====================================================

export interface todosByStateQuery_todosByState {
  __typename: "Todo";
  id: string;
  text: string;
  state: TaskState;
}

export interface todosByStateQuery {
  todosByState: todosByStateQuery_todosByState[];
}

export interface todosByStateQueryVariables {
  state?: TaskState | null;
}
