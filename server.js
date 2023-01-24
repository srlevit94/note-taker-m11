// packages needed to run appliation
const express = require('express');
const path = require('path');
const { clog } = require('./middleware/clog');
const api = require('./routes/index.js');
const notesRoute = require('./routes/notes.js')

// const notesRoute = require('./routes/notes.html')

const app = express();
const PORT = process.env.PORT || 3001;

// destination file for notes
const { notes } = require('./db/db.json');

//express middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(clog);
app.use('/api', api);
app.use('/', notesRoute);

// GET Route for homepage
app.get('/', (req, res) => 
  res.sendFile(path.join(__dirname,'./public/index.html'))
);

// -- [GET *] should return the index.html file.
app.get('*', (req, res) => 
  res.sendFile(path.join(__dirname,'./public/index.html'))
);

// -- [GET /notes] should return the notes.html file.
app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, './public/notes.html'))
);

app.listen(PORT, () =>
console.log(`App listening at http://localhost:${PORT}`)
);



// -- [GET /api/notes] should read the db.json file and return all saved notes as JSON.
app.get('/api/notes', (req, res) => res.json(notes));

// // -- [POST /api/notes] should receive a new note to save on the request body, add it to the [db.json] file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into [npm] packages that could do this for you).
// app.post('/api/notes', (req, res) => {
//     // Log that a POST request was received
//     console.info(`${req.method} request received to add a note`);
  
//     // Destructuring assignment for the items in req.body
//     const { noteTitle, noteContent } = req.body;
  
//     // If all the required properties are present
//     if (noteTitle  && noteContent) {
//       // Variable for the object we will save
//       const newNote = {
//         noteTitle,
//         noteContent,
//         note_id: uuid(),
//       };
  
//       const response = {
//         status: 'success',
//         body: newNote,
//       };
  
//       console.log(response);
//       res.status(201).json(response);
//     } else {
//       res.status(500).json('Error in creating Note');
//     }
//   });
