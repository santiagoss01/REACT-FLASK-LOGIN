import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

export const Reset = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const useValidation = async (e) => {
    alert("An email has been sent!");
    navigate("/login");
  };

  return (
    <div className="login-bg container py-5 h-100">
      <form
        className="form-body"
        onSubmit={(e) => {
          useValidation(e);
        }}
      >
        <div className=" row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark text-white">
              <div className="card-body p-5 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                  <h3 className="fw-bold mb-2 text-uppercase">
                    Let's fix this
                  </h3>
                  <p className="text-white-50 mb-5">
                    Please enter your username.
                  </p>
                  <div className="form-outline form-white mb-4">
                    <input
                      value={email}
                      type="email"
                      id="typeEmailX"
                      onChange={(e) =>
                        setEmail(e.target.value.trim().toLowerCase())
                      }
                      className="form-control form-control-lg"
                    />
                    <label className="form-label">Email</label>
                  </div>
                  <p className="text-white-50 mb-5">
                    If this is a valid user email we will send you a reset link.
                  </p>

                  <button
                    className="btn btn-outline-light btn-lg px-5"
                    type="submit"
                  >
                    Send email to reset password
                  </button>
                  <div className="d-flex justify-content-center text-center mt-4 pt-1">
                    <a href="#!" className="text-white">
                      <i className="fab fa-facebook-f fa-lg"></i>
                    </a>
                    <a href="#!" className="text-white">
                      <i className="fab fa-twitter fa-lg mx-4 px-2"></i>
                    </a>
                    <a href="#!" className="text-white">
                      <i className="fab fa-google fa-lg"></i>
                    </a>
                  </div>
                  <div className="disclaimer text-center pt-4">
                    You will be redirected to Login after this.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
