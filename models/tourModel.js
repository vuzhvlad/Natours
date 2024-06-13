const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  // creating schema
  name: {
    // schema type object
    type: String,
    required: [true, 'A tour must have a name'], // required and an error for it
    unique: true, // we cant have 2 tour documents with the same name
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
});

const Tour = mongoose.model('Tour', tourSchema); // creating model out of the schema, (model name, schema)

module.exports = Tour;
