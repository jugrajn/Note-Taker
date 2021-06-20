//Dependencies
const express = require('express');
const fs =require('fs');
const path = require('path');

//App to handle reqests
const app = express();

//Create Port
const PORT = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: true}));
app.use(express.json());

//Create Routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

app.get('/api/notes', (req, res) => res.JSON(notes));



// Get the server to start listening
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
