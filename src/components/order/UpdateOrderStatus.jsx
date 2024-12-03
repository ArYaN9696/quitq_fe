import React, { useState } from "react";
import { updateOrderStatus } from "../../services/orderService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateOrderStatus = () => {
  const [orderId, setOrderId] = useState("");
  const [statusId, setStatusId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!orderId || !statusId) {
      toast.error("Both Order ID and Status ID are required!", {
        position: "top-right",
      });
      return;
    }

    try {
      // Send request to update order status
      const response = await updateOrderStatus(parseInt(orderId, 10), parseInt(statusId, 10));
      toast.success(response.message || "Order status updated successfully!", {
        position: "top-right",
      });

      // Clear form fields after successful submission
      setOrderId("");
      setStatusId("");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to update order status. Please try again.";
      toast.error(errorMessage, {
        position: "top-right",
      });
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Update Order Status</h2>
      <form
        onSubmit={handleSubmit}
        className="card p-4 shadow-lg"
        style={{ maxWidth: "500px", margin: "0 auto" }}
      >
        <div className="mb-3">
          <label htmlFor="orderId" className="form-label">
            Order ID
          </label>
          <input
            type="number"
            id="orderId"
            className="form-control"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="Enter the Order ID"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="statusId" className="form-label">
            Status ID
          </label>
          <select
            id="statusId"
            className="form-select"
            value={statusId}
            onChange={(e) => setStatusId(e.target.value)}
            required
          >
            <option value="">Select Status</option>
            <option value="1">Pending</option>
            <option value="2">Processing</option>
            <option value="3">Shipped</option>
            <option value="4">Delivered</option>
            <option value="5">Cancelled</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Update Status
        </button>
      </form>
    </div>
  );
};

export default UpdateOrderStatus;
