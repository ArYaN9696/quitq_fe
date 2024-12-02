import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createOrder } from "../../store/orderSlice";
import { useNavigate } from "react-router-dom";
import { clearCartThunk } from "../../store/cartSlice";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart || { cartItems: [], total: 0 });
  const user = useSelector((state) => state.auth?.user);

  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");

  useEffect(() => {
    console.log("Cart Data: ", cart);
    console.log("User Data: ", user);
  }, [cart, user]);

  const handleOrderCreation = async () => {
    if (!shippingAddress) {
      alert("Please enter a valid shipping address.");
      return;
    }

    if (!user) {
      alert("Please log in to place an order.");
      return;
    }

    const orderDetails = {
      shippingAddress,
      paymentMethod,
      items: cart.cartItems,
      userId: user.id,
    };

    try {
      // Dispatch create order action
      await dispatch(createOrder(orderDetails)).unwrap();
      alert("Order placed successfully!");

      // Clear the cart after placing the order
      await dispatch(clearCartThunk()).unwrap();

      // Redirect to order success page
      navigate("/order-success");
    } catch (error) {
      console.error("Order creation failed:", error);
      alert("Failed to create order. Please try again.");
    }
  };

  const totalFormatted = cart.total
    ? cart.total.toLocaleString("en-IN", { style: "currency", currency: "INR" })
    : "₹0.00";

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Checkout</h1>

      {/* Shipping Address Form */}
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

          {/* Payment Method Selection */}
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

      {/* Order Summary */}
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="h5 mb-3">Order Summary</h2>

          {/* Displaying the cart items */}
          {cart.cartItems && cart.cartItems.length > 0 ? (
            <ul className="list-group mb-3">
              {cart.cartItems.map((item) => (
                <li
                  key={item.productId}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <strong>{item.productName}</strong> - {item.quantity} x ₹
                    {item.price}
                  </div>
                  <span className="badge bg-secondary">
                    ₹{(item.quantity * item.price).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No items in the cart</p>
          )}

          {/* Display total price in INR */}
          <p className="h5 text-end mb-0">
            <strong>Total:</strong> {totalFormatted}
          </p>
        </div>
      </div>

      {/* Place Order Button */}
      <div className="text-center">
        <button
          className="btn btn-primary btn-lg"
          onClick={handleOrderCreation}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
