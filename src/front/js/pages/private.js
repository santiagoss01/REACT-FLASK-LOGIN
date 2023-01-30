import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogoutButton } from "../component/Loggout.js";
import { Context } from "../store/appContext";
import "../../styles/private.css";
import { AiOutlineFrown } from "react-icons/ai";
import { Spinner } from "../component/Spinner.jsx";

export const Private = () => {
  const { store, actions } = useContext(Context);
  const [userData, setUserData] = useState({});
  const logged = store.logged;
  const navigate = useNavigate();
  const validateduser = actions.userValidation();
  const [loading, setLoading] = useState(false);

  const useValidation = async () => {
    const user = await validateduser;
    setUserData(user);
  };

  useEffect(() => {
    setLoading(true);
    store.token &&
      store.token != "" &&
      store.token != undefined &&
      useValidation();
    setLoading(false);
  }, [store.token]);

  return loading ? (
    <Spinner />
  ) : (
    <div>
      {store.token && store.token != "" && store.token != undefined ? (
        <div className="private-bg container py-5 h-100">
          <div className="d-flex justify-content-end">
            <LogoutButton />
          </div>

          <div className=" row-private d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card bg-dark text-white">
                <div className="card-body p-5 text-center">
                  <div className="mb-md-5 mt-md-4 pb-5">
                    <h2 className="fw-bold mb-2 text-uppercase">
                      Private Area
                    </h2>
                    <h4 className="text-white-50 mb-5">
                      Welcome back! we missed you.
                    </h4>
                    <p>Here are you new messages:</p>
                    <div className="d-flex justify-content-center text-center mt-4 pt-1">
                      <a href="#!" className="text-white">
                        <i className="fa-solid fa-message"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className=" row d-flex gp-5 justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark text-white">
              <div className="card-body p-5 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                  <h4 className="fw-bold mb-2 text-uppercase">
                    User name or password invalid
                  </h4>
                  <AiOutlineFrown className="icon" />
                  <h4 className="text-white-50 pt-5 mb-5">Want to join us?</h4>

                  <div className="d-flex justify-content-evenly align-items-center">
                    <button
                      className="btn btn-outline-light btn-lg px-5"
                      onClick={(e) => {
                        navigate("/login");
                      }}
                    >
                      login
                    </button>
                    or
                    <button
                      className="btn btn-outline-light btn-lg px-5"
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
      )}
    </div>
  );
};
