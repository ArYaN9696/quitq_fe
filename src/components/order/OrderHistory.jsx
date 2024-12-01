import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserOrders } from "../../store/orderSlice";
import { selectOrders, selectOrderStatus, selectOrderError } from "../../store/Selectors/orderSelectors";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";

const OrderHistory = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const status = useSelector(selectOrderStatus);
  const error = useSelector(selectOrderError);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  if (status === "loading") {
    return (
      <div className="container mt-5 text-center">
        <Spinner />
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="container mt-5">
        <ErrorMessage message={error || "Failed to load orders."} />
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Order History</h2>
      {orders.length === 0 ? (
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
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.orderId}>
                  <td>{order.orderId}</td>
                  <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                  <td>${order.totalAmount.toFixed(2)}</td>
                  <td>{order.status}</td>
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
