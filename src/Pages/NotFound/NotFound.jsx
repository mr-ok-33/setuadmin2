import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <p className="not-found-para">
        Oops! The page you are looking for does not exist.
      </p>
      <Link to="/" className="home-link">
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
