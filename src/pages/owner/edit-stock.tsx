import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
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
        price
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
        <title>Edit Stock | Bixby Eats</title>
      </Helmet>
      <h4 className="font-semibold text-2xl mb-3">Edit Stock</h4>
      <div className="grid grid-cols-5 max-w-screen-lg gap-3 my-5 w-full">
        <div className="text-center text-lg font-bold">Name</div>
        <div className="text-center text-lg font-bold">Price</div>
        <div className="text-center text-lg font-bold">Count</div>
        <div className="text-center text-lg font-bold">Description</div>
        <div></div>
      </div>

      {data?.getStocks.stocks.map((stock) => (
        <StockForm
          key={stock.id}
          id={stock.id + ""}
          name={stock.name}
          price={stock.price}
          count={stock.count}
          description={stock.description}
        />
      ))}

      <button onClick={back} className="btn w-32">
        Back
      </button>
    </div>
  );
};
