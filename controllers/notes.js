const notesRouter = require('express').Router();
const Note = require('../models/note');
const User = require('../models/user');

// GET: READ ALL NOTES
notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({}).populate('user', { username: 1, name: 1 });
  response.json(notes);
});

// GET: READ ONE NOTE
notesRouter.get('/:id', async (request, response) => {
  const note = await Note.findById(request.params.id);
  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

// POST: CREATE NOTE
notesRouter.post('/', async (request, response) => {
  const body = request.body;
  const user = await User.findById(body.userId);
  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
    user: user._id,
  });
  const savedNote = await note.save();
  user.notes = user.notes.concat(savedNote._id);
  await user.save();
  response.json(savedNote);
});

// DELETE: REMOVE ONE NOTE
notesRouter.delete('/:id', async (request, response) => {
  await Note.findByIdAndRemove(request.params.id);
  response.status(204).end();
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
