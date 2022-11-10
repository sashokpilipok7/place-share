import React, { useContext, useState } from "react";

import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "shared/utils/validators";
import { useHttpClient } from "shared/hooks/http-hook";
import { useForm } from "shared/hooks/form-hook";
import Input from "shared/components/FormElements/Input";
import Button from "shared/components/FormElements/Button";
import ErrorModal from "shared/components/UIElements/ErrorModal";
import LoadingSpinner from "shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "shared/context/auth-context";
import "./Auth.css";

const initialState = {
  inputs: {
    email: {
      value: "",
      isValid: false,
    },
    password: {
      value: "",
      isValid: false,
    },
  },
  isValid: false,
};

function Auth(props) {
  const [formState, onChangeHandler, setFormData] = useForm(initialState);
  const auth = useContext(AuthContext);

  const [logInMode, setLogInMode] = useState(true);

  const title = logInMode ? "Log In" : "Sign Up";

  function switchHandler() {
    if (logInMode) {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    }
    setLogInMode((logInMode) => !logInMode);
  }

  const { isLoading, error, sendReq, clearError } = useHttpClient();

  async function logInSubmitHandler(e) {
    e.preventDefault();
    const payload = {};
    for (const [key, value] of Object.entries(formState.inputs)) {
      payload[key] = value.value;
    }

    if (logInMode) {
      sendReq("users/login", "POST", JSON.stringify(payload)).then((data) => {
        console.log(data);
        auth.login(data.user.id);
      });
    } else {
      sendReq("users/signup", "POST", JSON.stringify(payload)).then((data) => {
        console.log(data);
        auth.login(data.user.id);
      });
    }
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <div>
        {isLoading && <LoadingSpinner asOverlay />}
        <h2 className="auth-title">{title}</h2>
        <form className="auth-form" onSubmit={logInSubmitHandler}>
          {!logInMode && (
            <Input
              name="name"
              element="input"
              type="text"
              label="Your Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter valid EMAIL"
              onChange={onChangeHandler}
            />
          )}
          <Input
            name="email"
            element="input"
            type="email"
            label="Email"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter valid EMAIL"
            onChange={onChangeHandler}
          />
          <Input
            name="password"
            element="input"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(8)]}
            errorText="Please enter valid PASSWORD"
            onChange={onChangeHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            {title}
          </Button>
        </form>
        <div className="center">
          <Button inverse onClick={switchHandler}>
            {" "}
            Switch from {title}
          </Button>
        </div>
      </div>
    </>
  );
}

export default Auth;
