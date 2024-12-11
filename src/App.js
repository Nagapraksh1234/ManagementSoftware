import './App.css';
import Login from './components/Login';
import Dashboard from './Pages/Dashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Users from './Pages/Users';
import AppointmentBooking from './Pages/AppointmentBooking';
import Customers from './Pages/Customers';


function App() {
  return (
    <div >

<Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/users" element={<Users />} />
      <Route path="/messages" element={<AppointmentBooking />} />
      <Route path="/analytics" element={<Customers />} />
    </Routes>
  </Router>

    </div>
  );
}

export default App;
