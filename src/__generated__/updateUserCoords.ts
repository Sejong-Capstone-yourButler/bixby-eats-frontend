/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateUserCoordsInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: updateUserCoords
// ====================================================

export interface updateUserCoords_updateUserCoords {
  __typename: "UpdateUserCoordsOutput";
  ok: boolean;
  error: string | null;
  lat: number;
  lng: number;
}

export interface updateUserCoords {
  updateUserCoords: updateUserCoords_updateUserCoords;
}

export interface updateUserCoordsVariables {
  input: UpdateUserCoordsInput;
}
