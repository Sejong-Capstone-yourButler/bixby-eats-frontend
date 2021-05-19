/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MyRestaurantInput, UserRole } from "./globalTypes";

// ====================================================
// GraphQL query operation: myRestaurant
// ====================================================

export interface myRestaurant_myRestaurant_restaurant_category {
  __typename: "Category";
  name: string;
}

export interface myRestaurant_myRestaurant_restaurant_menu_options_choices {
  __typename: "DishChoice";
  name: string;
  extra: number | null;
}

export interface myRestaurant_myRestaurant_restaurant_menu_options {
  __typename: "DishOption";
  name: string;
  extra: number;
  choices: myRestaurant_myRestaurant_restaurant_menu_options_choices[] | null;
}

export interface myRestaurant_myRestaurant_restaurant_menu_ingredients_stock {
  __typename: "Stock";
  id: number;
  name: string;
}

export interface myRestaurant_myRestaurant_restaurant_menu_ingredients {
  __typename: "Ingredient";
  id: number;
  stock: myRestaurant_myRestaurant_restaurant_menu_ingredients_stock;
  count: number;
}

export interface myRestaurant_myRestaurant_restaurant_menu {
  __typename: "Dish";
  id: number;
  name: string;
  price: number;
  photo: string | null;
  description: string;
  options: myRestaurant_myRestaurant_restaurant_menu_options[] | null;
  ingredients: myRestaurant_myRestaurant_restaurant_menu_ingredients[];
}

export interface myRestaurant_myRestaurant_restaurant_orders {
  __typename: "Order";
  id: number;
  createdAt: any;
  total: number | null;
  createdAtString: string;
}

export interface myRestaurant_myRestaurant_restaurant_owner {
  __typename: "User";
  id: number;
  role: UserRole;
}

export interface myRestaurant_myRestaurant_restaurant {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImg: string;
  lat: number;
  lng: number;
  category: myRestaurant_myRestaurant_restaurant_category | null;
  address: string;
  isPromoted: boolean;
  menu: myRestaurant_myRestaurant_restaurant_menu[];
  orders: myRestaurant_myRestaurant_restaurant_orders[];
  owner: myRestaurant_myRestaurant_restaurant_owner;
}

export interface myRestaurant_myRestaurant {
  __typename: "MyRestaurantOutput";
  ok: boolean;
  error: string | null;
  restaurant: myRestaurant_myRestaurant_restaurant | null;
}

export interface myRestaurant {
  myRestaurant: myRestaurant_myRestaurant;
}

export interface myRestaurantVariables {
  input: MyRestaurantInput;
}
