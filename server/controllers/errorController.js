module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  const errOptions = {
    status: err.status,
    message: err.message,
  };
  if (process.env.NODE_ENV === "development") {
    errOptions.err = err;
    errOptions.stack = err.stack;
  }
<<<<<<< HEAD
  res.status(err.statusCode).json();
=======
  res.status(err.statusCode).json(errOptions);
>>>>>>> 27160f4e9e16d52a50274588d8f99b3f93d96764
};
