const express = require('express'); // adding methods from express

const app = express();

// routing, if someone hits the / it will do something in the callback
app.get('/', (req, res) => {
  res
    .status(200)
    .json({ message: 'Hello from the server side', app: 'Natours' }); // sending status and json back
});

app.post('/', (req, res) => {
  res.send('You can post to this endpoint...');
});

const port = 3000;

//creating server
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
