import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";

import Navigation from "./component/Nav/Nav";
import ProductsPage from "./container/ProductPage";
import FavoritesPage from "./container/FavoritePage";
import LoginPage from "./pages/LogInPage";
import Register from "./pages/Register";
import HomePage from "./pages/Home";
import ProfilePage from "./component/User/Profile";
import { UserAuthContext } from "./store/user-context";

const App = (props) => {
  const authCTX = useContext(UserAuthContext);
  return (
    <React.Fragment>
      <Navigation />
      <main>
        <Routes>
          {authCTX.isLoggedIn && (
            <Route path="/profile" element={<ProfilePage />} />
          )}
          {authCTX.isLoggedIn && (
            <Route path="/favorites" element={<FavoritesPage />} />
          )}
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          {!authCTX.isLoggedIn && <Route path="*" element={<LoginPage />} />}
        </Routes>
      </main>
    </React.Fragment>
  );
};

export default App;
