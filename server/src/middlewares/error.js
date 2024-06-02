const error = (err, req, res, next) => {
  err.message ||= "Internal Server Error !!";
  err.statusCode ||= 500;

  if (err.code == 11000) {
    err.message = `Duplicate field - ${Object.keys(err.keyPattern).join(",")}`;
    err.statusCode = 400;
  }

  if (err.name == "CastError") {
    err.message = `Invalid Format of ${err.path}`;
    err.statusCode = 400;
  }

  return res.status(err.statusCode).json({
    success: false,
    message: process.env.NODE_ENV === "DEVELOPEMENT" ? err : err.message,
  });
};

export default error;
