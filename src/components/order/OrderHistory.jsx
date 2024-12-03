import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserOrders } from "../../store/orderSlice";
import {
  selectOrders,
  selectOrderStatus,
  selectOrderError,
} from "../../store/Selectors/orderSelectors";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OrderHistory = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const status = useSelector(selectOrderStatus);
  const error = useSelector(selectOrderError);

  // Assuming user role is stored in localStorage
  const userRole = localStorage.getItem("userRole"); // can be "user" or "seller"

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  useEffect(() => {
    if (status === "failed") {
      toast.error(error || "Failed to load orders.");
    }
  }, [status, error]);

  if (status === "loading") {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const isOrdersEmpty = !Array.isArray(orders) || orders.length === 0;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) {
      return "Invalid Date";
    }
    return date.toLocaleDateString();
  };

  const handleStatusUpdate = (orderId) => {
    // Call a function to update the order status (for sellers)
    if (userRole === "seller") {
      // Implement the update status logic here
    } else {
      toast.error("You are not authorized to update the status.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Order History</h2>
      {isOrdersEmpty ? (
        <p className="text-center">No orders found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover table-sm">
            <thead className="table-dark">
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Total Amount</th>
                <th>Status</th>
                {userRole === "seller" && <th>Actions</th>}{" "}
                {/* Only show action button for seller */}
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.orderId}>
                  <td>{order.orderId}</td>
                  <td>{formatDate(order.orderDate)}</td>{" "}
                  <td>₹{order.totalAmount.toFixed(2)}</td>
                  <td>{order.status}</td>
                  {userRole === "seller" && (
                    <td>
                      {/* Render button to update status for sellers only */}
                      <button
                        className="btn btn-primary"
                        onClick={() => handleStatusUpdate(order.orderId)}
                      >
                        Update Status
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
