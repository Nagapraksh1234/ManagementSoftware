import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Calendar from 'react-calendar'; // Install react-calendar if you haven't
import 'react-calendar/dist/Calendar.css';

const AppointmentForm = ({ onClose }) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState(''); // Keep date as a string to match original code
  const [time, setTime] = useState('');
  const [comments, setComments] = useState('');
  const [appointments, setAppointments] = useState([]); // State to store appointments for the selected date

  // Handle appointment form submission
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

  // Fetch appointments for the selected date
  const fetchAppointments = async (selectedDate) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/appointments/${selectedDate}`
      );
      setAppointments(response.data); // Set appointments for the selected date
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  // Handle calendar date change
  const handleDateChange = (selectedDate) => {
    const formattedDate = selectedDate.toISOString().split('T')[0]; // Convert to yyyy-mm-dd format
    setDate(formattedDate); // Save the string date
    fetchAppointments(formattedDate); // Fetch appointments for selected date
  };

  useEffect(() => {
    if (date) {
      fetchAppointments(date); // Fetch appointments for initial date (if any)
    }
  }, [date]);

  return (
    <div>
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

      {/* <div>
        <h3>Calendar</h3>
        <Calendar onChange={handleDateChange} value={date ? new Date(date) : new Date()} />
      </div> */}

      {/* <div>
        <h3>Appointments on {date || 'Select a date'}</h3>
        <ul>
          {appointments.length > 0 ? (
            appointments.map((appointment, index) => (
              <li key={index}>
                {appointment.time} - {appointment.name}: {appointment.comments}
              </li>
            ))
          ) : (
            <p>No appointments for this date.</p>
          )}
        </ul>
      </div> */}
    </div>
  );
};

export default AppointmentForm;
