import React, { useContext } from "react";
import { Navigate, Route } from "react-router-dom";
import { AuthContext } from "./Auth";

const PrivateRoute = ({ children, ...rest }) => {
  const { currentUser } = useContext(AuthContext);
  return currentUser ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
