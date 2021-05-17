import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Helmet } from "react-helmet-async";
import { useHistory, useParams } from "react-router";
import { DishForm } from "../../components/dishForm";
import { getDish, getDishVariables } from "../../__generated__/getDish";
import { DISH_FRAGMENT } from "../../fragments";
import { Link } from "react-router-dom";

interface IParams {
  restaurantId: string;
  dishId: string;
}

const GET_DISH = gql`
  query getDish($input: GetDishInput!) {
    getDish(input: $input) {
      ok
      error
      dish {
        ...DishParts
      }
    }
  }
  ${DISH_FRAGMENT}
`;

export const EditDish = () => {
  const { restaurantId, dishId } = useParams<IParams>();
  const history = useHistory();
  const { data } = useQuery<getDish, getDishVariables>(GET_DISH, {
    variables: {
      input: {
        dishId: +dishId,
      },
    },
  });
  const back = () => {
    history.push(`/restaurants/${restaurantId}`);
  };
  return (
    <div className="grid grid-cols-4 my-32">
      <Helmet>
        <title>
          {data?.getDish.dish?.name || "Loading..."} 수정 | Bixby Eats
        </title>
      </Helmet>

      <div></div>
      {!data?.getDish.dish ? (
        <h4 className="text-xl mb-5">Please upload a dish!</h4>
      ) : (
        <div className="col-span-2 flex flex-col items-center">
          <DishForm
            id={data?.getDish?.dish?.id + ""}
            name={data?.getDish?.dish?.name}
            price={data?.getDish?.dish?.price}
            description={data?.getDish?.dish?.description}
            options={data?.getDish?.dish?.options}
            ingredients={data?.getDish?.dish?.ingredients}
          />
          <button onClick={back} className="btn w-32">
            뒤로가기
          </button>
        </div>
      )}
      {!data?.getDish.dish ? (
        <div></div>
      ) : (
        <div className="flex flex-col">
          <Link
            to={`/restaurants/${restaurantId}/dish/${dishId}/add-dishOption`}
            className="mb-4 w-44 bg-gray-800 myRestaurantButton"
          >
            옵션 추가 &rarr;
          </Link>
          <Link
            to={`/restaurants/${restaurantId}/dish/${dishId}/add-dishIngredient`}
            className="w-44 bg-gray-800 myRestaurantButton"
          >
            재료 추가 &rarr;
          </Link>
        </div>
      )}
    </div>
  );
};
