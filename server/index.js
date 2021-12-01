const express = require("express"); //imports the modules with const app port assigned to it
const path = require('path');
const publicPath = path.join(__dirname, '..', 'public');
const cors = require('cors'); //This is set up as a middleware for the page routes
const app = express(); //Calls the express function (req, res) by adding it inside the app variable
const mysql = require("mysql"); //to compile the local database connection
const port = process.env.PORT || 3001

app.use(express.static(publicPath));

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html/'))
})

const path = require('path');
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
// Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

//parse application/json
app.use(express.json());
app.use(cors());
// ** MIDDLEWARE ** //
const whitelist = ['http://localhost:3001', 'http://localhost:3000', 'https://git.heroku.com/competitions-app.git']
const corsOptions = {
  origin: function (origin, callback) {
    console.log("** Origin of request " + origin)
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Origin acceptable")
      callback(null, true)
    } else {
      console.log("Origin rejected")
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions))

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