import React from "react";
import { useQuery } from "@apollo/client";
import { Helmet } from "react-helmet-async";
import { useHistory, useParams } from "react-router";
import { DishForm } from "../../components/dishForm";
import {
  myRestaurant,
  myRestaurantVariables,
} from "../../__generated__/myRestaurant";
import { MY_RESTAURANT_QUERY } from "./my-restaurant";

interface IParams {
  restaurantId: string;
}

export const EditDish = () => {
  const { restaurantId } = useParams<IParams>();
  const history = useHistory();
  const { data } = useQuery<myRestaurant, myRestaurantVariables>(
    MY_RESTAURANT_QUERY,
    {
      variables: {
        input: {
          id: +restaurantId,
        },
      },
    }
  );
  const back = () => {
    history.push(`/restaurants/${restaurantId}`);
  };
  return (
    <div className="container flex flex-col items-center my-32">
      <Helmet>
        <title>Edit Dish | Bixby Eats</title>
      </Helmet>
      <h4 className="font-semibold text-2xl mb-3">Edit Dish</h4>
      <div className="grid grid-cols-4 max-w-screen-lg gap-3 my-5 w-full">
        <div className="text-center text-lg font-bold">Name</div>
        <div className="text-center text-lg font-bold">Price</div>
        <div className="text-center text-lg font-bold">Description</div>
        <div></div>
      </div>

      {data?.myRestaurant.restaurant?.menu.length === 0 ? (
        <h4 className="text-xl mb-5">Please upload a dish!</h4>
      ) : (
        <div>
          {data?.myRestaurant.restaurant?.menu.map((dish) => (
            <DishForm
              key={dish.id}
              id={dish.id + ""}
              name={dish.name}
              price={dish.price}
              description={dish.description}
            />
          ))}
        </div>
      )}
      <button onClick={back} className="btn w-32">
        Back
      </button>
    </div>
  );
};
