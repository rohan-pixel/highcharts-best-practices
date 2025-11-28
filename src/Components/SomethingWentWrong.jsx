import React from "react";

const SomethingWentWrong = ({ error }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
        textAlign: "center",
        color: "#b00020",
      }}
    >
      <h2 style={{ fontSize: "24px", marginBottom: "10px" }}>
        Oops! Something went wrong.
      </h2>
      {error && (
        <p style={{ fontSize: "14px", color: "#555" }}>
          {error.toString()}
        </p>
      )}
      <button
        onClick={() => window.location.reload()}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          border: "none",
          borderRadius: "6px",
          backgroundColor: "#4CAF50",
          color: "#fff",
          cursor: "pointer",
          fontSize: "14px",
        }}
      >
        Reload Page
      </button>
    </div>
  );
};

export default SomethingWentWrong;
