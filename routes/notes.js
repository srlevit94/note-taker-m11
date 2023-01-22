const notesRouter = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// GET Route for retrieving all the tips
notesRouter.get('/', (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new UX/UI tip
notesRouter.post('/', (req, res) => {
  console.info(`${req.method} request received to add a note`);
  console.log(req.body);

  const { title, content } = req.body;

  if (req.body) {
    const newNote = {
      title,
      content,
      noteID: uuid(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully 🚀`);
  } else {
    res.error('Error in adding note');
  }
});

module.exports = notesRouter;