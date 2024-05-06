const fs = require('fs');
const express = require('express'); // adding methods from express

const app = express();

app.use(express.json()); // middleware, modifying th eincoming request data

app.use((req, res, next) => {
  // this middleware applies toe very route cause we diddnt specify it
  console.log('Hello from the middleware');
  next(); // always call next inside of the middleware
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//getting the json file with all the tours: parsing the file with json we ve read
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    reqestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
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
};

const createTour = (req, res) => {
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
};

const updateTour = (req, res) => {
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
};

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    }); // if the tour does not exist
  }
  res.status(204).json({
    // sending 204 and null for deleting something
    status: 'success',
    data: null,
  });
};

// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

app.route('/api/v1/tours').get(getAllTours).post(createTour);

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

const port = 3000;

//creating server
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
