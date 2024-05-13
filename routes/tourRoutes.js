const express = require('express');
const fs = require('fs');
const tourController = require('./../controllers/tourController'); // getting our controllerstourController.

const router = express.Router(); // creating new router

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
