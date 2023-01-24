import React, { useContext } from "react";
import { useRecoilState, atom, useRecoilValue } from "recoil";
import "../../index.css";
import {
  registerEmailState as registerEmailAtom,
  registerPasswordState as registerPasswordAtom,
  loginEmailState as loginEmailAtom,
  loginPasswordState as loginPasswordAtom,
  loginErrorState as loginErrorAtom,
  confirmationPasswordState as confirmationPasswordAtom,
} from "../../atom";
import { auth } from "../../firebase-config";
import { AuthContext } from "../../Auth";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ logout, login }) => {
  const [loginEmail, setLoginEmail] = useRecoilState(loginEmailAtom);
  const [loginPassword, setLoginPassword] = useRecoilState(loginPasswordAtom);
  const [loginError] = useRecoilValue(loginErrorAtom);
  const { handleSubmit } = useForm();
  const onSubmit = (data, e) => {
    login();
    e.target.reset();
  };
  return (
    <div className="login-container">
      <div className="row login-page mx-2 my-1">
        <div className="col-10  col-sm-8 col-md-6 col-lg-4 mx-auto mb-1 border login-div">
          <form onSubmit={handleSubmit(onSubmit)} className="login form-group">
            <h3 className="mt-3">Login</h3>
            <input
              placeholder="Email..."
              onChange={(event) => setLoginEmail(event.target.value)}
            />
            <input
              className="mt-3"
              placeholder="Password..."
              type="password"
              onChange={(event) => setLoginPassword(event.target.value)}
            />
            {loginError && <p style={{ color: "red" }}>Failed to Login</p>}
            <button className="mt-3 mb-2 btn btn-primary" type="submit">
              Login
            </button>
            <p>
              Don't have an account? <Link to="/">Sign up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
