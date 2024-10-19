import { useRef, useState } from "react";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const [emailInvalid, setEmailInvalid] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    const enteredValues = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    // - validation
    const emailFieldInvalid =
      enteredValues.email != "" || !enteredValues.email.includes("@");
    if (!emailFieldInvalid) {
      setEmailInvalid(true);
      return;
    }

    setEmailInvalid(false);

    console.log("using ref, entered values:\n" + JSON.stringify(enteredValues));
    // - resetting using ref
    // - not ideal/advised
    emailRef.current.value = "";
    passwordRef.current.value = "";
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className='control-row'>
        <div className='control no-margin'>
          <label htmlFor='email'>Email</label>
          <input id='email' type='email' name='email' ref={emailRef} />
          <div className='control-error'>
            {emailInvalid && <p>Valid email please.</p>}
          </div>
        </div>

        <div className='control no-margin'>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            name='password'
            ref={passwordRef}
          />
        </div>
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
