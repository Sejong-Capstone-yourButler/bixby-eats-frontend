/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditRestaurantInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: editRestaurant
// ====================================================

export interface editRestaurant_editRestaurant {
  __typename: "EditRestaurantOutput";
  error: string | null;
  ok: boolean;
}

export interface editRestaurant {
  editRestaurant: editRestaurant_editRestaurant;
}

export interface editRestaurantVariables {
  input: EditRestaurantInput;
}
