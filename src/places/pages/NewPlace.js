import React, { useEffect, useState, useReducer, useCallback } from "react";

import Button from "shared/components/FormElements/Button";
import Input from "shared/components/FormElements/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "shared/utils/validators";
import { useForm } from "shared/hooks/form-hook";
import "./NewPlace.css";

function GetItem() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(["Sasha", "Dima", "Maks", "Roma"]);
    }, 1000);
  });
}

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
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const data = await GetItem();
      setUserList(data);
    }
    fetchData();
  }, []);

  const [formState, onChangeHandler] = useForm(initialState);

  function submitHandler(e) {
    e.preventDefault();
    console.log(formState.inputs, "values");
  }

  return (
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
      {userList.map((item) => (
        <p key={item}>{item}</p>
      ))}
    </form>
  );
};

export default NewPlace;
