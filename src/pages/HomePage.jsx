import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundImage: "url('/images/top-view-desk-with-black-friday-gifts.jpg')", 
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh", 
        width: "100vw",  
        position: "absolute", 
        top: 0,
        left: 0,
      }}
    >
      <div
        className="text-center p-4 card shadow-lg bg-light"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h1 className="mb-3 center"> QuitQ </h1>
        <p className="lead mb-4">Please choose an option below:</p>
        <div className="d-flex justify-content-center gap-3">
          <button className="btn btn-primary btn-lg" onClick={handleLogin}>
            Login
          </button>
          <button className="btn btn-secondary btn-lg" onClick={handleRegister}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
