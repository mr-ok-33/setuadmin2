import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <img src="/assets/setu.png" alt="Setu Logo" className="home-logo" />
      <h1 className="home-title">Welcome to Setu Admin Dashboard</h1>
      <p className="home-subtitle">
        Manage your data efficiently and effortlessly.
      </p>
    </div>
  );
};

export default Home;
