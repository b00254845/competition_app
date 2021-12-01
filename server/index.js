const express = require("express"); //imports the modules with const app port assigned to it
const path = require('path');
const publicPath = path.join(__dirname, '..', 'public');
const cors = require('cors'); //This is set up as a middleware for the page routes
const app = express(); //Calls the express function (req, res) by adding it inside the app variable
const mysql = require("mysql"); //to compile the local database connection
const port = process.env.PORT || 3001

app.use(express.static(publicPath));

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'))
})
//parse application/json
app.use(express.json());
app.use(cors());

//Database connection
const db = mysql.createConnection({
    user:   'root',
    host: 'localhost',
    password:  'Glasgow01!',
    database: 'competitiondb',
});

//posts the details provided by entrants into the database table
app.post('/submit', (req, res) => {

    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const date = req.body.date;
    const answer = req.body.answer;

//Insert records into the database
    db.query("INSERT INTO register (firstname, lastname, email, date, answer) VALUES (?,?,?,?,?)", 
    [firstname, lastname, email, date, answer], 
    (err, result) => {
        console.log(err);
    }
    );
  });

//binds and listens connection initiated on the 3001 server port 
app.listen(port, () => {
    console.log("server is running on port 3001");
});