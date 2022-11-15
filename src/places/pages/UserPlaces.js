import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHttpClient } from "shared/hooks/http-hook";

import ErrorModal from "shared/components/UIElements/ErrorModal";
import LoadingSpinner from "shared/components/UIElements/LoadingSpinner";
import PlaceList from "places/components/PlaceList";

export const PLACES = [
  {
    id: "p1",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/d/d5/%D0%86%D0%BD%D0%B4%D1%83%D1%81%D1%82%D1%80%D1%96%D0%B0%D0%BB%D1%8C%D0%BD%D0%B8%D0%B9_%D0%BA%D0%BE%D0%BB%D0%B5%D0%B4%D0%B6.jpg",
    title: "Кам'янець-Подільський індустріальний ",
    description: "державний вищий навчальний заклад у Кам'янці-Подільському",
    address: "вулиця Суворова, 17, Кам'янець-Подільський",
    creator: "u1",
    location: {
      lat: 48.686041877319035,
      lng: 26.571066315655322,
    },
  },
  {
    id: "p2",
    imageUrl:
      "https://media.cntraveler.com/photos/60596b398f4452dac88c59f8/master/w_4000,h_2667,c_limit/MtFuji-GettyImages-959111140.jpg",
    title: "Кам'янець-Подільський індустріальний ",
    description: "державний вищий навчальний заклад у Кам'янці-Подільському",
    address: "вулиця Суворова, 17, Кам'янець-Подільський,",
    creator: "u2",
    location: {
      lat: 48.686041877319035,
      lng: 26.571066315655322,
    },
  },
];

function UserPlaces() {
  const { userId } = useParams();
  const { isLoading, error, sendReq, clearError } = useHttpClient();
  const [loadedPlaces, setLoadedPlaces] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const responseData = await sendReq(`places/user/${userId}`);
        console.log(responseData);
        responseData.places && setLoadedPlaces(responseData.places);
      } catch (err) {
        console.log(err);
      }
    }
    fetchUsers();
  }, [sendReq, userId]);

  const placeDeleteHandler = (deletePlaceId) => {
    setLoadedPlaces((prevList) =>
      prevList.filter((i) => i.id !== deletePlaceId)
    );
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      <PlaceList places={loadedPlaces} onPlaceDelete={placeDeleteHandler} />
    </>
  );
}

export default UserPlaces;
