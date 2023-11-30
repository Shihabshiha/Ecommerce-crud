const globalErrorHandler = (err , req , res , next) => {
  res.setHeader('Content-Type','application/json')

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({ status:err.status , message:err.message});
}

export default globalErrorHandler;