//Dependencies
const express = require('express');
const fs =require('fs');
const path = require('path');
const {v4: uuidv4 } = require('uuid');

//App to handle reqests
const app = express();

//Create Port
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static('public'));

//Take database 'db.json' file and store to variable to refer to later
let notes = JSON.parse(fs.readFileSync(path.join(__dirname, '/db/db.json')));

//Creating path or html routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));   // Will display index page

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html'))); // Will display the notes page

app.get('/api/notes', (req, res) => res.json(notes)); // Will display the notes in json format


// api routes
app.post('/api/notes', (req, res) => {
    let addNote = req.body;
    addNote.id = uuidv4();
    notes.push(addNote)
    fs.writeFileSync(path.join(__dirname, '/db/db.json'), JSON.stringify(notes));
    res.send('success')
});

app.delete('/api/notes/:id', (req, res) => {
    let removeNote = req.params.id;
    notes = notes.filter((value) => {
        return value.id !== removeNote
    });
    fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(notes))
    res.send('Note deleted')
});

// Get the server to start listening
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
