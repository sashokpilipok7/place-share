import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Input from "shared/components/FormElements/Input";
import Button from "shared/components/FormElements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "shared/utils/validators";
import { useForm } from "shared/hooks/form-hook";
import { useHttpClient } from "shared/hooks/http-hook";
import ErrorModal from "shared/components/UIElements/ErrorModal";
import LoadingSpinner from "shared/components/UIElements/LoadingSpinner";
import { PLACES } from "./UserPlaces";
import "./UpdatePlace.css";

const initialState = {
  inputs: {
    title: {
      value: "",
      isValid: false,
    },
    description: {
      value: "",
      isValid: false,
    },
  },
  isValid: false,
};

function UpdatePlace(props) {
  const { isLoading, error, sendReq, clearError } = useHttpClient();
  const [currentPlace, setCurrentPlace] = useState(null);
  const { placeId } = useParams();
  const [formState, onChangeHandler, setFormData] = useForm(initialState);

  // const currentPlace = PLACES.find((item) => item.id === placeId); // upload data

  useEffect(() => {
    async function fetchData() {
      try {
        const responseData = await sendReq(`places/${placeId}`);
        setCurrentPlace(responseData.place);
      } catch (err) {
        console.log(err, "err");
      }
    }
    fetchData();
  }, [placeId, sendReq]);

  useEffect(() => {
    if (currentPlace) {
      setFormData(
        {
          title: {
            value: currentPlace.title,
            isValid: true,
          },
          description: {
            value: currentPlace.description,
            isValid: true,
          },
        },
        true
      ); //update form data after upload
    }
  }, [currentPlace, setFormData]);

  function submitHandler(e) {
    e.preventDefault();
    console.log(formState.inputs, "values");
    const payload = {};
    for (const [key, value] of Object.entries(formState.inputs)) {
      payload[key] = value.value;
    }
    try {
      sendReq(`places/${placeId}`, "PATCH", JSON.stringify({ ...payload }));
    } catch (err) {
      console.log(err);
    }
  }

  if (!currentPlace && !isLoading) {
    return (
      <div className="center">
        <h2>Could not find place!</h2>
      </div>
    );
  }

  console.log(formState, "formState");

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {currentPlace && (
        <form className="update-form" onSubmit={submitHandler}>
          <Input
            name="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter valid text"
            onChange={onChangeHandler}
            initialValue={currentPlace.title}
            initialIsValid={true}
          />
          <Input
            name="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter more then 5 characters"
            onChange={onChangeHandler}
            initialValue={currentPlace.description}
            initialIsValid={true}
          />
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE PLACE
          </Button>
        </form>
      )}
    </>
  );
}

export default UpdatePlace;
