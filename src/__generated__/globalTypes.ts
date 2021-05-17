/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum OrderStatus {
  Cooked = "Cooked",
  Cooking = "Cooking",
  Delivered = "Delivered",
  Pending = "Pending",
  PickedUp = "PickedUp",
}

export enum UserRole {
  Client = "Client",
  Delivery = "Delivery",
  Owner = "Owner",
}

export interface CategoryInput {
  page?: number | null;
  slug: string;
}

export interface CategoryInputType {
  name: string;
  coverImg?: string | null;
  slug: string;
  restaurants?: RestaurantInputType[] | null;
}

export interface CreateAccountInput {
  email: string;
  password: string;
  role: UserRole;
}

export interface CreateDishIngredientInput {
  name: string;
  ingredientCount: number;
}

export interface CreateDishInput {
  name: string;
  price: number;
  description: string;
  options?: DishOptionInputType[] | null;
  restaurantId: number;
  ingredients: CreateDishIngredientInput[];
}

export interface CreateOrderInput {
  restaurantId: number;
  items: CreateOrderItemInput[];
}

export interface CreateOrderItemInput {
  dishId: number;
  options?: OrderItemOptionInputType[] | null;
}

export interface CreateRestaurantInput {
  name: string;
  coverImg: string;
  address: string;
  categoryName: string;
}

export interface DeleteDishInput {
  dishId: number;
}

export interface DishChoiceInputType {
  name: string;
  extra?: number | null;
}

export interface DishInputType {
  name: string;
  price: number;
  photo?: string | null;
  description: string;
  restaurant: RestaurantInputType;
  options?: DishOptionInputType[] | null;
  ingredients: IngredientInputType[];
}

export interface DishOptionInputType {
  name: string;
  choices?: DishChoiceInputType[] | null;
  extra: number;
}

export interface EditDishInput {
  name?: string | null;
  price?: number | null;
  description?: string | null;
  options?: DishOptionInputType[] | null;
  ingredients?: IngredientInputType[] | null;
  dishId: number;
  restaurantId: number;
}

export interface EditOrderInput {
  id: number;
  status: OrderStatus;
}

export interface EditProfileInput {
  email?: string | null;
  password?: string | null;
}

export interface EditStockInput {
  name?: string | null;
  count?: number | null;
  price?: number | null;
  description?: string | null;
  stockId: number;
}

export interface GetDishInput {
  dishId: number;
}

export interface GetIncomesInput {
  restaurantId: number;
}

export interface GetOrderInput {
  id: number;
}

export interface GetStocksInput {
  id: number;
}

export interface IncomeInputType {
  createdAtString: string;
  income?: number | null;
  restaurant?: RestaurantInputType | null;
}

export interface IngredientInputType {
  stock: StockInputType;
  count: number;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface MyRestaurantInput {
  id: number;
}

export interface OrderInputType {
  createdAtString: string;
  customer?: UserInputType | null;
  driver?: UserInputType | null;
  restaurant?: RestaurantInputType | null;
  items: OrderItemInputType[];
  total?: number | null;
  status: OrderStatus;
}

export interface OrderItemInputType {
  dish: DishInputType;
  options?: OrderItemOptionInputType[] | null;
}

export interface OrderItemOptionInputType {
  name: string;
  choice?: string | null;
}

export interface OrderUpdatesInput {
  id: number;
}

export interface PaymentInputType {
  transactionId: string;
  user: UserInputType;
  restaurant: RestaurantInputType;
  restaurantId: number;
}

export interface RestaurantInput {
  restaurantId: number;
}

export interface RestaurantInputType {
  name: string;
  coverImg: string;
  address: string;
  category?: CategoryInputType | null;
  owner: UserInputType;
  orders: OrderInputType[];
  menu: DishInputType[];
  stock: StockInputType[];
  incomes: IncomeInputType[];
  isPromoted: boolean;
  promotedUntil?: any | null;
}

export interface RestaurantsInput {
  page?: number | null;
}

export interface SearchRestaurantInput {
  page?: number | null;
  query: string;
}

export interface StockInputType {
  name: string;
  count?: number | null;
  price?: number | null;
  description?: string | null;
  restaurant?: RestaurantInputType | null;
  ingredients?: IngredientInputType[] | null;
}

export interface TakeOrderInput {
  id: number;
}

export interface UserInputType {
  email: string;
  password: string;
  role: UserRole;
  verified: boolean;
  restaurants: RestaurantInputType[];
  orders: OrderInputType[];
  payments: PaymentInputType[];
  rides: OrderInputType[];
}

export interface VerifyEmailInput {
  code: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
