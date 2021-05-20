import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { gql, useMutation } from "@apollo/client";
import {
  updateCoords,
  updateCoordsVariables,
} from "../__generated__/updateCoords";
import { useMe } from "../hooks/useMe";
import { getOrder_getOrder_order } from "../__generated__/getOrder";

interface ICoords {
  lat: number;
  lng: number;
}

// interface IDriverProps {
//   lat: number;
//   lng: number;
//   $hover?: any;
// }

interface IProps {
  order: getOrder_getOrder_order | null | undefined;
}

// const Driver: React.FC<IDriverProps> = () => <div className="text-lg">🚖</div>;

export const UPDATE_COORDS_MUTATION = gql`
  mutation updateCoords($input: UpdateCoordsInput!) {
    updateCoords(input: $input) {
      ok
      error
      lat
      lng
    }
  }
`;

export const Map: React.FC<IProps> = ({ order }) => {
  const [driverCoords, setDriverCoords] = useState<ICoords>({
    lng: 36.58,
    lat: 125.95,
  });

  console.log("ORDER");
  console.log(order);

  const onCompleted = (data: updateCoords) => {
    const {
      updateCoords: { ok, lat, lng },
    } = data;
    if (ok) {
      console.log(lat, lng);
    }
  };
  const [map, setMap] = useState<google.maps.Map>();
  const [maps, setMaps] = useState<any>();
  const [updateCoordsMutation] = useMutation<
    updateCoords,
    updateCoordsVariables
  >(UPDATE_COORDS_MUTATION, { onCompleted });

  const me = useMe();
  const role = me.data?.me.role;

  // 최종본
  let destinationLat: number = 0;
  let destinationLng: number = 0;

  if (order && order?.status === "Cooked") {
    if (order.restaurant && order.restaurant.lat && order.restaurant.lng) {
      destinationLat = order.restaurant?.lat;
      destinationLng = order.restaurant?.lng;
    }
  } else if (order && order?.status === "PickedUp") {
    if (order.customer && order.customer.lat && order.customer.lng) {
      destinationLat = order.customer?.lat;
      destinationLng = order.customer?.lng;
    }
  }

  console.log(order?.status, destinationLat, destinationLng);
  // 나의 위치가 변경되면 지도에 반영한다.
  const makeRoute = (destinationLat: number, destinationLng: number) => {
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
          // 나의 위치
          origin: {
            location: new google.maps.LatLng(
              // @ts-ignore
              order?.driver?.lat,
              // @ts-ignore
              order?.driver?.lng
            ),
          },

          // 가게 위치
          destination: {
            location: new google.maps.LatLng(destinationLat, destinationLng),
          },
          travelMode: google.maps.TravelMode.TRANSIT,
        },
        (result) => {
          directionsRenderer.setDirections(result);
        }
      );
    }
  };

  // @ts-ignore
  const onSucces = ({ coords: { latitude, longitude } }: Position) => {
    if (order && order?.driver && order?.driver.lat && order?.driver.lng)
      setDriverCoords({ lat: order?.driver?.lat, lng: order?.driver?.lng });
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
  // 배달원의 위치 가져오기
  // 실시간으로 배달원의 위치(driverCoords)를 갱신한다.
  useEffect(() => {
    if (role === "Delivery") {
      navigator.geolocation.watchPosition(onSucces, onError, {
        enableHighAccuracy: true,
      });
    }
  }, []);

  useEffect(() => {
    if (map && maps) {
      map.panTo(new google.maps.LatLng(driverCoords.lat, driverCoords.lng));
    }
  }, [driverCoords.lat, driverCoords.lng, map, maps]);

  const onApiLoaded = ({ map, maps }: { map: any; maps: any }) => {
    console.log("map");
    console.log(map);
    map.panTo(new google.maps.LatLng(driverCoords.lat, driverCoords.lng));
    setMap(map);
    setMaps(maps);
  };

  useEffect(() => {
    makeRoute(destinationLat, destinationLng);
  }, [destinationLat, destinationLng, makeRoute]); // todo getDriverLocation 구현

  return (
    <div>
      <div
        className="overflow-hidden"
        style={{ width: "100%", height: "50vh" }}
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
        ></GoogleMapReact>
      </div>
    </div>
  );
};
