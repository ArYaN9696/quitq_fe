import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { ToastContainer } from "react-toastify";

const Navbar = ({ toggleSidebar }) => {
  const { auth, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query === "") {
      navigate("/products"); // Reset to show all products when search is cleared
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
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

        {/* Search Bar */}
        <form className="d-flex ms-auto" onSubmit={handleSearchSubmit}>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button
            className="btn btn-outline-light"
            type="submit"
            style={{ marginRight: "10px" }}
          >
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
