const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  // creating schema
  name: {
    // schema type object
    type: String,
    required: [true, 'A tour must have a name'], // required and an error for it
    unique: true, // we cant have 2 tour documents with the same name
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, 'A tour must have a duration'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a group size'],
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have a difficulty'],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true, // removing space before and after
    required: [true, 'A tour must have a description'],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, 'A tour must have a cover image'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(), // getting timestamp for when it was created
    select: false, // it will never be selected and sent because user doesnt actually need this
  },
  startDates: [Date],
});

const Tour = mongoose.model('Tour', tourSchema); // creating model out of the schema, (model name, schema)

module.exports = Tour;
