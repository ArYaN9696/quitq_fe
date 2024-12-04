import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { ToastContainer } from "react-toastify";
import "../cust_CSS/navbar.css";

const Navbar = ({ toggleSidebar }) => {
  const { auth, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchTerm(query);

    // If search is cleared, reset the URL to show all products
    if (query === "") {
      navigate("/products");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <button className="btn sidebar-toggle" onClick={toggleSidebar}>
        ☰
      </button>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/products">
          QuitQ
        </Link>

        <form className="search-form" onSubmit={handleSearch}>
          <input
            className="form-control search-input"
            type="search"
            placeholder="Search products"
            value={searchTerm}
            onChange={handleSearchChange}
            aria-label="Search"
          />
          <button className="btn search-btn" type="submit">
            Search
          </button>
        </form>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link active text-white" to="/products">
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
