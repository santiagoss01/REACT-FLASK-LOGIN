import React from "react";
import { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import "../../styles/login.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [passWord, setpassWord] = useState("");
  const navigate = useNavigate();

  const logged = store.logged;

  const handleSubmit = (e) => {
    e.preventDefault();
    actions.login(email, passWord);
    navigate("/private");
  };
  useEffect(() => {
    store.token && store.token != "" && store.token != undefined;
  });

  return (
    <div className="login-bg container py-5 h-100">
      <form
        className="form-body"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className=" row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark text-white">
              <div className="card-body p-5 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <p className="text-white-50 mb-5">
                    Please enter your login and password!
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

                  <div className="form-outline form-white mb-4">
                    <input
                      type="password"
                      id="typePasswordX"
                      value={passWord}
                      onChange={(e) => setpassWord(e.target.value)}
                      className="form-control form-control-lg"
                    />
                    <label className="form-label">Password</label>
                  </div>

                  <p className="small mb-5 pb-lg-2">
                    <Link className="text-white-50" to={"/resetpass"}>
                      Forgot password?
                    </Link>
                  </p>

                  <button
                    className="btn btn-outline-light btn-lg px-5"
                    type="submit"
                  >
                    Login
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
                </div>

                <div>
                  <p className="mb-0">Don't have an account? </p>
                  <button
                    className="btn btn-outline-light btn-lg px-5"
                    type="btn"
                    onClick={(e) => {
                      navigate("/signup");
                    }}
                  >
                    Signup
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
