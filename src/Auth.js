import React, { useEffect, useState } from "react";
import { auth } from "./firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { useRecoilState } from "recoil";
import { userEmailState as userEmailAtom } from "./atom";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userEmail, setUserEmail] = useRecoilState(userEmailAtom);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setUserEmail(user?.email);
    });
  }, []);
  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
