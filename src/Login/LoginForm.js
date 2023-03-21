import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginForm.css";

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);

  const emailHandler = (e) => {
    setEmail(e.target.value);
    setIsValidEmail(true);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
    setIsValidPassword(true);
  };

  function isEmailValid(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function isPasswordValid(password) {
    // Password regex to check for at least one uppercase letter, one special character, and minimum length of 8 characters
    const regex = /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    if (isEmailValid(email) && isPasswordValid(password)) {
      fetch("http://localhost:4000/users")
        .then((response) => response.json())
        .then((data) => {
          const user = data.find(
            (user) => user.email === email && user.password === password
          );
          if (user) {
            console.log("Login successful");
            sessionStorage.setItem("email", email);
            // Navigate to the success page using React Router's navigate object
            navigate("/eventForm");
          } else {
            console.log("Invalid email or password");
            setIsValidEmail(false);
            setIsValidPassword(false);
          }
        })
        .catch((error) => console.log(error));
    } else if (!isEmailValid(email)) {
      console.log("InValid Email:", email);
      setIsValidEmail(false);
    } else {
      console.log("Invalid password:", password);
      setIsValidPassword(false);
    }
  };

  return (
    <div className="login-form">
      <form className="form-inputs">
        <div className="form-header">
          <h3>Login Form</h3>
        </div>
        <div className="form-groups">
          <div className="form-group">
            <label>Email:</label>
            <input type="email" value={email} onChange={emailHandler} />
          </div>
          {!isValidEmail && (
            <div className="error-message">
              Please enter a valid email address
            </div>
          )}
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={passwordHandler}
            />
          </div>
          {!isValidPassword && (
            <div className="error-message">Please enter a valid password</div>
          )}
          <button className="btn-submit" onClick={submitHandler}>
            Login
          </button>
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
