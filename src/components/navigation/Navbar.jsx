import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { ToastContainer } from "react-toastify";

const Navbar = ({ toggleSidebar }) => {
  const { auth, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm)}`); // Navigate with search query
    }
  };

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
        🧾
      </button>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/products">
          QuitQ
        </Link>

        <form className="d-flex me-auto" onSubmit={handleSearch}>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search products"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search"
          />
          <button className="btn btn-outline-light" type="submit">
            Search
          </button>
        </form>

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
