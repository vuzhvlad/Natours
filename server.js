const dotenv = require('dotenv');
dotenv.config({ path: './config.env' }); // read our variables from the file and save them in the environment

const app = require('./app');

const port = process.env.PORT;
//creating server
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
