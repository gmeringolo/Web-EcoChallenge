import React from "react";
import { Redirect, Route } from "react-router-dom";
import { getItem } from "../utils/localStorage";

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const isAuthenticated = getItem('token') !== null;
  
  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}

export default ProtectedRoute;