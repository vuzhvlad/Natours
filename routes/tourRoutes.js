const express = require('express');
const fs = require('fs');
const tourController = require('./../controllers/tourController'); // getting our controllerstourController.

const router = express.Router(); // creating new router

// special middleware for working with parameters, that works only in this subroute - Tours
router.param('id', tourController.checkID); // checks if id exists

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
