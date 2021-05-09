import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Button } from "./button";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { editDish, editDishVariables } from "../__generated__/editDish";

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

export const DishForm: React.FC<IDishFormProps> = ({
  id,
  name,
  price,
  description,
}) => {
  const [editDishMutation, { loading }] = useMutation<
    editDish,
    editDishVariables
  >(EDIT_DISH_MUTATION);
  const { register, handleSubmit, formState, getValues } = useForm<IForm>({
    mode: "onChange",
  });

  const [pName, setName] = useState<string>(name);
  const [pPrice, setPrice] = useState<number>(price ? price : 0);
  const [pDescription, setDescription] = useState<string>(
    description ? description : ""
  );

  const history = useHistory();
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
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-4 max-w-screen-lg gap-3 w-full mb-5"
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
        loading={loading}
        canClick={formState.isValid}
        actionText="Edit Dish"
      />
    </form>
  );
};
