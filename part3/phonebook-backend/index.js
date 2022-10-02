const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const Person = require('./models/person');

const app = express();

app.use(express.static('build'));
app.use(express.json());
app.use(cors());

morgan.token('data', (request, response) => JSON.stringify(request.body));
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :data')
);

app.get('/', (request, response) => {
  response.send('<h1>Hello World</h1>');
});

app.get('/info', (request, response, next) => {
  const curDate = new Date();

  Person.countDocuments({})
    .then((count) =>
      response.send(
        `<p>Phonebook has info for ${count} people</p>
      <p>${curDate}</p>`
      )
    )
    .catch((error) => next(error));
});

app.get('/api/persons', (request, response) => {
  Person.find({}).then((persons) => response.json(persons));
});

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id;

  Person.findById(id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body;

  Person.findOneAndUpdate(
    { name: body.name },
    { number: body.number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then((person) => response.json(person))
    .catch((error) => next(error));
});

app.post('/api/persons', (request, response, next) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'missing name and/or number',
    });
  }

  Person.exists({ name: body.name }).then((person) => {
    if (person) {
      return response.status(409).send('Name already exists in phonebook');
    } else {
      const person = new Person({
        name: body.name,
        number: body.number,
      });

      person
        .save()
        .then((savedPerson) => response.json(savedPerson))
        .catch((error) => next(error));
    }
  });
});

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id;

  Person.findByIdAndRemove(id)
    .then((result) => response.status(204).end())
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) =>
  response.status(404).send({ error: 'unknown endpoint' });

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformed id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message });
  }

  // default Express error handler
  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
