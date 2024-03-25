const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const session = require('express-session'); //for user thangs


const app = express();

app.use(express.static('public')); //styles??? I'm just checkin out old code
app.use(express.json()); //middleware to parse JSON bodies
app.use(express.urlencoded({ extended:true }));//more middle ware for URL-encoded bodies

app.use(session({ //session baybe
  secret: 'secretest-key', //maybe make something else
  resave: false,
  saveUninitialized: true
})); //session expires when closed browser, add cookie->Max age if we want it timed

//Routes
const introRoute = require('./routes/intro')

//Routes - Pages
app.use('/', introRoute)

app.engine("hbs", exphbs.engine({extname: 'hbs'}));
app.set("view engine", "hbs")//set default file extenstion for views as .hbs
app.set("views", "./views")//set dir for views

require('./database') //mongodb stuff now in database

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {console.log(`Server listening on port ${port}`)});

// ctrl + c in terminal to stop

app.use((req,res,next)=>{//should spy n see the get stuff but idk what???
  //console.log(req.url); // returns like the /users, /posts stuffs
  console.log(`${req.method}:${req.url}`)//log method and url, GET:/users
  next();
})