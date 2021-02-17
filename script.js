const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require('bcrypt-nodejs');

const app = express();
const knex = require('knex');
const register = require("./controllers/register.js");

const signin = require("./controllers/signin.js");
const profile = require("./controllers/profile.js");
const image = require("./controllers/image.js");


app.use(cors());

const pg = knex(
{
  client: 'pg',
  connection: {
  	connectionString: process.env.DATABASE_URL,
  	ssl: false
  }
}
);

app.use(bodyParser.json());

app.get("/",(req,res)=>{res.send("Working........")});

app.post("/signin",(req, res) => { signin.handleSignIn(req,res,pg,bcrypt)});


app.post("/register",(req,res) => {register.handleRegister(req,res,pg,bcrypt)});


app.get("/profile/:id",(req,res)=>{profile.handleProfile(req,res,pg)});

app.put("/image",(req,res) => {image.handleImage(req,res,pg)});


app.listen(process.env.PORT||4000,()=>{console.log('server running on port')});