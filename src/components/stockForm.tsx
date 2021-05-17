import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Button } from "./button";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { editStock, editStockVariables } from "../__generated__/editStock";

interface IStockFormProps {
  id: string;
  name: string;
  price: number | null;
  count: number;
  description: string | null;
}

interface IForm {
  name: string;
  price: number;
  count: number;
  description: string;
}

const EDIT_STOCK_MUTATION = gql`
  mutation editStock($input: EditStockInput!) {
    editStock(input: $input) {
      error
      ok
    }
  }
`;

export const StockForm: React.FC<IStockFormProps> = ({
  id,
  name,
  price,
  count,
  description,
}) => {
  const [editStockMutation, { loading }] =
    useMutation<editStock, editStockVariables>(EDIT_STOCK_MUTATION);
  const { register, handleSubmit, formState, getValues } = useForm<IForm>({
    mode: "onChange",
  });

  const [pName, setName] = useState<string>(name);
  const [pPrice, setPrice] = useState<number>(price ? price : 0);
  const [pCount, setCount] = useState<number>(count);
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
  const onChangeCount = (e: any) => {
    const {
      target: { value },
    } = e;
    setCount(value);
  };
  const onChangeDescription = (e: any) => {
    const {
      target: { value },
    } = e;
    setDescription(value);
  };
  const onSubmit = () => {
    const { name, price, count, description } = getValues();
    editStockMutation({
      variables: {
        input: {
          name,
          price: +price,
          count: +count,
          description,
          stockId: +id,
        },
      },
    });
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-5 max-w-screen-lg gap-3 w-full mb-5"
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
        type="number"
        name="count"
        min={0}
        placeholder="Count"
        value={pCount}
        onChange={onChangeCount}
        ref={register({ required: "Count is required." })}
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
        actionText="Edit Stock"
      />
    </form>
  );
};
