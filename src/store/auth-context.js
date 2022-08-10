import React, { useState, useEffect, useCallback } from "react";
let logoutTimer;
//Create the context and initialize
const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

const calculateRemainingTime = (expirationtime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationtime).getTime();

  const remainingTime = adjExpirationTime - currentTime;

  return remainingTime;
};

const retrieveStoredToken = () => {
  const storedtoken = localStorage.getItem("token");
  const storedExpirationDate = localStorage.getItem("expirationTime");

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 60000) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    return null;
  }
  return { token: storedtoken, duration: remainingTime };
};

//Component to avail the context or manage auth related state
export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken(); //get token from storage
  let initialToken;
  if (tokenData) {
    initialToken = tokenData.token;
  }
  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null); //clear token
    localStorage.removeItem("token"); //remove from storage
    localStorage.removeItem("expirationTime"); //remove from storage

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (token, expirationTime) => {
    setToken(token);
    localStorage.setItem("token", token); //add/set in storage
    localStorage.setItem("expirationTime", expirationTime); //store expiration time

    const remainingTime = calculateRemainingTime(expirationTime);

    logoutTimer = setTimeout(logoutHandler, remainingTime); //calls a function after a set time in milliseconds
  };

  //For browser reloads, the remainingtime is supplied correctly
  useEffect(() => {
    if (tokenData) {
      console.log(tokenData.duration);
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
