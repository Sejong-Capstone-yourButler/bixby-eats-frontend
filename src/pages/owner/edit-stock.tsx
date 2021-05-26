import React from "react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { Helmet } from "react-helmet-async";
import { useHistory, useParams } from "react-router";
import { StockForm } from "../../components/stockForm";
import { getStocks, getStocksVariables } from "../../__generated__/getStocks";

const GET_STOCKS_QUERY = gql`
  query getStocks($input: GetStocksInput!) {
    getStocks(input: $input) {
      error
      ok
      stocks {
        id
        name
        count
        description
      }
    }
  }
`;

interface IParams {
  restaurantId: string;
}

export const EditStock = () => {
  const { restaurantId } = useParams<IParams>();
  const history = useHistory();

  const { data } = useQuery<getStocks, getStocksVariables>(GET_STOCKS_QUERY, {
    variables: {
      input: {
        id: +restaurantId,
      },
    },
  });

  const back = () => {
    history.push(`/restaurants/${restaurantId}`);
  };
  return (
    <div className="container flex flex-col items-center my-32">
      <Helmet>
        <title>재고 수정 | 쿠게더</title>
      </Helmet>
      <h4 className="font-semibold text-2xl mb-3">재고 수정</h4>
      <div className="grid grid-cols-4 max-w-screen-lg gap-3 my-5 w-full">
        <div className="text-center text-lg font-bold">이름</div>
        <div className="text-center text-lg font-bold">개수</div>
        <div className="text-center text-lg font-bold">설명</div>
        <div></div>
      </div>

      {data?.getStocks.stocks.map((stock) => (
        <StockForm
          key={stock.id}
          id={stock.id + ""}
          name={stock.name}
          count={stock.count}
          description={stock.description}
        />
      ))}

      <button onClick={back} className="btn w-32">
        뒤로가기
      </button>
    </div>
  );
};
