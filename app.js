const fs = require('fs');
const express = require('express'); // adding methods from express
const morgan = require('morgan');

const userRouter = require('./routes/userRoutes');
const tourRouter = require('./routes/tourRoutes');

const app = express();

// MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // calling morgan will return kind of the same function
}

app.use(express.json()); // middleware, modifying the incoming request data
app.use(express.static(`${__dirname}/public`)); // serving static file

app.use((req, res, next) => {
  // this middleware applies toe very route cause we diddnt specify it
  console.log('Hello from the middleware');
  next(); // always call next inside of the middleware
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
