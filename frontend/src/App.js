import React, { useState, useCallback } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import MainNavigation from "./shared/components/UIElements/Navigation/MainNavigation";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";
import Auth from "./user/pages/Auth";
import { AuthContext } from "./shared/context/auth-context";

function App() {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);

  const login = useCallback((uid, token) => {
    setToken(token);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
  }, []);

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route exact path="/">
          <Users />
        </Route>
        <Route path="/:userId/places">
          <UserPlaces />
        </Route>
        <Route exact path="/places/new">
          <NewPlace />
        </Route>
        <Route path="/places/:placeId">
          <UpdatePlace />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route exact path="/">
          <Users />
        </Route>
        <Route path="/:userId/places">
          <UserPlaces />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
