//import
const path = require("path");
//import

//third-party package import
const express = require('express');
//third-party package import

//imports of my own files
const userRoutes = require('./src/routes/user');
//imports of my own files

const app = express();

//templating engine setup
app.set('view engine', 'ejs');
app.set('views', 'views');

//this will allow me to serve static file
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use(userRoutes);

app.listen(5000)

