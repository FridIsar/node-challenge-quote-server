const { response } = require("express");
// server.js
// This is where your node app starts

//load the 'express' module which makes writing webservers easy
const express = require("express");
const app = express();
const fs = require('fs')

//load the quotes JSON
const quotes = require("./quotes.json");

// Now register handlers for some routes:
//   /                  - Return some helpful welcome info (text)
//   /quotes            - Should return all quotes (json)
//   /quotes/random     - Should return ONE quote (json)
app.get("/", function (request, response) {
  response.send("Ali's Quote Server!  Ask me for /quotes/random, or /quotes");
});

//START OF YOUR CODE...
app.get('/quotes', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.sendFile(__dirname + '/quotes.json');
});

app.get('/quotes/random', (req, res) => {
  fs.readFile(__dirname + '/quotes.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading quotes file');
    }
    const quotes = JSON.parse(data);
    const quote = pickFromArray(quotes);
    res.send(quote);
  });
});

// Define the /quotes/search route
app.get('/quotes/search', (req, res) => {
  // Get the search term from the query string
  const term = req.query.term.toLowerCase();

  // Filter the quotes array to only include quotes that contain the search term in the "quote" key
  const filteredQuotes = quotes.filter((el) => el.quote.toLowerCase().includes(term));

  // Send the filtered quotes array as the response
  res.send(filteredQuotes);
});
//...END OF YOUR CODE

//You can use this function to pick one element at random from a given array
//example: pickFromArray([1,2,3,4]), or
//example: pickFromArray(myContactsArray)
//
function pickFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

module.exports = app;