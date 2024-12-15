import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import Swal from 'sweetalert2';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import AppointmentForm from '../components/AppointmentFrom';
import './appointmentbooking.css'

const localizer = momentLocalizer(moment);

const Scheduler = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleSelectDate = (slotInfo) => {
    Swal.fire({
      title: 'Warning!',
      text: `Would you like to create an appointment for ${moment(slotInfo.start).format('MMMM Do YYYY')}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        // Save the selected date
        setSelectedDate(slotInfo.start);

        // Open the React modal
        setIsModalOpen(true);
      }
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDate(null);
  };

  return (
    <div className="App" style={{ padding: '14px' }}>
      <Calendar
        localizer={localizer}
        selectable
        onSelectSlot={handleSelectDate}
        style={{
          height: '500px',
        }}
      />
      
      {isModalOpen && (
        <div className="modal-container">
          <div className="modal-overlay" onClick={closeModal}></div>
          <div className="modal-content">
            <AppointmentForm
              date={selectedDate}
              onClose={closeModal}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Scheduler;
