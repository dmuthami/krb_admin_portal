import { useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
  const newPasswordInputRef = useRef();
  const oldPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const submitHandler = (event) => {
    event.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current.value;
    const enteredOldPassword = oldPasswordInputRef.current.value;

    //add validation

    let url = "http://localhost:8000/api/user/changepassword/";
    fetch(url, {
      method: "PATCH",
      body: JSON.stringify({
        old_password: enteredOldPassword,
        new_password: enteredNewPassword,
      }),
      headers: {
        Authorization: `Token ${authCtx.token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        //a promise as a response
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let error = "Change Password Error";
            console.log(data);
            throw new Error(error);
          });
        }
      })
      .then((data) => {
        //data
        authCtx.login(null);
        history.replace("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor="old-password">Old Password</label>
        <input
          type="password"
          id="old-password"
          minLength="8"
          ref={oldPasswordInputRef}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          minLength="8"
          ref={newPasswordInputRef}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
