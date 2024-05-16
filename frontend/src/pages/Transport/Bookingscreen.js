import React, { useState } from 'react';
import axios from 'axios';
import Navigation from '../../pages/Navigation';
import './bookingscreen.css';
import {  Link } from 'react-router-dom';


const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    vehicleCode: '',
    startDate: '',
    endDate: '',
    passengers: '',
    withDriver: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/api/bookings/bookvehicle', formData);
      setSuccessMessage('Booking successful!');
      setErrorMessage('');
      setFormData({
        name: '',
        email: '',
        phoneNumber: '',
        vehicleCode: '',
        startDate: '',
        endDate: '',
        passengers: '',
        withDriver: '',
      });
      console.log(res.data);
    } catch (err) {
      setSuccessMessage('');
      setErrorMessage('Failed to book vehicle');
      console.error(err);
    }
  };

  return (
    <div>
    <Navigation />
    <div className="transbooking-form">
      {successMessage && <p className="transbooking-success">{successMessage}</p>}
      {errorMessage && <p className="transbooking-error">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="transbooking-form">
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="transbooking-input" />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="transbooking-input" />
        <input type="tel" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} className="transbooking-input" />
        <input type="text" name="vehicleCode" placeholder="Vehicle Code" value={formData.vehicleCode} onChange={handleChange} className="transbooking-input" />
        <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="transbooking-input" />
        <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} className="transbooking-input" />
        <input type="number" name="passengers" placeholder="Number of Passengers" value={formData.passengers} onChange={handleChange} className="transbooking-input" />
        <select name="withDriver" onChange={handleChange} className="transbooking-input">
          <option value="">With or Without Driver?</option>
          <option value="with">With Driver</option>
          <option value="without">Without Driver</option>
        </select>
        <button type="submit" className="transbooking-button">Book now</button>
        <Link to="/PaymentForm">
                    <button className='btn btn-success' style={{ marginRight: '10px' }}>Pay Now</button>
                  </Link>
      </form>
    </div>
    </div>
  );
};

export default Form;
