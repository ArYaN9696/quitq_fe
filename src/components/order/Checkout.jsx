import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createOrder } from "../../store/orderSlice";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get cart state, providing a fallback empty object if it's undefined
  const cart = useSelector((state) => state.cart || { items: [], total: 0 });

  // Get user state, providing fallback empty object if undefined
  const user = useSelector((state) => state.auth?.user);

  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");

  const handleOrderCreation = async () => {
    if (!shippingAddress) {
      alert("Please enter a valid shipping address.");
      return;
    }

    // Ensure the user is logged in before allowing order creation
    if (!user) {
      alert("Please log in to place an order.");
      return;
    }

    const orderDetails = {
      shippingAddress,
      paymentMethod,
      items: cart.items,
      userId: user.id, // Assuming user has an `id` field
    };

    try {
      await dispatch(createOrder(orderDetails)).unwrap();
      alert("Order placed successfully!");
      navigate("/order-success");
    } catch (error) {
      console.error("Order creation failed:", error);
      alert("Failed to create order. Please try again.");
    }
  };

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
            <option value="Credit Card">Credit Card</option>
            <option value="PayPal">PayPal</option>
            <option value="Cash on Delivery">Cash on Delivery</option>
          </select>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <h2 className="h5 mb-3">Order Summary</h2>
          {/* Check if cart.items is an array and has elements */}
          {cart.items && cart.items.length > 0 ? (
            <ul className="list-group mb-3">
              {cart.items.map((item) => (
                <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{item.name}</strong> - {item.quantity} x ₹{item.price}
                  </div>
                  <span className="badge bg-secondary">₹{(item.quantity * item.price).toFixed(2)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No items in the cart</p>
          )}
          {/* Display total price in INR */}
          <p className="h5 text-end mb-0">
            <strong>Total:</strong> ₹{cart.total.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="text-center">
        <button className="btn btn-primary btn-lg" onClick={handleOrderCreation}>
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
