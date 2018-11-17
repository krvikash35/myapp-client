import React from "react";
import { Redirect, Route } from "react-router-dom";

const RoutePrivate = ({ component: Component, isLoggedin, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isLoggedin ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      )
    }
  />
);

export default RoutePrivate;
