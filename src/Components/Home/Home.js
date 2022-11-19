import React from "react";
import { Link, Outlet } from "react-router-dom";
import "../../index.css";

const Home = () => {
  return (
    <div className="components container">
      <div className="row w-50  mx-auto text-center mt-4 componentsNav">
        <div className="col mx-auto">
          <Link to="/Home/form" className="btn btn-primary">
            Form
          </Link>
        </div>
        <div className="col">
          <Link to="/Home/booklets" className="btn btn-primary">
            Booklets
          </Link>
        </div>
        <div className="col mx-auto">
          <Link to="/Home/about" className="btn  btn-primary">
            About
          </Link>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Home;
