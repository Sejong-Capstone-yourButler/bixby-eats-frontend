/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetStocksInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: getStocks
// ====================================================

export interface getStocks_getStocks_stocks {
  __typename: "Stock";
  id: number;
  name: string;
  count: number;
  description: string | null;
}

export interface getStocks_getStocks {
  __typename: "GetStocksOutput";
  error: string | null;
  ok: boolean;
  stocks: getStocks_getStocks_stocks[];
}

export interface getStocks {
  getStocks: getStocks_getStocks;
}

export interface getStocksVariables {
  input: GetStocksInput;
}
