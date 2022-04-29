const express = require("express");
const PORT = 3001;

const app = express();

app.use(express.static('public'));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.get("/notes", (req, res) => {
    res.sendFile(__dirname + "/public/notes.html");
});

app.get("/api/notes", (req, res) => {
    
});

app.listen(PORT);