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

const port = process.env.PORT;
//creating server
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
