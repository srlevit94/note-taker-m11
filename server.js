// packages needed to run appliation
const express = require('express');
const path = require('path');
const uuid = require('./helpers/uuid');
const fsUtils = require('./helpers/fsUtils');


const app = express();
const PORT = process.env.PORT || 3001;

// destination file for notes
const notes = require('./db/db.json');

//express middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// GET Route for homepage
app.get('/', (req, res) => 
  res.sendFile(path.join(__dirname,'./public/index.html'))
);

// -- [GET /notes] should return the notes.html file.
app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, './public/notes.html'))
);

// -- [GET /api/notes] should read the db.json file and return all saved notes as JSON.
app.get('/api/notes', (req, res) => res.json(notes));

// -- [GET *] should return the index.html file.
app.get('*', (req, res) => 
  res.sendFile(path.join(__dirname,'./public/index.html'))
);

// -- [POST /api/notes] adds new note to db.json
app.post('/api/notes', (req, res) => {
  console.info(`${req.method} request received to add a note`);
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    fsUtils.readAndAppend(newNote, './db/db.json');
    res.json('note added successfully');
  } else {
    res.error('Error in adding note');
  }
});

// reads PORT and logs link to application to console
app.listen(PORT, () =>
console.log(`App listening at http://localhost:${PORT}`)
);


