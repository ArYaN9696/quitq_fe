import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateOrderStatus } from "../../store/orderSlice";
import { toast } from "react-toastify";

const UpdateOrderStatus = () => {
  const [orderId, setOrderId] = useState("");
  const [statusId, setStatusId] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!orderId || !statusId) {
      toast.error("Order ID and Status ID are required!");
      return;
    }

    try {
      await dispatch(
        updateOrderStatus({
          orderId: parseInt(orderId),
          statusId: parseInt(statusId),
        })
      );
      toast.success("Order status updated successfully!");
      setOrderId("");
      setStatusId("");
    } catch (error) {
      toast.error("Failed to update order status.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Update Order Status</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Order ID</label>
          <input
            type="number"
            className="form-control"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="Enter Order ID"
          />
        </div>
        <div className="mb-3">
          <label>Status</label>
          <select
            className="form-select"
            value={statusId}
            onChange={(e) => setStatusId(e.target.value)}
          >
            <option value="">Select Status</option>
            <option value="1">Pending</option>
            <option value="2">Processing</option>
            <option value="3">Shipped</option>
            <option value="4">Delivered</option>
            <option value="5">Cancelled</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Update Status
        </button>
      </form>
    </div>
  );
};

export default UpdateOrderStatus;
