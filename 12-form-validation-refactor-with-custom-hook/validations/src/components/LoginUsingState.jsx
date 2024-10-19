import { useState } from "react";
import Input from "./Input";
import * as util from "../util/validation.js";

export default function LoginUsingState() {
  const [enteredValues, setEnteredValues] = useState({
    email: "",
    password: "",
  });

  const [didEdit, setDidEdit] = useState({
    email: false,
    password: false,
  });

  function handleSubmit(event) {
    event.preventDefault();
    // console.log("Form values:\n" + JSON.stringify(enteredValues));
    // console.log(`form submitted\n ${formEmail} - ${formPassword}`);

    setEnteredValues({
      email: "",
      password: "",
    });
  }

  const emailInvalid =
    didEdit.email &&
    util.isEmail(enteredValues.email) &&
    !util.isNotEmpty(enteredValues.email);

  // - outsourced validation
  // const emailInvalid = didEdit.email && !enteredValues.email.includes("@");

  const passwordInvalid =
    didEdit.password && !util.hasMinLength(enteredValues.password, 6);

  // - outsourced validation
  // didEdit.password && enteredValues.password.trim().length < 6;

  function handleInputChange(event) {
    console.log(`${event.targetid} - ${event.target.value}`);

    setEnteredValues((previousState) => ({
      ...previousState,
      [event.target.id]: event.target.value,
    }));

    // - clear the input error state when user types again
    // giving a chance to complete a valid value
    setDidEdit((previousValue) => ({
      ...previousValue,
      [event.target.id]: false,
    }));
  }

  function handleBlur(event) {
    console.log("blur, id: " + event.target.id);
    setDidEdit((previousState) => ({
      ...previousState,
      [event.target.id]: true,
    }));
  }

  // -
  // const [formEmail, setFormEmail] = useState("");
  // const [formPassword, setFormPassword] = useState("");

  // function handleEmail(event) {
  //   setFormEmail(event.target.value);
  //   console.log("target id? " + event.target.id);
  // }

  // function handlePassword(event) {
  //   setFormPassword(event.target.value);
  //   console.log("target id? " + event.target.id);
  // }

  console.log("form values state:\n" + JSON.stringify(enteredValues));

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login, using useState()</h2>

      <div className='control-row'>
        <Input
          text='Email'
          id='email'
          name='email'
          type='email'
          onChange={(event) => handleInputChange(event)}
          value={enteredValues.email}
          onBlur={(event) => handleBlur(event)}
          error={emailInvalid && "Please use a valid email address."}
        />

        {/* <div className='control no-margin'>
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            type='email'
            name='email'
            onChange={(event) => handleInputChange(event)}
            value={enteredValues.email}
            onBlur={(event) => handleBlur(event)}
          />
          <div className='control-error'>
            {emailInvalid && <p>Please enter an email address.</p>}
          </div>
        </div> */}

        <Input
          text='Password'
          id='password'
          name='password'
          type='password'
          onChange={(event) => handleInputChange(event)}
          value={enteredValues.password}
          onBlur={(event) => handleBlur(event)}
          error={passwordInvalid && "Please use a valid password."}
        />

        {/* <div className='control no-margin'>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            name='password'
            onChange={(event) => handleInputChange(event)}
            value={enteredValues.password}
            onBlur={(event) => handleBlur(event)}
          />
        </div>
       */}
      </div>

      <p className='form-actions'>
        <button className='button button-flat'>Reset</button>
        <button className='button' type='submit'>
          Login
        </button>
      </p>
    </form>
  );
}
