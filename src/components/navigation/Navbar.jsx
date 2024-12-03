import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { ToastContainer } from "react-toastify";

const Navbar = ({ toggleSidebar }) => {
  const { auth, logout } = useAuth();

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark"
      style={{ position: "fixed", top: 0, width: "100%", zIndex: 999 }}
    >
      <button
        className="btn btn-outline-light"
        onClick={toggleSidebar}
        style={{
          fontSize: "24px",
          border: "none",
          background: "transparent",
          padding: "0",
          marginRight: "10px",
        }}
      >
        ☰
      </button>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/products">
          QuitQ
        </Link>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link active" to="/products">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart">
              🛒
              </Link>
            </li>
            {auth.token ? (
              <>
                <li className="nav-item">
                  <span className="nav-link text-white">{auth.userRole}</span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-link nav-link" onClick={logout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      <ToastContainer />
    </nav>
  );
};

export default Navbar;
