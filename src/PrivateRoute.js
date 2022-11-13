import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { AuthContext } from "./Auth";
import Booklet from "./Components/Booklet/Booklet";

const PrivateRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  return currentUser ? children : <Navigate to="/" />;
};

export default PrivateRoute;
