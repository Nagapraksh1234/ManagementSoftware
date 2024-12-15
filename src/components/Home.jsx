import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Users from '../Pages/Users';
import AppointmentBooking from '../Pages/AppointmentBooking';
import Customers from '../Pages/Customers';
import Sidebar from './Sidebar';

const Home = () => {
  return (
    <Sidebar>
      <Routes>
        <Route path="/" element={<AppointmentBooking />} />
        <Route path="/users" element={<Users />} />
        <Route path="/messages" element={<AppointmentBooking />} />
        <Route path="/analytics" element={<Customers />} />
      </Routes>
    </Sidebar>
  );
};

export default Home;
