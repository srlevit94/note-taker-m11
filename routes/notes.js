const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');
const fs = require('fs');

// GET Route for retrieving all the notes
notes.get('/api/notes', (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new note
notes.post('/api/notes', (req, res) => {
  console.info(`${req.method} request received to add a note`);
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json('note added successfully');
  } else {
    res.error('Error in adding note');
  }
});

module.exports = notes;

// fs.readFile('./db/db.json', 'utf8', (err, data) => {
//   if (err) {
//     console.error(err);
//   } else {
//     // Convert string into JSON object
//     const parsedNotes = JSON.parse(data);

//     // Add a new review
//     parsedNotes.push(newNote);

//     // Write updated notes back to the file
//     fs.writeFile(
//       './db/db.json',
//       JSON.stringify(parsedNotes, null, 4),
//       (writeErr) => {
//         writeErr
//           ? console.error(writeErr)
//           : res.json(notes)
//       }
//     );
//   }
// });