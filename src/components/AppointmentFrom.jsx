import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'react-calendar/dist/Calendar.css';

const AppointmentForm = ({ onClose }) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState(''); 
  const [time, setTime] = useState('');
  const [comments, setComments] = useState('');
  const [appointments, setAppointments] = useState([]); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const appointmentData = { name, time, date, comments };
    try {
      await axios.post('http://localhost:5000/appointments', appointmentData);
      Swal.fire({
        icon: 'success',
        title: 'Appointment saved!',
        text: 'Your appointment has been successfully saved.',
      });
      onClose();
      window.location.reload();
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'There was an issue saving your appointment.',
      });
    }
  };

  const fetchAppointments = async (selectedDate) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/appointments/${selectedDate}`
      );
      setAppointments(response.data); 
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleDateChange = (selectedDate) => {
    const formattedDate = selectedDate.toISOString().split('T')[0]; 
    setDate(formattedDate); 
    fetchAppointments(formattedDate);
  };

  useEffect(() => {
    if (date) {
      fetchAppointments(date); 
    }
  }, [date]);

  return (
    <div className='form-container'>
      <h2>Appointment Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="time">Time:</label>
          <input
            type="time"
            id="time"
            name="time"
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="comments">Comments:</label>
          <input
            type="text"
            id="comments"
            name="comments"
            onChange={(e) => setComments(e.target.value)}
          />
        </div>
        <button type="submit">Save</button>
      </form>

    
    </div>
  );
};

export default AppointmentForm;
