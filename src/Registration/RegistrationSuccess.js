import React from "react";
import { Link, useLocation } from "react-router-dom";

const RegistrationSuccess = () => {
  const { state } = useLocation();
  const { username } = state;
  return (
    <>
      <p>Hi {username}, Your registration is successful.</p>
      <p>
        Proceed to <Link to="/">Login</Link>
      </p>
    </>
  );
};

export default RegistrationSuccess;
