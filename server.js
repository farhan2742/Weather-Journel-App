// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes

const express = require('express');

// Start up an instance of app

const app = express();

/* Dependancies*/

/* Middleware*/

const bodyParser = require('body-parser');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance

const cors = require('cors');

app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Post routes

const data = [];

app.post("/addData", addData)

function addData(req, res) {
	projectData['date'] = req.body.date;
	projectData['temp'] = req.body.temp;
	projectData['comments'] = req.body.comments;

	res.send(projectData);
}

// Get routes

app.get("/all", sendInfo);

function sendInfo(req, res) {
	res.send(projectData);
}

// Setup Server

const port = 3000

const server = app.listen(port, listening());

function listening() {
	console.log(`The server has started on port: ${port}`);
}