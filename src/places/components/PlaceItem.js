import React, { useContext, useState } from "react";

import Map from "shared/components/UIElements/Map";
import Modal from "shared/components/UIElements/Modal";
import Card from "shared/components/UIElements/Card";
import Button from "shared/components/FormElements/Button";
import { AuthContext } from "shared/context/auth-context";
import "./PlaceItem.css";

function PlaceItem({
  id,
  image,
  title,
  description,
  address,
  creatorId,
  coordinates,
}) {
  const [showMap, setShowMap] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);

  const showDeleteHandler = () => setShowDeleteDialog(true);
  const cancelDeleteHandler = () => setShowDeleteDialog(false);
  const confirmDeleteHandler = () => console.log("DELETING...");

  const auth = useContext(AuthContext);

  return (
    <>
      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={image} alt={title} />
          </div>
          <div className="place-item__info">
            <h2>{title}</h2>
            <h3>{address}</h3>
            <p>{description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMapHandler}>
              VIEW ON MAP
            </Button>
            {auth.isLoggedIn && (
              <>
                <Button to={`/places/${id}`}>EDIT</Button>
                <Button danger onClick={showDeleteHandler}>
                  DELETE
                </Button>
              </>
            )}
          </div>
        </Card>
      </li>
      <Modal
        show={showDeleteDialog}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <>
            <Button onClick={cancelDeleteHandler}>No</Button>
            <Button onClick={confirmDeleteHandler}>Yes</Button>
          </>
        }
      >
        <p>Do you want to delete this place?</p>
      </Modal>
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={
          <>
            <Button onClick={closeMapHandler}>CLOSE</Button>
          </>
        }
      >
        <div className="map-container">
          <h2>THE MAP!</h2>
          {/* <Map center={coordinates} zoom={1} /> */}
        </div>
      </Modal>
    </>
  );
}

export default PlaceItem;
