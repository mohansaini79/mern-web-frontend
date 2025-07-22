import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GoogleLoginButton = () => {
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post("http://localhost:3000/api/auth/google-login", {
        token: credentialResponse.credential,
      });

      const user = res.data.user;
      const token = res.data.token;

      if (user && token) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        alert(`Welcome ${user.name || "Google User"}!`);
        navigate("/dashboard");
      } else {
        alert("Invalid user response");
      }

    } catch (err) {
      console.error("Google login error:", err);
      alert("Google Login Failed");
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => alert("Google Sign In Error")}
    />
  );
};

export default GoogleLoginButton;
