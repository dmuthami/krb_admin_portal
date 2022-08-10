import { useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import classes from "./ResetPassword.module.css";
const ResetPassword = () => {
  const newResetPasswordEmailInputRef = useRef();
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredNewResetPasswordemail =
      newResetPasswordEmailInputRef.current.value;

    //add validation

    let url = "http://localhost:8000/api/user/reset_password/";
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredNewResetPasswordemail,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        //a promise as a response
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let error = "Reset Password Request Error";
            console.log(data);
            throw new Error(error);
          });
        }
      })
      .then((data) => {
        //data
        authCtx.login(null);
        history.replace("/auth");
      })
      .catch((err) => {
        alert(err.message);
        history.replace("/auth");
      });
  };
  return (
    <section className={classes.profile}>
      <form onSubmit={submitHandler} className={classes.form}>
        <div className={classes.control}>
          <label htmlFor="reset-password">Reset Password</label>
          <input
            type="email"
            id="reset-password"
            ref={newResetPasswordEmailInputRef}
          />
        </div>

        <div className={classes.action}>
          <button>Reset Password</button>
        </div>
      </form>
    </section>
  );
};

export default ResetPassword;
