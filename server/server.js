const express = require("express");
const http = require("http");
const app = express();
const cors = require("cors");
const comments = require('./data/comments.json');
const coctails = require('./data/coctails.json');
const server = http.createServer(app);
const fs = require("fs");
const bodyParser = require('body-parser')
const path = require("path")
const multer = require("multer")
process.env.PWD = process.cwd()

const COMMENTS_PATH = process.env.PWD + '/server/data/comments.json';
const COCTAILS_PATH = process.env.PWD + '/server/data/coctails.json';
const IMAGES_PATH = process.env.PWD + "/frontend/public/images"


const port = 3001;
require("dotenv").config();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cors());

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, IMAGES_PATH);
        },
        filename: function (req, file, cb) {
            const extension = file.mimetype.split('/')[1];
            const coctail = JSON.parse(req.body.coctail);
            let nameNoWhitespace = coctail.name.replace(/\s/g, '');
            const fileName = nameNoWhitespace + '.' + extension;
            cb(null, fileName);
        }
    }),
    limits: {
        fileSize: 1024 * 1024 * 5 // MB
    },
    fileFilter: (req, file, cb) => {
        let valid = file.mimetype.includes('image/');
        cb(null, valid);
    },
});

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

    const newComment = {
        "id": comments[comments.length-1].id+1,
        "coctail_id": data.coctail_Id,
        "author": data.author,
        "date": getDate(),
        "description": data.description
    }
    comments.push(newComment);
    let toSave = JSON.stringify(comments,null,2);
    fs.writeFileSync(COMMENTS_PATH, toSave);
    res.send(toSave);
    console.log("Pomyslnie dodano komentarz")
});

app.post("/api/saveRating", (req, res) => {
    const data = req.body;
    const updateCoctailsRating = coctails.map((coctail) => {
        if(coctail.id === parseInt(data.coctail_id))
        {
            coctail.ratings.push(data.ratings);
        }

        return coctail;
    });
    let toSave = JSON.stringify(updateCoctailsRating,null,2);
    fs.writeFileSync(COMMENTS_PATH, toSave);
    res.send(toSave);
    console.log("Pomyslnie dodano ocene")
})

app.post("/api/updateCoctail", upload.single("file"), (req, res) => {
    const data = JSON.parse(req.body.coctail);
    const image = req.file;
    if(image !== undefined) {
        data.image = '/images/' + image.filename;
    }
    else{
        data.image = "/images/placeholder.jpg"
    }
    const coctailToUpdate = createCoctail(data)

    coctails.sort((c1, c2) => {
        return c1.id - c2.id;
    });

    const updatedCoctail = coctails.map((coctail) => {
        if (coctail.id === coctailToUpdate.id) {
            console.log(image);
            console.log(coctail.name.replace(/\s/g, ''));
            console.log(coctailToUpdate.name.replace(/\s/g, ''));
            if (coctail.name.replace(/\s/g, '') !== coctailToUpdate.name.replace(/\s/g, '') && image === undefined) {
                coctailToUpdate.image = "/images/placeholder.jpg";
            }
            Object.assign(coctail, coctailToUpdate);
        }
        return coctail;
    });
    let dataToSave = JSON.stringify(updatedCoctail, null, 2);
    fs.writeFileSync(COCTAILS_PATH, dataToSave);
    res.send(dataToSave);
})

app.post('/api/addCoctail', upload.single("file"), (req, res) => {
    const data = JSON.parse(req.body.coctail);
    console.log(data)
    const image = req.file;
    if (image !== undefined) {
        data.image = '/images/' + image.filename;
    } else {
        data.image = "/images/placeholder.jpg";
    }

    const newCoctail = createCoctail(data, true);

    coctails.sort((c1, c2) => {
        return c1.id - c2.id;
    });

    newCoctail.id = coctails.length + 1;
    coctails.push(newCoctail);

    let dataToSave = JSON.stringify(coctails, null, 2);
    fs.writeFileSync(COCTAILS_PATH, dataToSave);
    res.send(dataToSave);
});

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
})

const getDate = () => {
    let today = new Date();
    let mm = today.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;
    let date = today.getDate() + '-' + mm + '-' + today.getFullYear();
    return date.toString();
}

server.listen(port, () => console.log(`Listening on port 3001`));

const createCoctail = (data, createNew) => {
    const ingredients = [];
    let nameIngr = "nameIngr"
    let amount = "amount";
    let counter = "counter";
    let ingredientsLength = Object.keys(data).filter((prop) => prop.includes(nameIngr)).length;
    for (let i = 0; i < ingredientsLength; i++) {
        if (data[nameIngr + i] !== "") {
            ingredients.push({
                name: data[nameIngr + i],
                amount: data[amount + i],
                counter: data[counter + i]
            });
        }
    }
    const steps = data.steps.split(".").map((step) => step.trim()).filter((step) => step !== '')
        .map((step) => step + '.');
    let coctail = {};
    if (createNew) {
        coctail = {
            id: undefined,
            name: data.name,
            image: data.image,
            type: data.type,
            glass: data.glass,
            ratings: [],
            ingredients: ingredients,
            steps: steps
        }
    }
    //update
    else {
        coctail = {
            id: data.id,
            name: data.name,
            type: data.type,
            glass: data.glass,
            ingredients: ingredients,
            steps: steps
        }
        if (data.image !== undefined) {
            coctail.image = data.image;
        }
    }
    return coctail;
}