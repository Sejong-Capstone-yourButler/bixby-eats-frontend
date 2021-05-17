import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Helmet } from "react-helmet-async";
import { useHistory, useParams } from "react-router";
import { DishForm } from "../../components/dishForm";
import { getDish, getDishVariables } from "../../__generated__/getDish";
import { DISH_FRAGMENT } from "../../fragments";

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
    <div className="container flex flex-col items-center my-32">
      <Helmet>
        <title>
          {data?.getDish.dish?.name || "Loading..."} 수정 | Bixby Eats
        </title>
      </Helmet>

      {!data?.getDish.dish ? (
        <h4 className="text-xl mb-5">Please upload a dish!</h4>
      ) : (
        <DishForm
          id={data?.getDish?.dish?.id + ""}
          name={data?.getDish?.dish?.name}
          price={data?.getDish?.dish?.price}
          description={data?.getDish?.dish?.description}
          options={data?.getDish?.dish?.options}
          ingredients={data?.getDish?.dish?.ingredients}
        />
      )}
      <button onClick={back} className="btn w-32">
        Back
      </button>
    </div>
  );
};
