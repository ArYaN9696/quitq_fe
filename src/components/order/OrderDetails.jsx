import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchOrderById } from "../../store/orderSlice";


const OrderDetails = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const { orderDetails, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrderById(orderId));
  }, [dispatch, orderId]);

  if (loading) return <div className="container mt-5 text-center"><div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div></div>;
  if (error) return <div className="container mt-5 text-center alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white text-center">
              <h2>Order Details</h2>
            </div>
            <div className="card-body">
              {orderDetails ? (
                <div>
                  <h4 className="mb-3">Order ID: <span className="text-muted">{orderDetails.orderId}</span></h4>
                  <p className="mb-2"><strong>Status:</strong> {orderDetails.status}</p>
                  <p className="mb-2"><strong>Total Amount:</strong> ${orderDetails.totalAmount}</p>
                  <p className="mb-4"><strong>Shipping Address:</strong> {orderDetails.shippingAddress}</p>

                  <h5 className="mb-3">Order Items:</h5>
                  <ul className="list-group">
                    {orderDetails.orderDetails.map((item) => (
                      <li key={item.productId} className="list-group-item">
                        <div className="d-flex justify-content-between">
                          <div>
                            <p className="mb-1"><strong>Product:</strong> {item.product.productName}</p>
                            <p className="mb-1"><strong>Quantity:</strong> {item.quantity}</p>
                          </div>
                          <div className="text-end">
                            <p className="mb-1"><strong>Price:</strong> ${item.price}</p>
                            <p className="mb-1"><strong>Total:</strong> ${item.total}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="text-center">No order details found.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
