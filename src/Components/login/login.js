import React from "react";
import { useRecoilState, atom, useRecoilValue } from "recoil";
import "../../index.css";
import {
  registerEmailState as registerEmailAtom,
  registerPasswordState as registerPasswordAtom,
  loginEmailState as loginEmailAtom,
  loginPasswordState as loginPasswordAtom,
} from "../../atom";

const Login = ({ register }) => {
  const [registerEmail, setRegisterEmail] = useRecoilState(registerEmailAtom);
  const [registerPassword, setRegisterPassword] =
    useRecoilState(registerPasswordAtom);
  const [loginEmail, setLoginEmail] = useRecoilState(loginEmailAtom);
  const [loginPassword, setLoginPassword] = useRecoilState(loginPasswordAtom);
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
        <button>Login</button>
      </div>
    </div>
  );
};

export default Login;
