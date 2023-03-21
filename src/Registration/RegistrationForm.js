import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./RegistrationForm.css";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [emailList, setEmailList] = useState([]);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:4000/users")
      .then((response) => response.data)
      .then((data) => {
        setEmailList(data.map((user) => user.email));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const emailHandler = useCallback((e) => {
    setEmail(e.target.value);
    setErrors({});
  }, []);

  const passwordHandler = useCallback((e) => {
    setPassword(e.target.value);
    setErrors({});
  }, []);

  const userNameHandler = useCallback((e) => {
    setUsername(e.target.value);
  }, []);

  const isEmailValid = useCallback((email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }, []);

  const isPasswordValid = useCallback((password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})\S+$/;
    return regex.test(password);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailExists = emailList.includes(email);
    if (emailExists) {
      setErrors({ emailExists: "Email already exists" });
    } else if (isEmailValid(email) && isPasswordValid(password)) {
      await axios.post("http://localhost:4000/users", {
        username: username,
        email: email,
        password: password,
      });
      navigate("/registrationSuccess", { state: { username: username } });
    } else if (!isEmailValid(email)) {
      setErrors({ isValidEmail: "Please enter a valid email address" });
    } else {
      setErrors({
        isValidPassword:
          "Please enter a valid password (Password must contain atleast 8 characters including special character(s), number(s), lowercase alphabet(s), uppercase alphabet(s))",
      });
    }
  };

  return (
    <div className="registration-form">
      <form onSubmit={handleSubmit} className="registration-form-inputs">
        <div className="form-header">
          <h3>Registration Form</h3>
        </div>
        <div className="form-groups">
          <div className="form-group">
            <label>Email:</label>
            <input
              name="email"
              type="email"
              value={email}
              onChange={emailHandler}
            />
          </div>
          {errors.isValidEmail && (
            <div className="error-message">{errors.isValidEmail}</div>
          )}
          {errors.emailExists && (
            <div className="error-message">{errors.emailExists}</div>
          )}
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={userNameHandler}
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              name="password"
              onChange={passwordHandler}
            />
          </div>
          {errors.isValidPassword && (
            <div className="error-message">{errors.isValidPassword}</div>
          )}
          <p>
            Already have an account?{" "}
            <Link className="login-link" to="/">
              Login
            </Link>
          </p>
          <button className="btn-submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
