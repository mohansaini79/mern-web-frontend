import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/signup";
import Login from "./components/login";
import Dashboard from "./components/Dashboard";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(true);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.body.className = newMode ? "dark" : "light";
  };

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "light";
  }, []);

  return (
    <Router>
      {/* Toggle Button */}
      <div className="toggle-btn-container">
        <button onClick={toggleTheme}>
          {darkMode ? "☀" : "🌙"}
        </button>
      </div>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
