const express = require("express");
const http = require("http");
const app = express();
const cors = require("cors");
const comments = require("./data/comments.json");
const coctails = require("./data/coctails.json");
const server = http.createServer(app);
const fs = require("fs");

const port = 3001;
require("dotenv").config();

app.get("/api/getCoctails", (req, res) => {
   res.send(coctails);
});

app.get("/api/getComments", (req, res) => {
    res.send(comments);
});

app.get("/api/getAll", (req, res) => {
    let response = {coctail: coctails, comment: comments};
    res.send(response);
})
server.listen(port, () => console.log(`Listening on port 3001`));