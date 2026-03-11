
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={{color:'black'}}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/account/dashboard">
        <button id="backToHomeButton">Back to Homepage</button>
      </Link>
    </div>
  );
};

export default NotFound;