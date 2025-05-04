// Utility function to create error objects with status codes
export const createError = (status, message) => {
  const error = new Error(message);
  error.status = status;
  return error;
};
