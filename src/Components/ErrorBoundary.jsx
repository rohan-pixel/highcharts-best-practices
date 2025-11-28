import React, { Component } from "react";

export default class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  // Corrected typo: getDerivedStateFromError
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error, info) {
    // Log the error or send it to a monitoring service
    console.error("ErrorBoundary caught an error:", error);
    console.error("Component stack:", info.componentStack);
  }

  render() {
    const { fallback } = this.props;

    if (this.state.hasError) {
      // If fallback is a React element, clone it with the error
      if (React.isValidElement(fallback)) {
        return React.cloneElement(fallback, { error: this.state.error });
      }

      // If fallback is a function, call it with the error
      if (typeof fallback === "function") {
        return fallback({ error: this.state.error });
      }

      // Default fallback UI
      return (
        <div style={{ padding: "20px", textAlign: "center", color: "red" }}>
          <h2>Something went wrong.</h2>
          <p>{this.state.error?.toString()}</p>
        </div>
      );
    }

    return this.props.children;
  }
}
