import { gql, useMutation } from "@apollo/client";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { MY_RESTAURANT_QUERY } from "../pages/owner/my-restaurant";
import { deleteDish, deleteDishVariables } from "../__generated__/deleteDish";
import { UserRole } from "../__generated__/globalTypes";
import { restaurant_restaurant_restaurant_menu_options } from "../__generated__/restaurant";

interface IDishProps {
  id?: number;
  description: string;
  name: string;
  price: number;
  isCustomer?: boolean;
  orderStarted?: boolean;
  isSelected?: boolean;
  options?: restaurant_restaurant_restaurant_menu_options[] | null;
  addItemToOrder?: (dishId: number, count: number) => void;
  removeFromOrder?: (dishId: number) => void;
  userRole?: UserRole | undefined;
}

interface IParams {
  id: string;
}

export const DELETE_DISH_MUTATION = gql`
  mutation deleteDish($input: DeleteDishInput!) {
    deleteDish(input: $input) {
      error
      ok
    }
  }
`;

export const Dish: React.FC<IDishProps> = ({
  id = 0,
  description,
  name,
  price,
  isCustomer = false,
  orderStarted = false,
  options,
  isSelected,
  addItemToOrder,
  removeFromOrder,
  userRole,
  children: dishOptions,
}) => {
  const onClick = () => {
    if (orderStarted) {
      if (!isSelected && addItemToOrder) {
        return addItemToOrder(id, 1);
      }
      if (isSelected && removeFromOrder) {
        return removeFromOrder(id);
      }
    }
  };
  const { id: restaurantId } = useParams<IParams>();
  const [deleteDishMutation, { loading: deleteDishLoading }] = useMutation<
    deleteDish,
    deleteDishVariables
  >(DELETE_DISH_MUTATION, {
    refetchQueries: [
      {
        query: MY_RESTAURANT_QUERY,
        variables: {
          input: {
            id: +restaurantId,
          },
        },
      },
    ],
  });

  const deleteBtn = () => {
    deleteDishMutation({
      variables: {
        input: {
          dishId: +id,
        },
      },
    });
  };
  return (
    <div
      className={` px-8 py-4 border cursor-pointer  transition-all ${
        isSelected ? "border-gray-800" : " hover:border-gray-800"
      }`}
    >
      <div className="mb-5">
        <h3 className="text-lg font-medium flex items-center ">
          {name}{" "}
          {orderStarted && (
            <button
              className={`ml-3 py-1 px-3 focus:outline-none text-sm  text-white ${
                isSelected ? "bg-red-500" : " bg-lime-600"
              }`}
              onClick={onClick}
            >
              {isSelected ? "Remove" : "Add"}
            </button>
          )}
          {userRole && userRole === "Owner" && (
            <>
              <Link
                to={`/restaurants/${restaurantId}/dish/${id}/edit-dish`}
                className={`ml-3 py-1 px-3 focus:outline-none text-sm bg-lime-600 text-white`}
              >
                수정
              </Link>
              <button
                className={`ml-3 py-1 px-3 focus:outline-none text-sm bg-red-500 text-white`}
                onClick={deleteBtn}
              >
                {deleteDishLoading ? "Loading..." : "삭제"}
              </button>
            </>
          )}
        </h3>
        <h4 className="font-medium">{description}</h4>
      </div>
      <span>&#8361;{price}</span>
      {isCustomer && options && options?.length !== 0 && (
        <div>
          <h5 className="mt-8 mb-3 font-medium">Dish Options:</h5>
          <div className="grid gap-2 justify-start">{dishOptions}</div>
        </div>
      )}
    </div>
  );
};
