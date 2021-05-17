/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: DishParts
// ====================================================

export interface DishParts_options_choices {
  __typename: "DishChoice";
  name: string;
  extra: number | null;
}

export interface DishParts_options {
  __typename: "DishOption";
  name: string;
  extra: number;
  choices: DishParts_options_choices[] | null;
}

export interface DishParts_ingredients_stock {
  __typename: "Stock";
  id: number;
  name: string;
}

export interface DishParts_ingredients {
  __typename: "Ingredient";
  id: number;
  stock: DishParts_ingredients_stock;
  count: number;
}

export interface DishParts {
  __typename: "Dish";
  id: number;
  name: string;
  price: number;
  photo: string | null;
  description: string;
  options: DishParts_options[] | null;
  ingredients: DishParts_ingredients[];
}
