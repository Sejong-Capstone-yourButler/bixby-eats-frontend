import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "./button";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { editStock, editStockVariables } from "../__generated__/editStock";

interface IStockFormProps {
  id: string;
  name: string;
  count: number;
  description: string | null;
}

interface IForm {
  name: string;
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
  count,
  description,
}) => {
  const [editStockMutation, { loading }] =
    useMutation<editStock, editStockVariables>(EDIT_STOCK_MUTATION);
  const { register, handleSubmit, formState, getValues } = useForm<IForm>({
    mode: "onChange",
  });

  const [pName, setName] = useState<string>(name);
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
    const { name, count, description } = getValues();
    editStockMutation({
      variables: {
        input: {
          name,
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
      className="grid grid-cols-4 max-w-screen-lg gap-3 w-full mb-5"
    >
      <input
        className="input"
        type="text"
        name="name"
        placeholder="이름"
        value={pName}
        onChange={onChangeName}
        ref={register({ required: "Name is required." })}
      />
      <input
        className="input"
        type="number"
        name="count"
        min={0}
        placeholder="개수"
        value={pCount}
        onChange={onChangeCount}
        ref={register({ required: "Count is required." })}
      />
      <input
        className="input"
        type="text"
        name="description"
        placeholder="설명"
        value={pDescription}
        onChange={onChangeDescription}
        ref={register({ required: "Description is required." })}
      />
      <Button
        loading={loading}
        canClick={formState.isValid}
        actionText="재고 수정"
      />
    </form>
  );
};
