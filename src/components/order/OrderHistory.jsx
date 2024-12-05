import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserOrders } from "../../store/orderSlice";
import {
  selectOrders,
  selectOrderStatus,
  selectOrderError,
} from "../../store/Selectors/orderSelectors";
import { toast } from "react-toastify";

const OrderHistory = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders) || []; // Ensure it's always an array
  const status = useSelector(selectOrderStatus);
  const error = useSelector(selectOrderError);
  const userRole = localStorage.getItem("userRole");

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  useEffect(() => {
    if (status === "failed") {
      toast.error(error || "Failed to load orders.");
    }
  }, [status, error]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date) ? "Invalid Date" : date.toLocaleDateString();
  };

  const statusMapping = {
    1: "Pending",
    2: "Processing",
    3: "Shipped",
    4: "Delivered",
    5: "Cancelled",
  };

  if (status === "loading") {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const isOrdersEmpty = orders.length === 0;

  return (
    <div className="container mt-5">
      <h2>Order History</h2>
      {isOrdersEmpty ? (
        <p>No orders found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Status</th>
                {userRole === "seller" && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.orderId}>
                  <td>{order.orderId || "N/A"}</td>
                  <td>{formatDate(order.paymentDate)}</td>
                  <td>₹{order.totalAmount?.toFixed(2) || "0.00"}</td>
                  <td>{statusMapping[order.statusId] || "Unknown"}</td>
                  {userRole === "seller" && (
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() =>
                          toast.info(
                            "Please use the Update Order Status page to update status."
                          )
                        }
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
