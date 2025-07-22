import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password } = form;

    // ✅ Name check
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(name)) {
      alert("Name can only contain letters and spaces");
      return;
    }

    // ✅ Email check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    // ✅ Strong Password check
    if (password.length < 8) {
      alert
        ("Password must be at least 8 characters");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", form);

      if (res.status === 201) {
        alert("Signup successful! Redirecting to login...");
        navigate("/login");
      }
    } catch (err) {
      const msg = err.response?.data?.msg || "Signup failed. Try again.";
      alert(msg);
      if (err.response?.status === 409) {
        navigate("/login");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Signup</button>
      <p style={{ textAlign: "center", marginTop: "12px" }}>
        Already have an account? <a href="/login">Login here</a>
      </p>
    </form>
  );
};

export default Signup;
