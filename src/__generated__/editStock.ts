/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditStockInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: editStock
// ====================================================

export interface editStock_editStock {
  __typename: "EditStockOutput";
  error: string | null;
  ok: boolean;
}

export interface editStock {
  editStock: editStock_editStock;
}

export interface editStockVariables {
  input: EditStockInput;
}
