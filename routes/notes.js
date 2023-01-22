const notesRouter = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');
const fs = require('fs');


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

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
    console.error(err);
    } else {
    // Convert string into JSON object
    const parsedNotes = JSON.parse(data);

    // Add a new review
    parsedNotes.push(newNote);

    // Write updated reviews back to the file
    fs.writeFile(
        './db/db.json',
        JSON.stringify(parsedNotes, null, 4),
        (writeErr) =>
        writeErr
            ? console.error(writeErr)
            : console.info('Successfully updated notes!')
        );
     }
    });
    const response = {
        status: 'success',
        body: newNote,
      };
  
      console.log(response);
      res.status(201).json(response);
    } else {
      res.status(500).json('Error in creating note');
    }
  });
  


module.exports = notesRouter;