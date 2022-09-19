import { useReducer, useCallback } from "react";

function formReducer(state, action) {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }

      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: {
            value: action.value,
            isValid: action.isValid,
          },
        },
        isValid: formIsValid,
      };
    case "SET_DATA":
      return {
        ...state,
        inputs: action.inputs,
        isValid: action.formIsValid,
      };
    default:
      return state;
  }
}

export function useForm(initialState) {
  const [formState, dispatch] = useReducer(formReducer, initialState);

  const onChangeHandler = useCallback((inputId, value, isValid) => {
    dispatch({ type: "INPUT_CHANGE", inputId, value, isValid });
  }, []);

  const setFormData = useCallback((inputData, formIsValid) => {
    dispatch({ type: "SET_DATA", inputs: inputData, formIsValid });
  }, []);

  return [formState, onChangeHandler, setFormData];
}
