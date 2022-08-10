import { useState, useRef, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
// import axios from "axios";
import AuthContext from "../../store/auth-context";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const authCtx = useContext(AuthContext); //get the context
  console.log(authCtx.isLoggedIn);
  const history = useHistory();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    //Get inputs
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    //Optional: Add validation

    setIsLoading(true);
    let url;
    let myBody;
    if (isLogin) {
      url = "http://localhost:8000/api/user/token_custom/";
      myBody = {
        password: enteredPassword,
        username: enteredEmail,
      };
    } else {
      url = "http://localhost:8000/api/user/create/";
      myBody = {
        email: enteredEmail,
        password: enteredPassword,
        username: enteredEmail,
        name: "Test",
        mobile_phone: "+254724874500",
      };
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify(myBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed!";
            // if (data && data.error && data.error.message) {
            //   errorMessage = data.error.message;
            // }

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        if (isLogin) {
          const expirationTime = new Date(
            new Date().getTime() + +data.expiresIn * 1000
          );
          authCtx.login(data.token, expirationTime.toISOString());
        } else {
          authCtx.login(null);
        }
        console.log(data);
        history.replace("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p>sending request...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
        {!authCtx.isLoggedIn && <Link to="/resetpassword">Reset Password</Link>}
      </form>
    </section>
  );
};

export default AuthForm;
