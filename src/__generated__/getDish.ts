/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetDishInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: getDish
// ====================================================

export interface getDish_getDish_dish_options_choices {
  __typename: "DishChoice";
  name: string;
  extra: number | null;
}

export interface getDish_getDish_dish_options {
  __typename: "DishOption";
  name: string;
  extra: number;
  choices: getDish_getDish_dish_options_choices[] | null;
}

export interface getDish_getDish_dish_ingredients_stock {
  __typename: "Stock";
  id: number;
  name: string;
}

export interface getDish_getDish_dish_ingredients {
  __typename: "Ingredient";
  id: number;
  stock: getDish_getDish_dish_ingredients_stock;
  count: number;
}

export interface getDish_getDish_dish {
  __typename: "Dish";
  id: number;
  name: string;
  price: number;
  photo: string | null;
  description: string;
  options: getDish_getDish_dish_options[] | null;
  ingredients: getDish_getDish_dish_ingredients[];
}

export interface getDish_getDish {
  __typename: "GetDishOutput";
  ok: boolean;
  error: string | null;
  dish: getDish_getDish_dish | null;
}

export interface getDish {
  getDish: getDish_getDish;
}

export interface getDishVariables {
  input: GetDishInput;
}
