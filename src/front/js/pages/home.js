import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  return (
    <div className=" row d-flex gp-5 justify-content-center align-items-center h-100">
      <div className="row-private col-12 col-md-8 col-lg-6 col-xl-5">
        <div className="card bg-dark text-white">
          <div className="card-body p-5 text-center">
            <div className="mb-md-5 mt-md-4 pb-5">
              <h2 className="fw-bold mb-2 text-uppercase">Welcome!</h2>
              <h4 className="text-white-50 mb-5">
                If you are alredy part of the family.
              </h4>
              <div className="d-flex flex-column justify-content-between align-items-center">
                <button
                  className="btn btn-outline-light mb-3 btn-lg px-5"
                  onClick={(e) => {
                    navigate("/login");
                  }}
                >
                  login
                </button>
                else
                <button
                  className="btn btn-outline-light mt-3 btn-lg px-5"
                  onClick={(e) => {
                    navigate("/signup");
                  }}
                >
                  Sign up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
