const fs = require('fs');
const express = require('express'); // adding methods from express

const app = express();

app.use(express.json()); // middleware, modifying th eincoming request data

// routing, if someone hits the / it will do something in the callback
// app.get('/', (req, res) => {
//   res
//     .status(200)
//     .json({ message: 'Hello from the server side', app: 'Natours' }); // sending status and json back
// });

// app.post('/', (req, res) => {
//   res.send('You can post to this endpoint...');
// });

//getting the json file with all the tours: parsing the file with json we ve read
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

app.get('/api/v1/tours/:id', (req, res) => {
  const id = req.params.id * 1; // converting to a number

  const tour = tours.find((el) => el.id === id); // finding a tour which has a the same id as in URL

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    }); // if the tour does not exist
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
  const newId = tours[tours.length - 1].id + 1; // creating an id for new object tour
  const newTour = Object.assign({ id: newId }, req.body); // assigning the new object

  tours.push(newTour); // pushing new object to the tours array

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
});

app.patch('/api/v1/tours/:id', (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    }); // if the tour does not exist
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here>',
    },
  });
});

const port = 3000;

//creating server
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
