// jshint esversion:6

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true , useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Mongo db connection established");
})

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(PORT , () => {
    console.log("Server started at "+PORT);
})