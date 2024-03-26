import React from "react";

const NotFoundPage = () => {
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "20vh",
      }}
    >
      <h1
        style={{
          fontSize: "2.5rem",
          fontWeight: "bold",
          marginBottom: "1rem",
          color: "#0364cb",
        }}
      >
        404 Page Not Found
      </h1>
      <p
        style={{
          fontSize: "1.2rem",
          color: "#666",
        }}
      >
        Oops! The page you're looking for does not exist.
      </p>
    </div>
  );
};

export default NotFoundPage;
