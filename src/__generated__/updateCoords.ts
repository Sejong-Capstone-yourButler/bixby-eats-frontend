/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateCoordsInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: updateCoords
// ====================================================

export interface updateCoords_updateCoords {
  __typename: "UpdateCoordsOutput";
  ok: boolean;
  error: string | null;
  lat: number;
  lng: number;
}

export interface updateCoords {
  updateCoords: updateCoords_updateCoords;
}

export interface updateCoordsVariables {
  input: UpdateCoordsInput;
}
