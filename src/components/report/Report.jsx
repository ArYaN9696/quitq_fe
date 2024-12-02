import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchSalesReport,
  fetchUserActivityReport,
  fetchInventoryReport,
  fetchRevenueReport,
} from '../../store/reportSlice';

const Report = () => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [sellerId, setSellerId] = useState('');

  const { salesReport, userActivityReport, inventoryReport, revenueReport, status, error } = useSelector(
    (state) => state.reports
  );

  useEffect(() => {
    if (startDate && endDate && sellerId) {
      dispatch(fetchSalesReport({ sellerId, startDate, endDate }));
      dispatch(fetchUserActivityReport({ startDate, endDate }));
      dispatch(fetchRevenueReport({ startDate, endDate }));
    }
  }, [startDate, endDate, sellerId, dispatch]);

  const handleDateChange = () => {
    if (startDate && endDate) {
      dispatch(fetchSalesReport({ sellerId, startDate, endDate }));
      dispatch(fetchUserActivityReport({ startDate, endDate }));
      dispatch(fetchRevenueReport({ startDate, endDate }));
    }
  };

  return (
    <div className="container my-5">
      <h1 className="mb-4">Reports</h1>
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Generate Report</h5>
          <div className="row mb-3">
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Seller ID"
                value={sellerId}
                onChange={(e) => setSellerId(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <input
                type="date"
                className="form-control"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <input
                type="date"
                className="form-control"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div className="col-md-3 d-flex align-items-end">
              <button className="btn btn-primary w-100" onClick={handleDateChange}>
                Generate Report
              </button>
            </div>
          </div>
        </div>
      </div>

      {status === 'loading' && <div className="alert alert-info">Loading...</div>}
      {status === 'failed' && <div className="alert alert-danger">Error: {error}</div>}

      <div className="accordion" id="reportsAccordion">
        <div className="accordion-item">
          <h2 className="accordion-header" id="salesReportHeading">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#salesReport"
              aria-expanded="true"
              aria-controls="salesReport"
            >
              Sales Report
            </button>
          </h2>
          <div
            id="salesReport"
            className="accordion-collapse collapse show"
            aria-labelledby="salesReportHeading"
            data-bs-parent="#reportsAccordion"
          >
            <div className="accordion-body">
              <pre>{JSON.stringify(salesReport, null, 2)}</pre>
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header" id="userActivityReportHeading">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#userActivityReport"
              aria-expanded="false"
              aria-controls="userActivityReport"
            >
              User Activity Report
            </button>
          </h2>
          <div
            id="userActivityReport"
            className="accordion-collapse collapse"
            aria-labelledby="userActivityReportHeading"
            data-bs-parent="#reportsAccordion"
          >
            <div className="accordion-body">
              <pre>{JSON.stringify(userActivityReport, null, 2)}</pre>
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header" id="inventoryReportHeading">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#inventoryReport"
              aria-expanded="false"
              aria-controls="inventoryReport"
            >
              Inventory Report
            </button>
          </h2>
          <div
            id="inventoryReport"
            className="accordion-collapse collapse"
            aria-labelledby="inventoryReportHeading"
            data-bs-parent="#reportsAccordion"
          >
            <div className="accordion-body">
              <pre>{JSON.stringify(inventoryReport, null, 2)}</pre>
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header" id="revenueReportHeading">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#revenueReport"
              aria-expanded="false"
              aria-controls="revenueReport"
            >
              Revenue Report
            </button>
          </h2>
          <div
            id="revenueReport"
            className="accordion-collapse collapse"
            aria-labelledby="revenueReportHeading"
            data-bs-parent="#reportsAccordion"
          >
            <div className="accordion-body">
              <pre>{JSON.stringify(revenueReport, null, 2)}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
