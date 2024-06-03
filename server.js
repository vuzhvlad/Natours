const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' }); // read our variables from the file and save them in the environment

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }) //connecting database via mongoose to our backend
  .then(() => console.log('db connection successful'));

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

const port = process.env.PORT;
//creating server
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
