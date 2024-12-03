import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { processPayment } from "../../services/paymentService";

const ProcessPayment = () => {
  const [searchParams] = useSearchParams();
  const [paymentData, setPaymentData] = useState({
    orderId: "",
    paymentMethod: "",
    amount: "",
  });

  useEffect(() => {
    const orderId = searchParams.get("orderId");
    const paymentMethod = searchParams.get("paymentMethod");

    if (orderId) {
      setPaymentData((prev) => ({
        ...prev,
        orderId,
        paymentMethod: paymentMethod || "",
      }));
    }
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData({ ...paymentData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedData = {
      orderId: parseInt(paymentData.orderId, 10),
      paymentMethod: paymentData.paymentMethod,
      amount: parseFloat(paymentData.amount),
    };

    try {
      console.log("Submitting payment:", formattedData);
      const response = await processPayment(formattedData);
      alert(`Payment processed successfully: ${response.message}`);
    } catch (error) {
      console.error("Error processing payment:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to process payment. Please try again.");
    }
  };

  const paymentOptions = [
    "Credit Card",
    "Debit Card",
    "Net Banking",
    "UPI",
    "Cash on Delivery",
  ];

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <h2>Process Payment</h2>
      <div className="mb-3">
        <label>Order ID</label>
        <input
          type="number"
          name="orderId"
          className="form-control"
          value={paymentData.orderId}
          onChange={handleChange}
          required
          readOnly
        />
      </div>
      <div className="mb-3">
        <label>Payment Method</label>
        <select
          name="paymentMethod"
          className="form-control"
          value={paymentData.paymentMethod}
          onChange={handleChange}
          required
        >
          {paymentOptions.map((method) => (
            <option key={method} value={method}>
              {method}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label>Amount</label>
        <input
          type="number"
          step="0.01"
          name="amount"
          className="form-control"
          value={paymentData.amount}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Process Payment
      </button>
    </form>
  );
};

export default ProcessPayment;
