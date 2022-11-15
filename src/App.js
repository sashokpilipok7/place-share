import React, { useState, useCallback } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import MainNavigation from "shared/components/Navigation/MainNavigation";
import Users from "./user/pages/Users";
import Auth from "user/pages/Auth";
import NewPlace from "./places/pages/NewPlace";
import UserPlaces from "places/pages/UserPlaces";
import UpdatePlace from "places/pages/UpdatePlace";
import { AuthContext } from "shared/context/auth-context";
import { getAuth, setAuth, isAuth, removeAuth } from "shared/utils/auth";

const App = () => {
  const [userId, setUserId] = useState(getAuth());
  const [isLoggedIn, setIsLoggedIn] = useState(isAuth());

  const login = useCallback((data) => {
    setAuth(data);
    setUserId(data);
    setIsLoggedIn(true);
  }, []);
  const logout = useCallback(() => {
    removeAuth();
    setIsLoggedIn(false);
  }, []);

  let routes;
  console.log(process.env);
  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>
        <Route path="/places/:placeId" exact>
          <UpdatePlace />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }
  console.log(userId, "authUserId");
  return (
    <AuthContext.Provider value={{ isLoggedIn, userId, login, logout }}>
      <Router>
        <MainNavigation />
        <main className="main">{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
