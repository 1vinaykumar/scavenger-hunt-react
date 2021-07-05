import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import MainNav from "../components/MainNav";
import useAppState from "../utils/useAppState";
import routeConfig from "./routeConfig";

function PrivateRoute({ children, route, ...rest }) {
  const { state } = useAppState();
  const { loggedIn, role } = state?.auth;
  return (
    <Route
      {...rest}
      render={() =>
        loggedIn ? (
          route.roles.includes(role) ? (
            children
          ) : (
            <Redirect to="/forbidden" />
          )
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}

function AppRoutes() {
  return (
    <Router>
      <MainNav />
      <Switch>
        {routeConfig.map((route) =>
          route.private ? (
            <PrivateRoute path={route.path} route={route} exact key={route.id}>
              <route.component />
            </PrivateRoute>
          ) : (
            <Route
              path={route.path}
              key={route.id}
              exact
              component={route.component}
            />
          )
        )}
      </Switch>
    </Router>
  );
}

export default AppRoutes;
