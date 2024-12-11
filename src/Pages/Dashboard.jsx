import React, { useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../components/firebase';
import Sidebar from '../components/sidebar';

const Dashboard = () => {
  useEffect(() => {
    let logoutTimer;

    const resetTimer = () => {
      if (logoutTimer) clearTimeout(logoutTimer);
      logoutTimer = setTimeout(() => {
        handleLogout();
      }, 20 * 60 * 1000); // 20 minutes
    };

    const handleLogout = async () => {
      await signOut(auth);
      alert('Logged out due to inactivity');
      window.location.reload(); // Optional: Redirect to login
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);

    resetTimer(); // Start the timer when the component mounts

    return () => {
      clearTimeout(logoutTimer);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
    };
  }, []);

  return (
    <div>
      <Sidebar/>
    </div>
  )
};

export default Dashboard;
