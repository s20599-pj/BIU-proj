const express = require("express");
const http = require("http");
const app = express();
const cors = require("cors");
const comments = require("./data/comments.json");
const coctails = require("./data/coctails.json");
const server = http.createServer(app);
const fs = require("fs");
const bodyParser = require('body-parser')

const COMMENTS_PATH = "./data/comments.json";
const COCTAILS_PATH = "./data/coctails.json";

const port = 3001;
require("dotenv").config();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cors());


app.get("/api/getCoctails", (req, res) => {
   res.send(coctails);
});

app.get("/api/getComments", (req, res) => {
    res.send(comments);
});

app.get("/api/getAll", (req, res) => {
    let response = {coctail: coctails, comments: comments};
    res.send(response);
});

app.post("/api/saveComment", (req, res) => {
    const data = req.body;
    console.log(data);

    const newComment = {
        "id": comments[comments.length-1].id+1,
        "coctail_id": data.coctail_Id,
        "author": data.author,
        "date": getDate(),
        "description": data.description
    }
    console.log(newComment);
    comments.push(newComment);
    console.log(comments);
    let toSave = JSON.stringify(comments,null,2);
    fs.writeFileSync(COMMENTS_PATH, toSave);
    res.send(toSave);
});

const getDate = () => {
    let today = new Date();
    let mm = today.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;
    let date = today.getDate() + '-' + mm + '-' + today.getFullYear();
    return date.toString();
}

server.listen(port, () => console.log(`Listening on port 3001`));