import Input from "./Input";
import * as util from "../util/validation.js";
import { useInput } from "../hooks/useInput.js";

export default function LoginUsingState() {
  const {
    value: emailValue,
    handleInputChange: handleEmailChange,
    handleBlur: handleEmailBlur,
    hasError: emailHasError,
  } = useInput("", (value) => util.isEmail(value) && util.isNotEmpty(value));

  const {
    value: passwordValue,
    handleInputChange: handlePasswordChange,
    handleBlur: handlePasswordBlur,
    hasError: passwordHasError,
  } = useInput("", (value) => util.hasMinLength(value, 6));

  function handleSubmit(event) {
    event.preventDefault();

    if (emailHasError || passwordHasError) {
      return; // - invalid, just return/do not continue
    }

    console.log(`emailValue: ${emailValue}, passwordValue: ${passwordValue}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login, using useState()</h2>

      <div className='control-row'>
        <Input
          text='Email'
          id='email'
          name='email'
          type='email'
          onChange={handleEmailChange}
          value={emailValue}
          onBlur={handleEmailBlur}
          error={emailHasError && "Please use a valid email address."}
        />

        <Input
          text='Password'
          id='password'
          name='password'
          type='password'
          onChange={handlePasswordChange}
          value={passwordValue}
          onBlur={handlePasswordBlur}
          error={passwordHasError && "Please use a valid password."}
        />
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
