import React from 'react';

const AppointmentForm = () => {
  return (
    <div>
      <h2>Appointment Form</h2>
      <form>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" />
        </div>
        <div>
          <label htmlFor="date">Date:</label>
          <input type="date" id="date" name="date" />
        </div>
        <div>
          <label htmlFor="time">Time:</label>
          <input type="time" id="time" name="time" />
        </div>
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default AppointmentForm;
