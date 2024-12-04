import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { processPayment } from "../../services/paymentService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '.././cust_CSS/payments.css'; 

const ProcessPayment = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState({
    orderId: "",
    paymentMethod: "",
    amount: "",
  });

  useEffect(() => {
    const orderId = searchParams.get("orderId");
    const paymentMethod = searchParams.get("paymentMethod");
    const amount = searchParams.get("amount");

    if (orderId && amount) {
      setPaymentData({
        orderId,
        paymentMethod: paymentMethod || "",
        amount,
      });
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

      toast.success(`Payment processed successfully: ${response.message}`);
      setTimeout(() => {
        navigate("/order-history");
      }, 2000);
    } catch (error) {
      console.error(
        "Error processing payment:",
        error.response?.data || error.message
      );
      toast.error(
        error.response?.data?.message ||
          "Failed to process payment. Please try again."
      );
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
    <form onSubmit={handleSubmit} className="process-payment container mt-4">
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
          readOnly
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Process Payment
      </button>
    </form>
  );
};

export default ProcessPayment;
