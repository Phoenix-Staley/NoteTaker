const express = require("express");
const PORT = process.env.PORT || 3001;
const api = require("./routes/index.js");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use("/", api);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.get("/notes", (req, res) => {
    res.sendFile(__dirname + "/public/notes.html");
});

app.listen(PORT);