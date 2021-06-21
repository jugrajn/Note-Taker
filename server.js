//Dependencies
const express = require('express');
const fs =require('fs');
const path = require('path');
const { uuidv4 } = require('uuid');

//App to handle reqests
const app = express();

//Create Port
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static(`./app/public`));

//Creating path or html routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));   // Will display index page

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html'))); // Will display the notes page

app.get('/api/notes', (req, res) => res.JSON(notes)); // Will display the notes in json format


// api routes
app.post('/api/notes', (req, res) => {
    let addNote = reqbody;
    addNote.id = uuidv4();
    notes.push(addNote)
    fs.writeFile(path.join(__dirname, '/db/db.json'), JSON.stringify(notes));
});

app.delete('/api/notes/:id', (req, res) => {
    let removeNote = req.params.id;
    notes = notes.filter((value) => {
        return value.id !== removeNote
    });
    
});



// Get the server to start listening
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
