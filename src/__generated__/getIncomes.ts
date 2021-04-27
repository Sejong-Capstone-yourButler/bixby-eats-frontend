/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetIncomesInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: getIncomes
// ====================================================

export interface getIncomes_getIncomes_incomes {
  __typename: "Income";
  id: number;
  createdAtString: string;
  income: number | null;
}

export interface getIncomes_getIncomes {
  __typename: "GetIncomesOutput";
  ok: boolean;
  error: string | null;
  incomes: getIncomes_getIncomes_incomes[] | null;
}

export interface getIncomes {
  getIncomes: getIncomes_getIncomes;
}

export interface getIncomesVariables {
  input: GetIncomesInput;
}
