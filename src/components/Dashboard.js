import React, { useEffect, useState } from 'react';
import '../App.css';

const Dashboard = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    // Get user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}>
      <h2>Welcome, {user.name || 'User'} 🎉</h2>
      <p>Email / ID: {user.email || user.id || 'N/A'}</p>
    </div>
  );
};

export default Dashboard;
