const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const post = require("./Router/Post");
const user = require("./Router/User");

const app= express();

dotenv.config({path: './Config.env'});
require('./Database/Connect');

app.use(cors());

// Using Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

// using route
app.use(post);
app.use(user);


app.listen(4040);