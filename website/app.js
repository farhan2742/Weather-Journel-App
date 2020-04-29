/* Global Variables */

const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=432dd66cea586dad2ff84db02e649311";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Helper functions

// fetching data from Open Weather API

const getWeatherData = async (URL, zip, key) => {

	const res = await fetch(URL+zip+key)

	try{
		const weatherData = await res.json();
		return weatherData;
	}
	catch(error){
		console.log("error: " + error);
	}
};

// sending data to local server

const postData = async (url = '', data={}) => {
	const req = await fetch(url, {
		method: 'POST',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json;charset=UTF-8'
		},
		body: JSON.stringify({
			date: data.date,
			temp: data.temp,
			comments: data.comments
		})
	});

	try{
		const newData = await req.json();
		return newData;
	}

	catch(error){
		console.log("error: " + error);
	}
};

// updating UI from data recived from the server

const updateUI = async () => {
	const request = await fetch("/all");
	try {
		const serverData = await request.json();
		const dateDiv = document.getElementById("date");
		const tempDiv = document.getElementById("temp");
		const commentDiv = document.getElementById("content");
		dateDiv.innerText = serverData.date;
		tempDiv.innerText = serverData.temp;
		commentDiv.innerText = serverData.comments;
	} catch(error) {
		console.log("error:" + error);
	}
};

function generateWeather(event){
	event.preventDefault();
	const zipCode = document.getElementById("zip").value;
	const userComment = document.getElementById("feelings").value;
	getWeatherData(baseURL, zipCode, apiKey)
		.then(function (weatherData){
		postData("/addData", {
		date: newDate,
		temp: weatherData.main.temp,
		comments: userComment
		})
	}) .then(function(){
		updateUI();
	})
};

// main function

function main(){
	const genButton = document.getElementById("generate");
	genButton.addEventListener("click",generateWeather);
};


// start program
document.addEventListener("DOMContentLoaded",main());