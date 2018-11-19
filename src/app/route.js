import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "../login";
import Register from "../register";
import Feed from "../feed";

const RoutePrivate = ({ component: Component, isLoggedin, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isLoggedin ? (
        <Component {...props} {...rest} />
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      )
    }
  />
);

const RouteProtected = ({ component: Component, isLoggedin, ...rest }) => (
  <Route
    render={props =>
      !isLoggedin ? (
        <Component {...props} {...rest} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

export default function Routing(props) {
  const { isLoggedin, onLogin, userid } = props;
  return (
    <Switch>
      <RouteProtected
        isLoggedin={isLoggedin}
        onLogin={onLogin}
        path="/login"
        component={Login}
      />
      <RouteProtected
        isLoggedin={isLoggedin}
        path="/register"
        component={Register}
      />
      <Route
        path="/"
        render={props => (
          <Feed userid={userid} isLoggedin={isLoggedin} {...props} />
        )}
      />
    </Switch>
  );
}
