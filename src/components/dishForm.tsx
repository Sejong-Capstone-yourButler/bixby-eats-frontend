import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "./button";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { editDish, editDishVariables } from "../__generated__/editDish";

import {
  getDish_getDish_dish_ingredients,
  getDish_getDish_dish_options,
} from "../__generated__/getDish";

interface IDishFormProps {
  id: string;
  name: string | undefined;
  price: number | undefined;
  description?: string | undefined;
  options?: getDish_getDish_dish_options[] | null;
  ingredients?: getDish_getDish_dish_ingredients[];
  restaurantId: string;
}

interface IForm {
  name: string;
  price: string;
  description: string;
  [key: string]: string;
}

const EDIT_DISH_MUTATION = gql`
  mutation editDish($input: EditDishInput!) {
    editDish(input: $input) {
      error
      ok
    }
  }
`;

export const DishForm: React.FC<IDishFormProps> = ({
  id,
  name,
  price,
  description,
  options,
  ingredients,
  restaurantId,
}) => {
  const [editDishMutation, { loading: editDishLoading }] =
    useMutation<editDish, editDishVariables>(EDIT_DISH_MUTATION);
  const { register, handleSubmit, formState, getValues, setValue } =
    useForm<IForm>({
      mode: "onChange",
    });
  const [pName, setName] = useState<string>(name ? name : "");
  const [pPrice, setPrice] = useState<number>(price ? price : 0);
  const [pDescription, setDescription] = useState<string>(
    description ? description : ""
  );
  const [optionNames, setOptionNames] = useState<string[]>(
    options!.map((option) => option!.name)
  );
  const [optionExtras, setOptionExtras] = useState<number[]>(
    options!.map((option) => option!.extra)
  );
  const [ingredientNames, setIngredientNames] = useState<string[]>(
    ingredients!.map((ingredient) => ingredient!.stock!.name)
  );
  const [ingredientCounts, setIngredientCounts] = useState<number[]>(
    ingredients!.map((ingredient) => ingredient!.count)
  );

  const onChangeName = (e: any) => {
    const {
      target: { value },
    } = e;
    setName(value);
  };
  const onChangePrice = (e: any) => {
    const {
      target: { value },
    } = e;
    setPrice(value);
  };
  const onChangeDescription = (e: any) => {
    const {
      target: { value },
    } = e;
    setDescription(value);
  };
  const onChangeOptionName = (e: any, index: number) => {
    const {
      target: { value },
    } = e;
    optionNames[index] = value;
    setOptionNames(optionNames.map((optionName) => optionName));
  };
  const onChangeOptionExtra = (e: any, index: number) => {
    const {
      target: { value },
    } = e;
    optionExtras[index] = value;
    setOptionExtras(optionExtras.map((optionExtra) => optionExtra));
  };
  const onChangeIngredientName = (e: any, index: number) => {
    const {
      target: { value },
    } = e;
    ingredientNames[index] = value;
    setIngredientNames(ingredientNames.map((ingredientName) => ingredientName));
  };
  const onChangeIngredientCount = (e: any, index: number) => {
    const {
      target: { value },
    } = e;
    ingredientCounts[index] = value;
    setIngredientCounts(
      ingredientCounts.map((ingredientCount) => ingredientCount)
    );
  };

  // ?????? ??????
  const [sOptions, setSOptions] = useState<
    getDish_getDish_dish_options[] | null
  >(options!);
  const onDeleteExistingOptionClick = (
    optionName: string,
    optionExtra: number
  ) => {
    setSOptions((current) =>
      current!.filter((option) => option.name !== optionName)
    );
    setOptionNames((current) => current!.filter((name) => name !== optionName));
    setOptionExtras((current) =>
      current!.filter((extra) => extra !== optionExtra)
    );
    setValue(`${optionName}-optionName`, "");
    setValue(`${optionName}-optionExtra`, "");
  };

  // ?????? ??????
  const [optionsNumbers, setOptionsNumbers] = useState<number[]>([]);
  const onAddOptionClick = () => {
    setOptionsNumbers((current) => [Date.now(), ...current]);
  };
  const onDeleteOptionClick = (idToDelete: number) => {
    setOptionsNumbers((current) => current.filter((id) => id !== idToDelete));
    setValue(`${idToDelete}-optionName`, "");
    setValue(`${idToDelete}-optionExtra`, "");
  };

  // ?????? ??????
  const [sIngredients, setsIngredients] = useState<
    getDish_getDish_dish_ingredients[]
  >(ingredients!);
  const onDeleteExistingIngredientClick = (
    ingredientId: number,
    ingredientName: string,
    ingredientCount: number
  ) => {
    console.log(ingredientId, ingredientName, ingredientCount);
    console.log(sIngredients);
    setsIngredients((current) =>
      current!.filter((ingredient) => ingredient.id !== ingredientId)
    );
    console.log(sIngredients);
    console.log(ingredientNames);
    setIngredientNames((current) =>
      current!.filter((name) => name !== ingredientName)
    );
    console.log(ingredientNames);
    console.log(ingredientCounts);
    setIngredientCounts((current) =>
      current!.filter((count) => count !== ingredientCount)
    );
    console.log(ingredientCounts);
    setValue(`${ingredientId}-ingredientName`, "");
    setValue(`${ingredientId}-ingredientCount`, "");
  };

  // ?????? ??????
  const [ingredientsNumbers, setIngredientsNumbers] = useState<number[]>([]);
  const onAddIngredientClick = () => {
    setIngredientsNumbers((current) => [Date.now(), ...current]);
  };
  const onDeleteIngredientClick = (idToDelete: number) => {
    setIngredientsNumbers((current) =>
      current.filter((id) => id !== idToDelete)
    );
    setValue(`${idToDelete}-ingredientName`, "");
    setValue(`${idToDelete}-ingredientCount`, "");
  };

  const onSubmit = () => {
    const { name, price, description, ...rest } = getValues();

    // ?????? ?????? ??? ??????
    // ?????? ??????
    const editedOptionObjects = sOptions?.map((option) => {
      return {
        name: rest[`${option.name}-optionName`],
        extra: +rest[`${option.name}-optionExtra`],
      };
    });

    // ?????? ??????
    const addOptionObjects = optionsNumbers.map((theId) => ({
      name: rest[`${theId}-optionName`],
      extra: +rest[`${theId}-optionExtra`],
    }));

    let optionObjects: any[] = [];
    if (editedOptionObjects) {
      optionObjects = addOptionObjects.concat(editedOptionObjects);
    }

    // ?????? ?????? ??? ??????
    // ?????? ??????
    const editedIngredientObjects = sIngredients?.map((ingredient) => ({
      stock: {
        name: rest[`${ingredient.id}-ingredientName`],
      },
      count: +rest[`${ingredient.id}-ingredientCount`],
    }));

    // ?????? ??????
    const addIngredientObjects = ingredientsNumbers.map((theId) => ({
      stock: {
        name: rest[`${theId}-ingredientName`],
      },
      count: +rest[`${theId}-ingredientCount`],
    }));

    let ingredientObjects: any[] = [];
    if (editedIngredientObjects) {
      ingredientObjects = editedIngredientObjects.concat(addIngredientObjects);
    }

    editDishMutation({
      variables: {
        input: {
          restaurantId: +restaurantId,
          name,
          price: +price,
          description,
          dishId: +id,
          options: optionObjects,
          ingredients: ingredientObjects,
        },
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mb-20">
      <div className="flex flex-col items-center">
        <h3 className="font-semibold text-2xl mb-3">?????? ??????</h3>
        <div className="grid grid-cols-3 max-w-screen-lg gap-3 my-5 w-full">
          <div className="text-center text-lg font-bold">?????? ??????</div>
          <div className="text-center text-lg font-bold">??????</div>
          <div className="text-center text-lg font-bold">??????</div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 mb-5 max-w-screen-lg w-full">
        <input
          className="input"
          type="text"
          name="name"
          placeholder="??????"
          value={pName}
          onChange={onChangeName}
          ref={register({ required: "Name is required." })}
        />
        <input
          className="input"
          type="number"
          name="price"
          min={0}
          placeholder="??????"
          value={pPrice}
          onChange={onChangePrice}
          ref={register({ required: "Price is required." })}
        />
        <input
          className="input"
          type="text"
          name="description"
          placeholder="??????"
          value={pDescription}
          onChange={onChangeDescription}
          ref={register({ required: "Description is required." })}
        />
      </div>
      <div className="flex flex-col items-center mt-8">
        <h3 className="font-semibold text-2xl mb-3">?????? ?????? ??????</h3>
        {/* ?????? ?????? */}
        <span
          onClick={onAddOptionClick}
          className="cursor-pointer text-white bg-gray-900 py-1 px-2 mt-5 bg-"
        >
          ?????? ??????
        </span>
        <div className="grid grid-cols-3 max-w-screen-lg gap-3 my-5 w-full">
          <div className="text-center text-lg font-bold">?????? ??????</div>
          <div className="text-center text-lg font-bold">?????? ??????</div>
          <div></div>
        </div>
        {sOptions &&
          sOptions?.map((option, index) => (
            <div
              key={option.name}
              className="grid grid-cols-3 gap-3 mb-5 max-w-screen-lg w-full"
            >
              <input
                className="input"
                type="text"
                ref={register}
                name={`${option.name}-optionName`}
                placeholder="?????? ??????"
                value={optionNames[index]}
                onChange={(e) => onChangeOptionName(e, index)}
              />
              <input
                className="input"
                type="number"
                name={`${option.name}-optionExtra`}
                placeholder="?????? ??????"
                value={optionExtras[index]}
                min={0}
                onChange={(e) => onChangeOptionExtra(e, index)}
                ref={register}
              />
              <span
                className="cursor-pointer text-white bg-red-500 ml-3 py-3 px-4 mt-5 text-center"
                onClick={() =>
                  onDeleteExistingOptionClick(option.name, option.extra)
                }
              >
                ?????? ??????
              </span>
            </div>
          ))}

        {optionsNumbers.length !== 0 &&
          optionsNumbers.map((id) => (
            <div
              key={id}
              className="grid grid-cols-3 gap-3 mt-5 max-w-screen-lg w-full"
            >
              <input
                ref={register}
                name={`${id}-optionName`}
                className="input"
                type="text"
                placeholder="?????? ??????"
              />
              <input
                ref={register}
                name={`${id}-optionExtra`}
                className="input"
                type="number"
                min={0}
                placeholder="?????? ??????"
              />
              <span
                className="cursor-pointer text-white bg-red-500 ml-3 py-3 px-4 mt-5 text-center"
                onClick={() => onDeleteOptionClick(id)}
              >
                ?????? ??????
              </span>
            </div>
          ))}
      </div>

      <div className="flex flex-col items-center my-8">
        <h3 className="font-semibold text-2xl mb-3">?????? ?????? ??????</h3>
        <span
          onClick={onAddIngredientClick}
          className="cursor-pointer text-white bg-gray-900 py-1 px-2 mt-5"
        >
          ????????? ????????? ?????? ??????
        </span>
        <div className="grid grid-cols-3 max-w-screen-lg gap-3 my-5 w-full">
          <div className="text-center text-lg font-bold">?????? ??????</div>
          <div className="text-center text-lg font-bold">?????? ??????</div>
          <div></div>
        </div>
        {sIngredients &&
          sIngredients?.map((ingredient, index) => (
            <div
              key={ingredient.id}
              className="grid grid-cols-3 gap-3 mb-5 max-w-screen-lg w-full"
            >
              <input
                className="input"
                type="text"
                name={`${ingredient.id}-ingredientName`}
                placeholder="?????? ??????"
                value={ingredientNames[index]}
                onChange={(e) => onChangeIngredientName(e, index)}
                ref={register}
              />
              <input
                className="input"
                type="number"
                name={`${ingredient.id}-ingredientCount`}
                placeholder="?????? ??????"
                value={ingredientCounts[index]}
                min={0}
                onChange={(e) => onChangeIngredientCount(e, index)}
                ref={register}
              />
              <span
                className="cursor-pointer text-white bg-red-500 ml-3 py-3 px-4 mt-5 text-center"
                onClick={() =>
                  onDeleteExistingIngredientClick(
                    ingredient.id,
                    ingredient.stock.name,
                    ingredient.count
                  )
                }
              >
                ?????? ??????
              </span>
            </div>
          ))}

        {ingredientsNumbers.length !== 0 &&
          ingredientsNumbers.map((id) => (
            <div
              key={id}
              className="grid grid-cols-3 gap-3 mt-5 max-w-screen-lg w-full"
            >
              <input
                ref={register}
                name={`${id}-ingredientName`}
                className="input"
                type="text"
                placeholder="?????? ??????"
              />
              <input
                ref={register}
                name={`${id}-ingredientCount`}
                className="input"
                type="number"
                min={0}
                placeholder="?????? ??????"
              />
              <span
                className="cursor-pointer text-white bg-red-500 ml-3 py-3 px-4 mt-5 text-center"
                onClick={() => onDeleteIngredientClick(id)}
              >
                ?????? ??????
              </span>
            </div>
          ))}
      </div>

      <Button
        loading={editDishLoading}
        canClick={formState.isValid}
        actionText="????????????"
      />
    </form>
  );
};
