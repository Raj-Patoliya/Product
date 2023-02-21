import React from "react";

export const UserAuthContext = React.createContext({
  user: {},
  isLoggedIn: false,
  login: async () => {},
  logout: () => {},
});
