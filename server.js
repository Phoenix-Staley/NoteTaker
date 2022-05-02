const express = require("express");
const fs = require("fs");
const uuid = require("uuid");
const PORT = 3001;
const data = require("./db/db.json");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.get("/notes", (req, res) => {
    res.sendFile(__dirname + "/public/notes.html");
});

app.get("/api/notes", (req, res) => {
    res.send(data);
});

app.listen(PORT);