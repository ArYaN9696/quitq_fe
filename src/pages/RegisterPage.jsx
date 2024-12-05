import React from 'react';
import Register from '../components/authentication/Register';

const RegisterPage = () => {
  return (
    <div className="register-page"
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
      <Register />
    </div>
  );
};

export default RegisterPage;
