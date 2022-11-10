import React, {
  useContext,
  useEffect,
  useState,
  useReducer,
  useCallback,
} from "react";

import ErrorModal from "shared/components/UIElements/ErrorModal";
import LoadingSpinner from "shared/components/UIElements/LoadingSpinner";
import Button from "shared/components/FormElements/Button";
import Input from "shared/components/FormElements/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "shared/utils/validators";
import { useForm } from "shared/hooks/form-hook";
import { useHttpClient } from "shared/hooks/http-hook";
import { AuthContext } from "shared/context/auth-context";
import "./NewPlace.css";

// function GetItem() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(["Sasha", "Dima", "Maks", "Roma"]);
//     }, 1000);
//   });
// }

// const [userList, setUserList] = useState([]);
// useEffect(() => {
//   async function fetchData() {
//     const data = await GetItem();
//     setUserList(data);
//   }
//   fetchData();
// }, []);

// {userList.map((item) => (
//   <p key={item}>{item}</p>
// ))}

const initialState = {
  inputs: {
    title: {
      value: "",
      isValid: false,
    },
    address: {
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

const NewPlace = () => {
  const { isLoading, error, sendReq, clearError } = useHttpClient();
  const auth = useContext(AuthContext);

  const [formState, onChangeHandler] = useForm(initialState);

  function submitHandler(e) {
    e.preventDefault();
    console.log(formState.inputs, "values");
    const payload = {};
    for (const [key, value] of Object.entries(formState.inputs)) {
      payload[key] = value.value;
    }
    try {
      sendReq(
        "places",
        "POST",
        JSON.stringify({ ...payload, creator: auth.userId })
      );
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <form className="place-form" onSubmit={submitHandler}>
        <Input
          name="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter valid text"
          onChange={onChangeHandler}
        />
        <Input
          name="address"
          element="input"
          type="text"
          label="Address"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter valid text"
          onChange={onChangeHandler}
        />
        <Input
          name="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter more then 5 characters"
          onChange={onChangeHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD PLACE
        </Button>
      </form>
    </>
  );
};

export default NewPlace;
