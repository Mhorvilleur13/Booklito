import React, { useContext, useState, useEffect } from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { AuthContext } from "./Auth";
import { onAuthStateChanged, updateCurrentUser } from "firebase/auth";
import { auth } from "./firebase-config";
import { userEmailState as userEmailAtom, userEmailState } from "./atom";

const PrivateRoute = ({ children }) => {
  //const { currentUser } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState(); // <-- initially undefined

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user)); // <-- null or user object
    return unsub;
  }, []);
  if (currentUser === undefined) return null;
  return currentUser ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
