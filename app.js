const express=require("express");
const app = express();
let dotenv=require('dotenv')
dotenv.config({path:'../config.env'});
app.set('view engine','ejs')
app.use(express.static(__dirname + '/views'));
let printrouter=require('./routes/router');

let bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
//console.log(process.env.mongodburl);
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Print',{useNewUrlParser: true});


app.use(printrouter);
app.listen(4000);




