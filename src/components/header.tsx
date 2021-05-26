import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { isLoggedInVar } from "../apollo";
import { LOCALSTORAGE_TOKEN } from "../constants";
import { useMe } from "../hooks/useMe";
import cooGetherLogo from "../images/logo.svg";

export const Header: React.FC = () => {
  const { data } = useMe();
  const history = useHistory();

  const logout = () => {
    localStorage.removeItem(LOCALSTORAGE_TOKEN);
    isLoggedInVar(false);
    window.location.reload();
    history.push("/");
  };
  return (
    <>
      {!data?.me.verified && (
        <div className="bg-red-500 p-3 text-center text-base text-white">
          <span>이메일을 인증해주세요.</span>
        </div>
      )}
      <header className="py-4">
        <div className="w-full px-5 xl:px-0 max-w-screen-xl mx-auto flex justify-between items-center">
          <Link to="/">
            <img src={cooGetherLogo} className="w-20" alt="Nuber Eats" />
          </Link>
          <span className="">
            <button className="mr-5 text-xl font-bold" onClick={logout}>
              Logout
            </button>
            <Link to="/edit-profile">
              <FontAwesomeIcon icon={faUser} className="text-3xl" />
            </Link>
          </span>
        </div>
      </header>
    </>
  );
};
