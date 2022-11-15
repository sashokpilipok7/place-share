import React, { useContext, useState } from "react";

import config from "_config";
import ErrorModal from "shared/components/UIElements/ErrorModal";
import LoadingSpinner from "shared/components/UIElements/LoadingSpinner";
import Map from "shared/components/UIElements/Map";
import Modal from "shared/components/UIElements/Modal";
import Card from "shared/components/UIElements/Card";
import Button from "shared/components/FormElements/Button";
import { AuthContext } from "shared/context/auth-context";
import { useHttpClient } from "shared/hooks/http-hook";
import "./PlaceItem.css";

function PlaceItem({
  id,
  image,
  title,
  description,
  address,
  creatorId,
  coordinates,
  onDelete,
}) {
  const [showMap, setShowMap] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { isLoading, error, sendReq, clearError } = useHttpClient();

  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);

  const showDeleteHandler = () => setShowDeleteDialog(true);
  const cancelDeleteHandler = () => setShowDeleteDialog(false);
  const confirmDeleteHandler = async () => {
    console.log("DELETING...");
    try {
      setShowDeleteDialog(false);
      await sendReq(`places/${id}`, "DELETE");
      onDelete(id);
    } catch (err) {
      console.error(err);
    }
  };

  const auth = useContext(AuthContext);

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={`${config.baseUrl}${image}`} alt={title} />
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
