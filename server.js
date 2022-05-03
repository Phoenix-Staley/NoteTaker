const express = require("express");
const fs = require("fs");
const uuid = require("uuid");
const PORT = process.env.PORT || 3001;
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

app.post("/api/notes", (req, res) => {
    console.info("POST request received to save a note");

    let response;

    if (req.body && req.body.title && req.body.text) {
        const input = {
            title: req.body.title,
            text: req.body.text,
            id: uuid.v4()
        };
        response = {
            status: "success",
            data: req.body
        };
        
        data.push(input);
        fs.writeFileSync("./db/db.json", JSON.stringify(data));
        res.status(201).json(response);
    } else {
        res.status(400).json("Request body must contain a title and a text property");
    }
});

app.delete("/api/notes/:id", (req, res) => {
    console.info("DELETE request received to delete a note");

    const reqId = req.params.id;

    for (let i=0; i < data.length; i++) {
        if (data[i].id === reqId) {
            data.splice(i, 1);
        }
    }

    fs.writeFileSync("./db/db.json", JSON.stringify(data));
});

app.listen(PORT);