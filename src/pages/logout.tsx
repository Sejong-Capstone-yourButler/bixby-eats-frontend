import React from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { LOCALSTORAGE_TOKEN } from "../constants";

interface ILoginForm {
  email: string;
  password: string;
  resultError?: string;
}

export const Logout = () => {
  const removeToken = () => {
    localStorage.removeItem(LOCALSTORAGE_TOKEN);
  };

  return (
    <div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
      <Helmet>
        <title>Login | Bixby Eats</title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
        <h4 className="w-full font-medium text-left text-3xl mb-5">
          Welcome back
        </h4>

        <div>
          New to Bixby Eats?{" "}
          <Link to="/create-account" className="text-lime-600 hover:underline">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
};
