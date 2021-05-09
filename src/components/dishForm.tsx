import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router-dom";
import { Button } from "./button";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { editDish, editDishVariables } from "../__generated__/editDish";
import { deleteDish, deleteDishVariables } from "../__generated__/deleteDish";

interface IDishFormProps {
  id: string;
  name: string;
  price: number | null;
  description: string | null;
}

interface IForm {
  name: string;
  price: number;
  description: string;
}

const EDIT_DISH_MUTATION = gql`
  mutation editDish($input: EditDishInput!) {
    editDish(input: $input) {
      error
      ok
    }
  }
`;

const DELETE_DISH_MUTATION = gql`
  mutation deleteDish($input: DeleteDishInput!) {
    deleteDish(input: $input) {
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
}) => {
  const history = useHistory();
  const location = useLocation();
  const onCompleted = (data: deleteDish) => {
    const {
      deleteDish: { ok, error },
    } = data;
    if (ok) {
      // delete를 누르면 해당 목록이 삭제되도록 조치
      console.log(location.pathname);
      history.push(location.pathname);
    }
  };
  const [editDishMutation, { loading: editDishLoading }] = useMutation<
    editDish,
    editDishVariables
  >(EDIT_DISH_MUTATION);
  const [deleteDishMutation, { loading: deleteDishLoading }] = useMutation<
    deleteDish,
    deleteDishVariables
  >(DELETE_DISH_MUTATION, { onCompleted });
  const { register, handleSubmit, formState, getValues } = useForm<IForm>({
    mode: "onChange",
  });

  const [pName, setName] = useState<string>(name);
  const [pPrice, setPrice] = useState<number>(price ? price : 0);
  const [pDescription, setDescription] = useState<string>(
    description ? description : ""
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
  const onSubmit = () => {
    const { name, price, description } = getValues();
    editDishMutation({
      variables: {
        input: {
          name,
          price: +price,
          description,
          dishId: +id,
        },
      },
    });
  };
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
    <div className="grid grid-cols-5 gap-3 mb-5 max-w-screen-lg w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-4 col-span-4 gap-3"
      >
        <input
          className="input"
          type="text"
          name="name"
          placeholder="Name"
          value={pName}
          onChange={onChangeName}
          ref={register({ required: "Name is required." })}
        />
        <input
          className="input"
          type="number"
          name="price"
          min={0}
          placeholder="Price"
          value={pPrice}
          onChange={onChangePrice}
          ref={register({ required: "Price is required." })}
        />
        <input
          className="input"
          type="text"
          name="description"
          placeholder="Description"
          value={pDescription}
          onChange={onChangeDescription}
          ref={register({ required: "Description is required." })}
        />
        <Button
          loading={editDishLoading}
          canClick={formState.isValid}
          actionText="Edit Dish"
        />
      </form>
      <button
        className="text-lg font-medium focus:outline-none text-white py-4  transition-colors bg-red-600 hover:bg-red-700"
        onClick={deleteBtn}
      >
        {deleteDishLoading ? "Loading..." : "Delete Dish"}
      </button>
    </div>
  );
};
