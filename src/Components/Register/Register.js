import React, { useContext } from "react";
import { useRecoilState, atom, useRecoilValue } from "recoil";
import "../../index.css";
import {
  registerEmailState as registerEmailAtom,
  registerPasswordState as registerPasswordAtom,
  loginEmailState as loginEmailAtom,
  loginPasswordState as loginPasswordAtom,
  confirmationPasswordState as confirmationPasswordAtom,
} from "../../atom";
import { auth } from "../../firebase-config";
import { AuthContext } from "../../Auth";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Register = ({ register, passwordError }) => {
  const [registerEmail, setRegisterEmail] = useRecoilState(registerEmailAtom);
  const [registerPassword, setRegisterPassword] =
    useRecoilState(registerPasswordAtom);
  const [confirmPassword, setConfirmPassword] = useRecoilState(
    confirmationPasswordAtom
  );
  const { currentUser } = useContext(AuthContext);
  const { handleSubmit } = useForm();

  const onRegisterSubmit = (data, e) => {
    register();
    e.target.reset();
  };
  return (
    <div className="register-container">
      <div className="row login-page mx-2 my-1">
        <div className="col-10 col-sm-8 col-md-6 col-lg-4 mt-5 mx-auto register-div border">
          <form
            className="login form-group"
            onSubmit={handleSubmit(onRegisterSubmit)}
          >
            <h3 className="mt-3">Sign Up</h3>
            {passwordError && (
              <div className="alert alert-danger" role="alert">
                {" "}
                Passwords don't match{" "}
              </div>
            )}
            <input
              placeholder="Email..."
              onChange={(event) => setRegisterEmail(event.target.value)}
            />
            <input
              className="mt-3"
              placeholder="Password..."
              type="password"
              onChange={(event) => setRegisterPassword(event.target.value)}
            />
            <input
              className="mt-3"
              placeholder="Confirm Password.... "
              type="password"
              onChange={(event) => setConfirmPassword(event.target.value)}
            ></input>
            <button className="mt-3 mb-2 btn btn-primary" type="submit">
              Create User
            </button>
            <p>
              Already a user? <Link to="/">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
