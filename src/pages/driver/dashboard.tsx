import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { gql, useMutation, useSubscription } from "@apollo/client";
import { FULL_ORDER_FRAGMENT } from "../../fragments";
import { coockedOrders } from "../../__generated__/coockedOrders";
import { useHistory } from "react-router-dom";
import { takeOrder, takeOrderVariables } from "../../__generated__/takeOrder";
import {
  updateUserCoords,
  updateUserCoordsVariables,
} from "../../__generated__/updateUserCoords";
import { UPDATE_COORDS_MUTATION } from "../../components/map";

export const COOCKED_ORDERS_SUBSCRIPTION = gql`
  subscription coockedOrders {
    cookedOrders {
      ...FullOrderParts
    }
  }
  ${FULL_ORDER_FRAGMENT}
`;

const TAKE_ORDER_MUTATION = gql`
  mutation takeOrder($input: TakeOrderInput!) {
    takeOrder(input: $input) {
      ok
      error
    }
  }
`;

interface ICoords {
  lat: number;
  lng: number;
}

interface IDriverProps {
  lat: number;
  lng: number;
  $hover?: any;
}

const Driver: React.FC<IDriverProps> = ({ lat, lng }) => (
  // @ts-ignore
  <div lat={lat} lng={lng} className="text-lg">
    🚖
  </div>
);

export const Dashboard = () => {
  const [driverCoords, setDriverCoords] = useState<ICoords>({ lng: 0, lat: 0 });
  const [map, setMap] = useState<google.maps.Map>();
  const [maps, setMaps] = useState<any>();
  const [updateCoordsMutation] = useMutation<
    updateUserCoords,
    updateUserCoordsVariables
  >(UPDATE_COORDS_MUTATION);

  // @ts-ignore
  const onSucces = ({ coords: { latitude, longitude } }: Position) => {
    setDriverCoords({ lat: latitude, lng: longitude });
    updateCoordsMutation({
      variables: {
        input: {
          lat: latitude,
          lng: longitude,
        },
      },
    });
  };
  // @ts-ignore
  const onError = (error: PositionError) => {
    console.log(error);
  };
  // 나의 위치를 가져온다.
  useEffect(() => {
    navigator.geolocation.watchPosition(onSucces, onError, {
      enableHighAccuracy: true,
    });
  }, []);
  // 나의 위치가 변경되면 지도에 반영한다.
  useEffect(() => {
    if (map && maps) {
      map.panTo(new google.maps.LatLng(driverCoords.lat, driverCoords.lng));
    }
  }, [driverCoords.lat, driverCoords.lng, map, maps]);
  const onApiLoaded = ({ map, maps }: { map: any; maps: any }) => {
    map.panTo(new google.maps.LatLng(driverCoords.lat, driverCoords.lng));
    setMap(map); // map은 지금 당장 내가 가지고 있는 지도 정보다. react component다.

    // maps는 내가 사용할 수 있는 Google maps 객체다. map을 위한 constructor다.
    // 하지만 google.maps를 사용하면 state로 관리할 필요가 없다.
    setMaps(maps);
  };
  // 나의 위치와 목적지의 route를 만든다.
  const makeRoute = () => {
    if (map) {
      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer({
        polylineOptions: {
          strokeColor: "#88def3",
          strokeOpacity: 0.8,
          strokeWeight: 5,
        },
      });
      directionsRenderer.setMap(map);
      directionsService.route(
        {
          // Driver 위치
          origin: {
            location: new google.maps.LatLng(
              driverCoords.lat,
              driverCoords.lng
            ),
          },

          // 가게 위치
          destination: {
            location: new google.maps.LatLng(
              // @ts-ignore
              coockedOrdersData?.cookedOrders.restaurant.lat,
              // @ts-ignore
              coockedOrdersData?.cookedOrders.restaurant.lng
            ),
          },
          travelMode: google.maps.TravelMode.TRANSIT,
        },
        (result) => {
          directionsRenderer.setDirections(result);
        }
      );
    }
  };
  const { data: coockedOrdersData } = useSubscription<coockedOrders>(
    COOCKED_ORDERS_SUBSCRIPTION
  );
  useEffect(() => {
    if (coockedOrdersData?.cookedOrders.id) {
      makeRoute();
    }
  }, [coockedOrdersData, makeRoute]);
  const history = useHistory();
  const onCompleted = (data: takeOrder) => {
    if (data.takeOrder.ok) {
      history.push(`/orders/${coockedOrdersData?.cookedOrders.id}`);
    }
  };
  const [takeOrderMutation] = useMutation<takeOrder, takeOrderVariables>(
    TAKE_ORDER_MUTATION,
    {
      onCompleted,
    }
  );
  const triggerMutation = (orderId: number) => {
    takeOrderMutation({
      variables: {
        input: {
          id: orderId,
        },
      },
    });
  };
  return (
    <div>
      <div
        className="overflow-hidden"
        style={{ width: window.innerWidth, height: "50vh" }}
      >
        <GoogleMapReact
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={onApiLoaded}
          defaultZoom={16}
          draggable={true}
          defaultCenter={{
            lat: 36.58,
            lng: 125.95,
          }}
          bootstrapURLKeys={{ key: "AIzaSyDr47Qx79ewUO_hKU48SwY8VbXa72YuXDk" }}
        >
          <Driver lat={driverCoords.lat} lng={driverCoords.lng} />
        </GoogleMapReact>
      </div>
      <div className="max-w-screen-sm mx-auto bg-white relative -top-10 shadow-lg py-8 px-5">
        {coockedOrdersData?.cookedOrders.restaurant ? (
          <>
            <h1 className="text-center text-3xl font-medium">
              새로운 주문이 왔습니다.
            </h1>
            <h1 className="text-center my-3 text-2xl font-medium">
              픽업 @ {""}
              {coockedOrdersData?.cookedOrders.restaurant?.name}
            </h1>
            <button
              onClick={() =>
                triggerMutation(coockedOrdersData?.cookedOrders.id)
              }
              className="btn w-full  block  text-center mt-5"
            >
              배달 수락하기 &rarr;
            </button>
          </>
        ) : (
          <h1 className="text-center  text-3xl font-medium">
            아직 주문이 없습니다.
          </h1>
        )}
      </div>
    </div>
  );
};
