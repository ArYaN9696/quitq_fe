import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createOrder } from "../../store/orderSlice";
import { useNavigate } from "react-router-dom";
import { clearCartThunk } from "../../store/cartSlice";
import useAuth from "../../hooks/useAuth";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { auth } = useAuth();
  const cart = useSelector(
    (state) => state.cart || { cartItems: [], total: 0 }
  );

  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");

  useEffect(() => {
    console.log("Cart Data: ", cart);
    console.log("Auth Data: ", auth);
  }, [cart, auth]);

  const handleOrderCreation = async () => {
    if (!shippingAddress) {
      alert("Please enter a valid shipping address.");
      return;
    }

    if (!auth || !auth.token) {
      alert("Please log in to place an order.");
      return;
    }

    const totalAmount = cart.cartItems.reduce(
      (total, item) => total + item.quantity * (item.price || 0),
      0
    );

    const orderDetails = {
      shippingAddress,
      paymentMethod,
      items: cart.cartItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        total: item.quantity * item.price,
      })),
    };

    try {
      console.log("Order Payload:", orderDetails);
      const orderResponse = await dispatch(createOrder(orderDetails)).unwrap();
      console.log("Order Created Successfully:", orderResponse);

      await dispatch(clearCartThunk()).unwrap();

      // Redirect to the Process Payment page with orderId, paymentMethod, and amount
      navigate(
        `/process-payment?orderId=${orderResponse.orderId}&paymentMethod=${paymentMethod}&amount=${totalAmount}`
      );
    } catch (error) {
      console.error("Order creation failed:", error);
      alert(error.message || "Failed to create order. Please try again.");
    }
  };

  const totalAmount = cart.cartItems.reduce(
    (total, item) => total + item.quantity * (item.price || 0),
    0
  );

  const totalFormatted = totalAmount.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
  });

  const paymentOptions = [
    "Credit Card",
    "Debit Card",
    "Net Banking",
    "UPI",
    "Cash on Delivery",
  ];

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Checkout</h1>

      <div className="card mb-4">
        <div className="card-body">
          <h2 className="h5 mb-3">Shipping Address</h2>
          <textarea
            className="form-control mb-4"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            placeholder="Enter your shipping address"
            rows="3"
          />

          <h2 className="h5 mb-3">Payment Method</h2>
          <select
            className="form-select mb-4"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            {paymentOptions.map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <h2 className="h5 mb-3">Order Summary</h2>

          {cart.cartItems && cart.cartItems.length > 0 ? (
            <ul className="list-group mb-3">
              {cart.cartItems.map((item) => (
                <li
                  key={item.productId}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <strong>{item.productName || "Unnamed Product"}</strong>
                    <br />
                    <small>
                      ₹{item.price?.toFixed(2) || "0.00"} x {item.quantity}
                    </small>
                  </div>
                  <span className="badge bg-primary rounded-pill">
                    ₹{(item.quantity * item.price || 0).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No items in cart.</p>
          )}

          <div className="d-flex justify-content-between">
            <strong>Total:</strong>
            <span>{totalFormatted}</span>
          </div>

          <div className="d-grid gap-2 mt-4">
            <button className="btn btn-primary" onClick={handleOrderCreation}>
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
