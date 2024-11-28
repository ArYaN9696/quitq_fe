import React, { useState } from 'react';
import authService from '../../services/authService'; // import authService
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    phoneNumber: '',
    address: ''
  });
  
  const [role, setRole] = useState(''); // Track the selected role
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole); // Set the selected role (customer, seller, admin)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!role) {
      setError('Please select a role');
      return;
    }

    try {
      await authService.register(role, formData); // Send registration data with selected role
      navigate('/login'); // After successful registration, redirect to login
    } catch (err) {
      console.error("Registration Error:", err); // Log error response
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="container">
      <h2 className="my-4">Register</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      {/* Role Selection Buttons */}
      {!role && (
        <div className="mb-3">
          <h4>Please select your role:</h4>
          <button className="btn btn-outline-primary m-2" onClick={() => handleRoleSelect('customer')}>Customer</button>
          <button className="btn btn-outline-primary m-2" onClick={() => handleRoleSelect('seller')}>Seller</button>
          <button className="btn btn-outline-primary m-2" onClick={() => handleRoleSelect('admin')}>Admin</button>
        </div>
      )}

      {/* Registration Form */}
      {role && (
        <form onSubmit={handleSubmit}>
          {/* User Name */}
          <div className="mb-3">
            <label htmlFor="userName" className="form-label">User Name</label>
            <input
              type="text"
              className="form-control"
              id="userName"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          {/* Date of Birth */}
          <div className="mb-3">
            <label htmlFor="dateOfBirth" className="form-label">Date of Birth</label>
            <input
              type="date"
              className="form-control"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
          </div>

          {/* Phone Number */}
          <div className="mb-3">
            <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
            <input
              type="tel"
              className="form-control"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>

          {/* Address */}
          <div className="mb-3">
            <label htmlFor="address" className="form-label">Address</label>
            <textarea
              className="form-control"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary">Register</button>
        </form>
      )}
    </div>
  );
};

export default Register;
