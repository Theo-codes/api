const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const dotenv = require('dotenv');


app.get('/', (req, res) =>{
    res.send("Hello World!")
});

// app.get('/students', (req, res) =>{
//     res.send("Students")
// });

const connectDB = require('./config/db');
const { connect } = require('mongoose');

//Load config
dotenv.config({ path: './config/config.env' });

connectDB();

//Routes
app.use('/', require('./routes/index'));

app.listen(8080);