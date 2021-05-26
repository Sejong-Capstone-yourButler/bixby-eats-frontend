import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "../../components/button";
import {
  createDish,
  createDishVariables,
} from "../../__generated__/createDish";
import { MY_RESTAURANT_QUERY } from "./my-restaurant";

const CREATE_DISH_MUTATION = gql`
  mutation createDish($input: CreateDishInput!) {
    createDish(input: $input) {
      ok
      error
    }
  }
`;

interface IParams {
  restaurantId: string;
}

interface IForm {
  name: string;
  price: string;
  description: string;
  [key: string]: string;
}

export const AddDish = () => {
  const { restaurantId } = useParams<IParams>();
  const history = useHistory();
  const [createDishMutation, { loading }] = useMutation<
    createDish,
    createDishVariables
  >(CREATE_DISH_MUTATION, {
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
  const { register, handleSubmit, formState, getValues, setValue } =
    useForm<IForm>({
      mode: "onChange",
    });
  const onSubmit = () => {
    const { name, price, description, ...rest } = getValues();
    const ingredientsObjects = ingredientsNumber.map((theId) => ({
      name: rest[`${theId}-ingredientName`],
      ingredientCount: +rest[`${theId}-ingredientCount`],
    }));
    const optionObjects = optionsNumber.map((theId) => ({
      name: rest[`${theId}-optionName`],
      extra: +rest[`${theId}-optionExtra`],
    }));
    createDishMutation({
      variables: {
        input: {
          name,
          price: +price,
          description,
          restaurantId: +restaurantId,
          options: optionObjects,
          ingredients: ingredientsObjects,
        },
      },
    });
    history.push(`stocks`);
  };
  const [optionsNumber, setOptionsNumber] = useState<number[]>([]);
  const [ingredientsNumber, setIngredientsNumber] = useState<number[]>([]);
  const onAddOptionClick = () => {
    setOptionsNumber((current) => [Date.now(), ...current]);
  };
  const onAddIngredientClick = () => {
    setIngredientsNumber((current) => [Date.now(), ...current]);
  };
  const onOptionDeleteClick = (idToDelete: number) => {
    setOptionsNumber((current) => current.filter((id) => id !== idToDelete));
    setValue(`${idToDelete}-optionName`, "");
    setValue(`${idToDelete}-optionExtra`, "");
  };
  const onIngredientDeleteClick = (idToDelete: number) => {
    setIngredientsNumber((current) =>
      current.filter((id) => id !== idToDelete)
    );
    setValue(`${idToDelete}-ingredientName`, "");
    setValue(`${idToDelete}-ingredientCount`, "");
  };
  return (
    <div className="container flex flex-col items-center mt-52">
      <Helmet>
        <title>메뉴 추가 | 쿠게더</title>
      </Helmet>
      <h4 className="font-semibold text-2xl mb-3">메뉴 추가</h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid max-w-screen-sm gap-3 mt-5 w-full mb-5"
      >
        <input
          className="input"
          type="text"
          name="name"
          placeholder="메뉴 이름"
          ref={register({ required: "Name is required." })}
        />
        <input
          className="input"
          type="number"
          name="price"
          min={0}
          placeholder="가격"
          ref={register({ required: "Price is required." })}
        />
        <input
          className="input"
          type="text"
          name="description"
          placeholder="설명"
          ref={register({ required: "Description is required." })}
        />
        <div className="my-10">
          <h4 className="font-medium  mb-3 text-lg">메뉴 옵션</h4>
          <span
            onClick={onAddOptionClick}
            className="cursor-pointer text-white bg-gray-900 py-1 px-2 mt-5 bg-"
          >
            메뉴 옵션 추가
          </span>
          {optionsNumber.length !== 0 &&
            optionsNumber.map((id) => (
              <div key={id} className="grid grid-cols-3 mt-5">
                <input
                  ref={register}
                  name={`${id}-optionName`}
                  className="py-2 px-4 focus:outline-none mr-3 focus:border-gray-600 border-2"
                  type="text"
                  placeholder="옵션 이름"
                />
                <input
                  ref={register}
                  name={`${id}-optionExtra`}
                  className="py-2 px-4 focus:outline-none focus:border-gray-600 border-2"
                  type="number"
                  min={0}
                  placeholder="옵션 요금"
                />
                <span
                  className="cursor-pointer text-white bg-red-500 ml-3 py-3 px-4 mt-5 bg-"
                  onClick={() => onOptionDeleteClick(id)}
                >
                  옵션 삭제
                </span>
              </div>
            ))}
        </div>
        <div className="my-10">
          <h4 className="font-medium mb-3 text-lg">재료</h4>
          <span
            onClick={onAddIngredientClick}
            className="cursor-pointer text-white bg-gray-900 py-1 px-2 mt-5 bg-"
          >
            메뉴에 사용된 재료 추가
          </span>
          {ingredientsNumber.length !== 0 &&
            ingredientsNumber.map((id) => (
              <div key={id} className="grid grid-cols-3 mt-5">
                <input
                  ref={register}
                  name={`${id}-ingredientName`}
                  className="py-2 px-4 focus:outline-none mr-3 focus:border-gray-600 border-2"
                  type="text"
                  placeholder="재료 이름"
                />
                <input
                  ref={register}
                  name={`${id}-ingredientCount`}
                  className="py-2 px-4 focus:outline-none focus:border-gray-600 border-2"
                  type="number"
                  min={0}
                  placeholder="재료 개수"
                />
                <span
                  className="cursor-pointer text-white bg-red-500 ml-3 py-3 px-4 mt-5 bg-"
                  onClick={() => onIngredientDeleteClick(id)}
                >
                  재료 삭제
                </span>
              </div>
            ))}
        </div>
        <Button
          loading={loading}
          canClick={formState.isValid}
          actionText="메뉴 추가"
        />
      </form>
    </div>
  );
};
