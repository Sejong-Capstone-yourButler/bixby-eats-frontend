import { gql } from "@apollo/client";

export const RESTAURANT_FRAGMENT = gql`
  fragment RestaurantParts on Restaurant {
    id
    name
    coverImg
    lat
    lng
    category {
      name
    }
    address
    isPromoted
  }
`;

export const CATEGORY_FRAGMENT = gql`
  fragment CategoryParts on Category {
    id
    name
    coverImg
    slug
    restaurantCount
  }
`;

export const DISH_FRAGMENT = gql`
  fragment DishParts on Dish {
    id
    name
    price
    photo
    description
    options {
      name
      extra
      choices {
        name
        extra
      }
    }
    ingredients {
      id
      stock {
        id
        name
      }
      count
    }
  }
`;

export const ORDERS_FRAGMENT = gql`
  fragment OrderParts on Order {
    id
    createdAt
    total
    createdAtString
  }
`;

export const FULL_ORDER_FRAGMENT = gql`
  fragment FullOrderParts on Order {
    id
    status
    total
    driver {
      email
      lat
      lng
    }
    customer {
      email
      lat
      lng
    }
    restaurant {
      name
      lat
      lng
    }
  }
`;
export const INCOME_FRAGMENT = gql`
  fragment IncomeParts on Income {
    id
    createdAtString
    income
  }
`;
