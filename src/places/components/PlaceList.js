import React from "react";

import Card from "shared/components/UIElements/Card";
import Button from "shared/components/FormElements/Button";
import PlaceItem from "./PlaceItem";
import "./PlaceList.css";

function PlaceList({ places }) {
  if (places.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No places found. Try to create one!</h2>
          <Button to="/places/new">Add place</Button>
        </Card>
      </div>
    );
  }
  return (
    <ul className="place-list">
      {places.map(
        ({ id, imageUrl, title, description, address, creator, location }) => (
          <PlaceItem
            key={id}
            id={id}
            image={imageUrl}
            title={title}
            description={description}
            address={address}
            creatorId={creator}
            coordinates={location}
          />
        )
      )}
    </ul>
  );
}

export default PlaceList;
