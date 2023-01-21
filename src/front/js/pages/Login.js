import React from "react";
import { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [passWord, setpassWord] = useState("");
  const navigate = useNavigate;
  const token = sessionStorage.getItem("token");

  const handleClick = () => {
    actions.login(email, passWord);
  };

  return (
    <div className="flex text-center">
      <h1>Login</h1>
      {token && token != "" && token != unudefined ? (
        "Your are already logged in with this token" + token
      ) : (
        <div>
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(evt) => setEmail(evt.target.value)}
          />
          <input
            type="passWrod"
            value={passWord}
            placeholder="password"
            onChange={(evt) => setpassWord(evt.target.value)}
          />
          <div className="alert alert-info">
            {store.message ||
              "Loading message from the backend (make sure your python backend is running)..."}
          </div>

          <button onClick={handleClick}>Login</button>
        </div>
      )}
    </div>
  );
};
