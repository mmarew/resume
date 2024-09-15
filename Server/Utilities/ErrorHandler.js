const handleError = (err) => {
  if (err.name === "ValidationError") {
    return {
      error: true,
      type: "Validation Error",
      details: err.errors, // specific validation errors
    };
  }

  if (err.name === "AuthenticationError") {
    return {
      error: true,
      type: "Authentication Error",
      message: "You are not authorized to perform this action.",
    };
  }

  // General server errors
  return {
    error: true,
    message: err.message || "An unexpected error occurred",
  };
};
module.exports = handleError;
