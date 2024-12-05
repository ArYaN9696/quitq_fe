import React from 'react';
import Login from '../components/authentication/Login';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import '../components/cust_CSS/login.css';

const LoginPage = () => {
  return (
    <div className="login-page"
      style={{
        backgroundImage: "url('/images/freepik-export-202412020605224H8G.jpeg')", 
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh", 
        width: "100vw",  
        position: "absolute", 
        top: 0,
        left: 0,
      }}>
      <Login />
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
