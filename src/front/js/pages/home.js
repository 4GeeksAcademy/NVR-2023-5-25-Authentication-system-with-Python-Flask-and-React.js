import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  return (
    <div className="container-fluid ms-3 mt-5">
      <div className="d-flex flex-column my-3 mx-3 home-wrapper">
        <div className="home-title m-1">
          Welcome back{store.user && store.user !== "" ? `, ${store.user}` : null}!
        </div>
        <div className="home-subtitle m-1">
          {store.user && store.user !== ""
            ? "You can now browse your content."
            : (
              <>
                Please{" "}
                <Link to="/login" className="Link Login-label">
                  login
                </Link>{" "}
                or{" "}
                <Link to="/register" className="Link Register-label">
                  register
                </Link>
                .
              </>
            )}
        </div>
      </div>
    </div>
  );
};
