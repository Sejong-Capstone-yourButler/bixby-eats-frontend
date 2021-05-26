import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export const NotFound = () => (
  <div className="h-screen flex flex-col items-center justify-center">
    <Helmet>
      <title>Not Found | 쿠게더</title>
    </Helmet>
    <h2 className="font-semibold text-2xl mb-3">페이지를 찾을 수 없습니다.</h2>
    <h4 className="font-medium text-base mb-5">
      찾으시는 페이지가 존재하지 않거나 다른 곳으로 이동하였습니다.
    </h4>
    <Link className="hover:underline text-lime-600" to="/">
      홈으로 돌아가기 &rarr;
    </Link>
  </div>
);
