import React from 'react';
import Login from '../components/authentication/Login';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import '../components/cust_CSS/login.css';

const LoginPage = () => {
  return (
    <div className="login-page">
      <Login />
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
