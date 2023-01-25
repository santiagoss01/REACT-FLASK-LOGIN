import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/logout.css";

export const LogoutButton = () => {
  const { store, actions } = useContext(Context);

  const navigate = useNavigate();

  const handleClick = (e) => {
    actions.UserLogout();
    navigate("/login");
  };

  return (
    <button
      className="btn btn-outline-dark btn-lg px-5"
      onClick={(e) => {
        handleClick(e);
      }}
      type="btn"
    >
      Logout
    </button>
  );
};
