import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

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

  return (
    <div
      ref={sidebarRef}
      className={`sidebar bg-dark text-white ${isOpen ? "d-block" : "d-none d-md-block"}`}
      style={{
        position: "absolute",
        top: "56px",
        left: "0",
        width: "250px",
        height: "calc(100vh - 56px)",
        paddingTop: "20px",
        zIndex: 1000,
        transition: "transform 0.3s ease-in-out",
        transform: isOpen ? "translateX(0)" : "translateX(-100%)",
      }}
    >
      <div className="p-3">
        <ul className="nav flex-column">
          {/* <li className="nav-item">
            <Link className="nav-link text-white" to="/dashboard">
              Dashboard
            </Link>
          </li> */}
          {auth.token ? (
            <>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/category-page">
                  Categories
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/products">
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/cart">
                  Cart
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/process-payment">
                  Payment
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/validate-payment">
                  Validate Payment
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/payments-by-order">
                  Payments By Order Id
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/order-history">
                  Order History
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/checkout">
                  Checkout
                </Link>
              </li>
              {(auth.userRole === "admin" || auth.userRole === "seller") && (
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/report">
                    Reports
                  </Link>
                </li>
              )}
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/register">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
