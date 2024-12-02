import React, { useState } from "react";
import authService from "../../services/authService";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "../../pages/Dashboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    userName: "",
    password: "",
    role: "customer",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { role, ...rest } = credentials;
      const data = await authService.login(role, rest);
      if (data.token) {
        localStorage.setItem("jwt_token", data.token);
        localStorage.setItem("user_role", role);
        navigate("/products");
        toast.success("User logged in successfully!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      }
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div
        className="card p-4 shadow-lg"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        
        <h3 className="text-center mb-4">Login</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="role" className="form-label">
              Role
            </label>
            <select
              id="role"
              name="role"
              className="form-select"
              onChange={handleChange}
              value={credentials.role}
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
              <option value="seller">Seller</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="userName" className="form-label">
              Username
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              className="form-control"
              placeholder="Enter your username"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              placeholder="Enter your password"
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 mt-3">
            Login
          </button>
        </form>
      </div>
    </div>
    
  );
};

export default Login;
