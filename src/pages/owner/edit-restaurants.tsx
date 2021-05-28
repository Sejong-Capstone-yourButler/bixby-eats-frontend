import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { Button } from "../../components/button";
import { FormError } from "../../components/form-error";
import {
  editRestaurant,
  editRestaurantVariables,
} from "../../__generated__/editRestaurant";

const EDIT_RESTAURANT_MUTATION = gql`
  mutation editRestaurant($input: EditRestaurantInput!) {
    editRestaurant(input: $input) {
      error
      ok
    }
  }
`;

interface IParams {
  id: string;
}

interface IFormProps {
  name: string;
  address: string;
  categoryName: string;
  file: FileList;
}

export const EditRestaurant = () => {
  const { id } = useParams<IParams>();

  const onCompleted = (data: editRestaurant) => {
    const {
      editRestaurant: { ok },
    } = data;
    if (ok) {
      setUploading(false);
    }
  };

  const [editRestaurantMutation, { data }] = useMutation<
    editRestaurant,
    editRestaurantVariables
  >(EDIT_RESTAURANT_MUTATION, { onCompleted });
  const { register, getValues, formState, handleSubmit } = useForm<IFormProps>({
    mode: "onChange",
  });
  const [uploading, setUploading] = useState(false);
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  // 위치 값 가져오기
  // @ts-ignore
  const onSucces = ({ coords: { latitude, longitude } }: Position) => {
    setLat(latitude);
    setLng(longitude);
  };
  // @ts-ignore
  const onError = (error: PositionError) => {
    console.log(error);
  };
  navigator.geolocation.getCurrentPosition(onSucces, onError, {
    enableHighAccuracy: true,
  });

  const onSubmit = async () => {
    try {
      setUploading(true);
      const { name, address, file } = getValues();
      const actualFile = file[0];
      const formBody = new FormData();
      formBody.append("file", actualFile);
      const { url: coverImg } = await (
        await fetch("https://bixby-eats-backend.herokuapp.com/uploads/", {
          method: "POST",
          body: formBody,
        })
      ).json();

      editRestaurantMutation({
        variables: {
          input: {
            restaurantId: +id,
            name,
            address,
            coverImg,
            lat,
            lng,
          },
        },
      });
      console.log("4");
    } catch (e) {}
  };
  return (
    <div className="container flex flex-col items-center mt-52">
      <Helmet>
        <title>식당 수정 | 쿠게더</title>
      </Helmet>
      <h4 className="font-semibold text-2xl mb-3">식당 수정</h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid max-w-screen-sm gap-3 mt-5 w-full mb-5"
      >
        <input
          className="input"
          type="text"
          name="name"
          placeholder="식당 이름"
          ref={register({ required: "Name is required." })}
        />
        <input
          className="input"
          type="text"
          name="address"
          placeholder="식당 주소"
          ref={register({ required: "Address is required." })}
        />
        <div>
          <input
            type="file"
            name="file"
            accept="image/*"
            ref={register({ required: true })}
          />
        </div>
        <Button
          loading={uploading}
          canClick={formState.isValid}
          actionText="식당 수정"
        />
        {data?.editRestaurant?.error && (
          <FormError errorMessage={data.editRestaurant.error} />
        )}
      </form>
    </div>
  );
};
