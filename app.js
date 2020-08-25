const express = require('express'
);
const app = express();
const path = require('path');
// const fs = require('fs');
const port = 80;
const hostname = '127.0.0.1';

// const bodyparser = require('body-parser');

const mongoose = require('mongoose');
const { stringify } = require('querystring');
const { timeStamp } = require('console');
// contactDance database.
// Connecting to the database.
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true});

// Define mongoose schema  
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    desc: String,
    email: String
  });


// Creating the model.
const Contact = mongoose.model('Contact', contactSchema);


// Express - Related stuff
// app.use(express.static('static', options));
app.use(express.urlencoded());
app.use('/static', express.static('static'));


// Template engine - Pug related stuff
app.set('view engine', 'pug');
// Where do you want to read your template files from.
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res)=>{
    let params = {}
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=>{
    let params = {}
    res.status(200).render('contact.pug', params);
})
app.post('/contact', (req, res)=>{
    let myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the data base")

    }).catch(()=>{
        res.status(400).send("Item was not saved to the data base");
    })

    // res.status(200).render('contact.pug');
})

app.listen(port, ()=>{
    console.log(`The application started running at http://${hostname}:${port}`)
})

// Initialize a node project using:- npm init


// Remember it is:-
// db.collectionName.find()