import React, { useState } from "react";
import '../css/LoginPage.css';
import {useNavigate} from "react-router-dom";
import api from "../Api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);
    const res = await api.post("/api/token/", {
    // const res = await api.post("/tenant-login", {
      username: username,
      password: password,
    });
    console.log(res);
    localStorage.setItem(ACCESS_TOKEN, res.data.access);
    localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
    res.data.isAdmin ? navigate("/admin") : navigate("/tenant");
  };

  return (
    <div className="login-contain>er">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          {/* Username Field */}
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </div>

          {/* Password Field */}
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          {/* Submit Button */}
          <button type="submit">Login</button>
        </form>

        {/* Additional Links */}
        <div className="additional-links">
          <a href="#" className="forgot-password">
            Forgot Password?
          </a>
          <p>
            Don't have an account?{" "}
            <a href="#" className="signup-link">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;