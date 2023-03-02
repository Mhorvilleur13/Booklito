import React, { useContext, useState, useEffect } from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { AuthContext } from "./Auth";
import { onAuthStateChanged, updateCurrentUser } from "firebase/auth";
import { auth } from "./firebase-config";
import { userEmailState as userEmailAtom, userEmailState } from "./atom";

const PrivateRoute = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user));
    return unsub;
  }, []);
  if (currentUser === undefined) return null;
  return currentUser ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
