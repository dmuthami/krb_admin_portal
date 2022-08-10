import { useRef, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import classes from "./ResetPasswordConfirm.module.css";
import queryString from "query-string";

const ResetPasswordConfirm = () => {
  const newResetPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const { search } = useLocation();
  const { uid, token } = queryString.parse(search);

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredResetPassword = newResetPasswordInputRef.current.value;

    //add validation

    let url = `http://localhost:8000/api/user/reset_password_confirm/?uid=${uid}&token=${token}`;
    console.log(url);
    fetch(url, {
      method: "PATCH",
      body: JSON.stringify({
        password: enteredResetPassword,
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
            let error = "Reset Password Confirm Error";
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
      });
  };
  return (
    <section className={classes.profile}>
      <form onSubmit={submitHandler} className={classes.form}>
        <div className={classes.control}>
          <label htmlFor="reset-password-confirm">Reset Password</label>
          <input
            type="password"
            id="reset-password-confirm"
            ref={newResetPasswordInputRef}
          />
        </div>

        <div className={classes.action}>
          <button>Reset Password Confirm</button>
        </div>
      </form>
    </section>
  );
};

export default ResetPasswordConfirm;
