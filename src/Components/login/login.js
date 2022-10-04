import React from "react";
import { useRecoilState, atom, useRecoilValue } from "recoil";
import "../../index.css";
import {
  registerEmailState as registerEmailAtom,
  registerPasswordState as registerPasswordAtom,
  loginEmailState as loginEmailAtom,
  loginPasswordState as loginPasswordAtom,
  userState as userAtom,
} from "../../atom";
import { auth } from "../../firebase-config";

const Login = ({ register, logout, user, login }) => {
  const [registerEmail, setRegisterEmail] = useRecoilState(registerEmailAtom);
  const [registerPassword, setRegisterPassword] =
    useRecoilState(registerPasswordAtom);
  const [loginEmail, setLoginEmail] = useRecoilState(loginEmailAtom);
  const [loginPassword, setLoginPassword] = useRecoilState(loginPasswordAtom);
  //const user = useRecoilValue(userAtom);
  return (
    <div className="row">
      <div className="login mt-5 ">
        <h3>Register User</h3>
        <input
          placeholder="Email..."
          onChange={(event) => setRegisterEmail(event.target.value)}
        />
        <input
          placeholder="Password..."
          onChange={(event) => setRegisterPassword(event.target.value)}
        />
        <button onClick={register}>Create User</button>
      </div>
      <div className="login mt-5 ">
        <h3>Login</h3>
        <input
          placeholder="Email..."
          onChange={(event) => setLoginEmail(event.target.value)}
        />
        <input
          placeholder="Password..."
          onChange={(event) => setLoginPassword(event.target.value)}
        />
        <button onClick={login}>Login</button>
      </div>
      <div className="login mt-4">
        <h4>User logged in:</h4>
        {user?.email}
        <button className="mt-4" onClick={logout}>
          Sign out
        </button>
      </div>
    </div>
  );
};

export default Login;
