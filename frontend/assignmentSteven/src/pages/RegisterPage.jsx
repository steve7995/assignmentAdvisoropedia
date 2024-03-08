import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./registerpage.css";
const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    verifypassword: "",
    password: "",
    email: "",
    profilepic: null,
    checkbox: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: val });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, profilepic: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("username", formData.username);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("verifypassword", formData.verifypassword);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("profilepic", formData.profilepic);
      formDataToSend.append("checkbox", formData.checkbox);
      const response = await axios.post(
        "http://localhost:8080/api/register",
        formDataToSend
      );
      const token = response.data.token;
      localStorage.setItem("token", token);
      console.log(response);
      setFormData({
        username: "",
        password: "",
        verifypassword: "",
        email: "",
        profilepic: null,
        checkbox: false,
      });
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <>
      <div className="register-nav">
        <div className="logo">Advisoropedia</div>

        <div className="register_nav_links">
          <Link to="/">home</Link>
        </div>
      </div>

      <div className="container">
        <div>
          <h1 className="heading">Registration</h1>
        </div>

        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="username" className="label">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={handleChange}
              value={formData.username}
              className="input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              value={formData.password}
              className="input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="verifypassword" className="label">
              Verify password
            </label>
            <input
              type="password"
              id="verifypassword"
              name="verifypassword"
              onChange={handleChange}
              value={formData.verifypassword}
              className="input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
              className="input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="profilepic" className="label">
              Profile Picture
            </label>
            <input
              type="file"
              id="profilepic"
              name="profilepic"
              onChange={handleFileChange}
              className="input"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="checkbox"
              id="checkbox"
              name="checkbox"
              onChange={handleChange}
              checked={formData.checkbox}
              className="checkbox"
            />
            <label htmlFor="checkbox" className="checkbox-label">
              I agree to the terms and conditions
            </label>
          </div>
          <button type="submit" className="button">
            Register
          </button>
        </form>
      </div>
    </>
  );
};

export default RegistrationPage;
