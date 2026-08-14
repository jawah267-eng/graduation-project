const ApiError = require("../utils/apiError");

const handlJsonInvalidSingture = () =>
  new ApiError("Invalid token,plaese login again..", 401);

const handlJwtExpired = () =>
  new ApiError("Expired token,plaese login again..", 401);

const globalError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  // رح اعمل اختبار انه انا بعملية التطوير بعتلي تابعsendErrorForDev
  // للي رح يرجع تفاصيل الخطأ
  if (process.env.NODE_ENV == "development") {
    sendErrorForDev(err, res);
  } else {
    if (err.name === "JsonWebTokenError") err = handlJsonInvalidSingture();
    if (err.name === "TokenExpiredError") err = handlJwtExpired();

    sendErrorForProd(err, res);
  }
};
const sendErrorForDev = (err, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};
const sendErrorForProd = (err, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

module.exports = globalError;
