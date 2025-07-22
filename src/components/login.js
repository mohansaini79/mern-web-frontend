import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import "../App.css";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login Successful!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Login Error:", err);
      alert(err.response?.data?.msg || "Login Failed");
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const res = await axios.post("http://localhost:3000/api/auth/google-login", {
        token: credentialResponse.credential,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Google Login Successful!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Google Login Error:", err);
      alert("Google Login Failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        name="email"
        type="email"
        placeholder="Email"
        onChange={handleChange}
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        required
      />
      <button type="submit">Login</button>

      <div className="google-login-wrapper">
        <p>OR</p>
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => alert("Google Sign In Error")}/>
      </div>

      <p style={{ textAlign: "center", marginTop: "10px" }}>
        Don't have an account? <a href="/signup">Signup here</a>
      </p>
    </form>
  );
};

export default Login;
