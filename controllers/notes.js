const notesRouter = require('express').Router();
const Note = require('../models/note');

// GET: READ ALL NOTES
notesRouter.get('/', (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});

// GET: READ ONE NOTE
notesRouter.get('/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then((note) => {
      if (note) {
        response.json(note);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

// POST: CREATE NOTE
notesRouter.post('/', (request, response, next) => {
  const body = request.body;
  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  });

  note
    .save()
    .then((savedNote) => savedNote.toJSON())
    .then((savedAndFormattedNote) => {
      response.json(savedAndFormattedNote);
    })
    .catch((error) => next(error));
});

// DELETE: REMOVE ONE NOTE
notesRouter.delete('/:id', (request, response, next) => {
  Note.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

// PUT: UPDATE ONE NOTE
notesRouter.put('/:id', (request, response, next) => {
  const body = request.body;
  const note = {
    content: body.content,
    important: body.important,
  };
  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => next(error));
});

module.exports = notesRouter;

// app.get('/', (request, response) => {
//   response.send('<h1>Hello World!</h1>');
// });
