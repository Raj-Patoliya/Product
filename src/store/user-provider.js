import { useReducer, useState } from "react";
import { UserAuthContext } from "./user-context";

const initialUserState = {
  displayName: null,
  email: null,
  idToken: null,
};
const initalCartState = {
  items: [],
  totalAomount: 0,
};
const initalFavoriteState = [];

const userReducer = (state, action) => {
  if (action.type === "Login") {
    const newUserState = {
      displayName: action.data.displayName,
      email: action.data.email,
      idToken: action.data.idToken,
      isLoggedIn: true,
    };
    localStorage.setItem("idToken", action.data.idToken);
    return newUserState;
  }
  if (action.type === "Logout") {
    localStorage.removeItem("idToken");
    return initialUserState;
  }
};

export const UserAuthProvider = (props) => {
  const [userState, dispatchUsreAction] = useReducer(
    userReducer,
    initialUserState
  );
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const loginHandler = async (email, password) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAaxn-rSpnjSy8NudFDLXnQPxK5PsB5cBg",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }
    );
    const data = await response.json();
    dispatchUsreAction({
      type: "Login",
      data: {
        displayName: data.displayName,
        email: data.email,
        idToken: data.idToken,
      },
    });
    setisLoggedIn(true);
    return true;
  };
  const logoutHandler = () => {
    dispatchUsreAction({ type: "Logout" });
    setisLoggedIn(false);
  };
  const useContext = {
    user: userState,
    login: loginHandler,
    logout: logoutHandler,
    isLoggedIn: isLoggedIn,
  };
  return (
    <UserAuthContext.Provider value={useContext}>
      {props.children}
    </UserAuthContext.Provider>
  );
};
