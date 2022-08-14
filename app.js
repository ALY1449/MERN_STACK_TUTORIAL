const express = require('express');
const connectDB = require('./config/db');
var cors = require('cors');
require("dotenv").config();
const bodyParser = require("body-parser");

// routes
const books = require('./routes/api/books');

const app = express();

// Connect Database
connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello world!'));

// use Routes
app.use('/api/books', books);

// Accessing the path module
const path = require("path");

app.use(express.static(path.resolve(__dirname, "./my-app/build")));
// Step 2:
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./my-app/build", "index.html"));
});

if (process.env.NODE_ENV === "production"|| process.env.NODE_ENV === "staging") {
    app.use(express.static("my-app/build"));
    app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/my-app/build/index.html"));
    });
}


//const port = process.env.PORT || 8082;


const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));