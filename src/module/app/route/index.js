import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "../../login";
import Register from "../../register";
import RoutePrivate from "./private";

export default function Routing(props) {
  const { isLoggedin } = props;
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <RoutePrivate
        isLoggedin={isLoggedin}
        path="/dashboard"
        component={Login}
      />
    </Switch>
  );
}
