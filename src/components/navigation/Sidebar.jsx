import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "../cust_CSS/sidebar.css"; // Make sure to import the custom CSS for sidebar

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { auth } = useAuth();
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);
  const isButtonClicked = useRef(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        buttonRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        if (!isButtonClicked.current) {
          toggleSidebar(false);
        }
      }
      isButtonClicked.current = false;
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleSidebar]);

  const handleButtonClick = () => {
    isButtonClicked.current = true;
    toggleSidebar(!isOpen);
  };

  const renderLinks = () => {
    if (!auth.token) {
      return (
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
      );
    }

    const links = [];
    if (["admin", "seller", "customer"].includes(auth.userRole)) {
      links.push(
        <li className="nav-item" key="categories">
          <Link className="nav-link" to="/category-page">
            Categories
          </Link>
        </li>
      );
    }

    if (["seller", "admin"].includes(auth.userRole)) {
      links.push(
        <li className="nav-item" key="products">
          <Link className="nav-link" to="/products">
            Products
          </Link>
        </li>
      );
      links.push(
        <li className="nav-item" key="update-order-status">
          <Link className="nav-link" to="/update-order-status">
            Update Order Status
          </Link>
        </li>
      );
    }

    if (auth.userRole === "customer") {
      links.push(
        <li className="nav-item" key="cart">
          <Link className="nav-link" to="/cart">
            Cart
          </Link>
        </li>
      );
    }

    if (["admin", "customer"].includes(auth.userRole)) {
      links.push(
        <li className="nav-item" key="order-history">
          <Link className="nav-link" to="/order-history">
            Order History
          </Link>
        </li>
      );
    }

    if (["seller", "admin"].includes(auth.userRole)) {
      links.push(
        <li className="nav-item" key="validate-payment">
          <Link className="nav-link" to="/validate-payment">
            Validate Payment
          </Link>
        </li>
      );
      links.push(
        <li className="nav-item" key="payments-by-order">
          <Link className="nav-link" to="/payments-by-order">
            Payments By Order ID
          </Link>
        </li>
      );
    }

    if (["admin", "seller"].includes(auth.userRole)) {
      links.push(
        <li className="nav-item" key="report">
          <Link className="nav-link" to="/report">
            Reports
          </Link>
        </li>
      );
    }

    if (["admin", "seller"].includes(auth.userRole)) {
      links.push(
        <li className="nav-item" key="addprod">
          <Link className="nav-link" to="/add-product">
            Add Product
          </Link>
        </li>
      );
    }

    if (["admin", "seller"].includes(auth.userRole)) {
      links.push(
        <li className="nav-item" key="editprod">
          <Link className="nav-link" to="/edit-product/:productId">
            Edit Product
          </Link>
        </li>
      );
    }

    if (["admin", "seller"].includes(auth.userRole)) {
      links.push(
        <li className="nav-item" key="idprod">
          <Link className="nav-link" to="/product/:productId">
            View Product
          </Link>
        </li>
      );
    }

    return links;
  };

  return (
    <div
      ref={sidebarRef}
      className={`sidebar ${isOpen ? "d-block" : "d-none d-md-block"}`}
    >
      <div className="p-3">
        <ul className="nav flex-column">
          {/* Dynamically rendered links */}
          {renderLinks()}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
