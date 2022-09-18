import React, { useEffect, useState, useCallback } from "react";

import Input from "shared/components/FormElements/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "shared/utils/validators";
import "./NewPlace.css";

function GetItem() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(["Sasha", "Dima", "Maks", "Roma"]);
    }, 1000);
  });
}

const NewPlace = () => {
  const [userList, setUserList] = useState([]);
  const [placeData, setPlaceData] = useState({});

  useEffect(() => {
    // GetItem().then((data) => setUserList(data));

    async function fetchData() {
      const data = await GetItem();
      setUserList(data);
    }
    fetchData();
  }, []);

  const onChangeHandler = useCallback((data) => {
    console.log(data, "data");
    // setPlaceData({ ...placeData, ...data });
  }, []);

  console.log(placeData, "placeData");

  return (
    <form className="place-form">
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
        name="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter valid text"
        onChange={onChangeHandler}
      />
      {userList.map((item) => (
        <p key={item}>{item}</p>
      ))}
    </form>
  );
};

export default NewPlace;
