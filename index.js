/**
* index.js
* This is your main app entry point
*/

// Set up express, bodyparser and EJS
const express = require('express');
const app = express();
const port = 3000;
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs'); // set the app to use ejs for rendering


// Set up SQLite
// Items in the global namespace are accessible throught out the node application

const sqlite3 = require('sqlite3').verbose();
global.db = new sqlite3.Database('./database.db',function(err){
    if(err){
        console.error(err);
        process.exit(1); // bail out we can't connect to the DB
    } else {
        console.log("Database connected");
        global.db.run("PRAGMA foreign_keys=ON"); // tell SQLite to pay attention to foreign key constraints
    }
});


// Handle requests to the home page 
app.get('/', (req, res) => {
    // res.render('index'); // render the index.ejs file for the home page
    res.send('Hello, World!');
});

// // Add all the route handlers in usersRoutes to the app under the path /users
// const usersRoutes = require('./routes/users');
// app.use('/users', usersRoutes);

// const readerRoutes = require('./routes/reader');
// app.use('/reader', readerRoutes);

// const authorRoutes = require('./routes/author');
// app.use('/author', authorRoutes);

// const register = require('./routes/register')
// app.use('/register', register);

// const login = require('./routes/login')
// app.use('/login', login);

// const logout = require('./routes/logout')
// app.use('/logout', logout);

// Make the web application listen for HTTP requests
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

module.exports = app;
