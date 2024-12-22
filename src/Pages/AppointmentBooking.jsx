import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import Swal from 'sweetalert2';
import axios from 'axios';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import AppointmentForm from '../components/AppointmentFrom';
import './appointmentbooking.css';

const localizer = momentLocalizer(moment);

const Scheduler = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null); // Track the selected event

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/appointments');
        console.log('Fetched appointments:', response.data);
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error.message);
      }
    };

    fetchAppointments();
  }, []);

  // Handle date selection on the calendar
  const handleSelectDate = (slotInfo) => {
    const formattedDate = moment(slotInfo.start).format('YYYY-MM-DDTHH:mm:ss');

    Swal.fire({
      title: 'Warning!',
      text: `Would you like to create an appointment for ${moment(formattedDate).format('MMMM Do YYYY')}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        setSelectedDate(formattedDate);
        setIsModalOpen(true);
      }
    });
  };

  // Handle event selection (clicking on an event)
  const handleSelectEvent = (event) => {
    setSelectedEvent(event); // Set selected event to show its details
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDate(null);
    setSelectedEvent(null); // Clear selected event when closing the modal
  };

  // Handle new appointment added via modal
  const handleNewAppointment = (newAppointment) => {
    setAppointments((prevAppointments) => [...prevAppointments, newAppointment]);
  };

  const events = appointments
    .map((appointment) => {
      try {
        const startDate = new Date(appointment.date);
        const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); 
        if (isNaN(startDate)) {
          throw new Error(`Invalid date: ${appointment.date}`);
        }

        return {
          title: appointment.name +', '+appointment.comments || 'Appointment',
          start: startDate,
          end: endDate,
          comments: appointment.comments, 
        };
      } catch (error) {
        console.error(error.message);
        return null;
      }
    })
    .filter((event) => event !== null);

  return (
    <div className="App" style={{ padding: '14px' }}>
      <h1 style={{ backgroundColor: 'rgb(0, 7, 61)', color: 'white' }}>
        Appointment Scheduler
      </h1>
      <br />
      <Calendar
        localizer={localizer}
        selectable
        events={events}
        onSelectSlot={handleSelectDate}
        onSelectEvent={handleSelectEvent} // Set event selection handler
        style={{
          height: '500px',
          width: '1000px',
        }}
      />
      {isModalOpen && selectedDate && (
        <div className="modal-container">
          <div className="modal-overlay" onClick={closeModal}></div>
          <div className="modal-content">
            <AppointmentForm
              date={selectedDate}
              onClose={closeModal}
              onNewAppointment={handleNewAppointment}
            />
          </div>
        </div>
      )}
      {selectedEvent && (
        <div className="event-details-modal">
          <div className="modal-overlay" onClick={closeModal}></div>
          <div className="modal-content">
            <h2>{selectedEvent.title}</h2>
            <p><strong>Comments:</strong> {selectedEvent.comments || 'No comments available'}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Scheduler;
