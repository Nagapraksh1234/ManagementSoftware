import React from 'react';
import Users from '../Pages/Users';
import AppointmentBooking from '../Pages/AppointmentBooking';
import Customers from '../Pages/Customers';
import Dashboard from '../Pages/Dashboard';
import { Routes, Route } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/messages" element={<AppointmentBooking />} />
        <Route path="/analytics" element={<Customers />} />
      </Routes>
    </div>
  );
};

export default Home;
