import React, {useContext} from "react";
import { useHistory } from 'react-router-dom';
import "./NewPlace.css";
import Input from "../../shared/components/UIElements/FormElements/Input";
import Button from "../../shared/components/UIElements/FormElements/Button";
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/components/UIElements/util/validators";
import { useForm } from '../../shared/hooks/form-hook';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';

const NewPlace = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      },
      address: {
        value: '',
        isValid: false
      }
    },
    false
  );
  const history = useHistory();

  const placeSubmitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest(
        'http://localhost:4000/api/places',
        'POST',
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          address: formState.inputs.address.value,
          creator: auth.userId
        }),
        { 'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token
       }
      );
      history.push('/');
    } catch (err) {} 
  };

  return (
    <React.Fragment>
    <ErrorModal error={error} onClear={clearError} />
    <form className="place-form" onSubmit={placeSubmitHandler}>
    {isLoading && <LoadingSpinner asOverlay />}
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title"
        onInput={inputHandler}
      />

      <Input
        id="description"
        element="textarea"
        type="text"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (at least 5 characters)"
        onInput={inputHandler}
      />

      <Input
        id="address"
        element="input"
        type="text"
        label="Address"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid address"
        onInput={inputHandler}
      />
      <Button type="submit" disabled={!formState.isValid}>
        ADD PLACE
      </Button>
    </form>
    </React.Fragment>
  );
};

export default NewPlace;
