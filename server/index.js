// server/index.js

const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();
const bodyparser = require('body-parser');

const mongoose = require('mongoose')

const fetch = require('node-fetch');
const inputURL = require('url');
const router = express.Router()
const config = require('./config');

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
 
};

// database url.
const url = 'mongodb+srv://nocturnals:AeT3RFlq38I3BXWp@cluster0.fqifx.mongodb.net/remoteJobDB?retryWrites=true&w=majority'

// connecting to the database
mongoose.connect(url, { useNewUrlParser: true })

// check if the connection was successful or no
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to database'))

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.use(bodyparser.json());


app.get("/", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// use accounts router in http://localhost:3001/accounts
const accountRouter = require('./routes/accountRestApi')
app.use('/accounts', accountRouter)
app.get("/accounts", (req, res) => {
  res.json({ message: "accounts server" });
});

// use jobs router in http://localhost:3001/accounts/accountID/savedJobs
const jobRouter = require('./routes/jobRestApi')
app.use('/savedJobs', jobRouter)
app.get("/accounts", (req, res) => {
  res.json({ message: "jobs server" });
});

app.get("/jobs", (req, res) => {
  const requestURL = inputURL.parse(req.url);
  const decodedParams = decodeParams(new URLSearchParams(requestURL.search));
  const { search, location, country = 'us' } = decodedParams;

  const targetURL = `${config.BASE_URL}/${country.toLowerCase()}/${config.BASE_PARAMS}&app_id=${config.APP_ID}&app_key=${config.API_KEY}&what=${search}&where=${location}`;
  
    console.log(`Proxy GET request to : ${targetURL}`);
    fetch(targetURL)
      .then(response => response.json())
      .then(data => {
        res.writeHead(200, headers);
        res.end(JSON.stringify(data))})
      .catch(response => {
        console.log(response);
        res.writeHead(500, headers);
        res.end(JSON.stringify(response));
      });
  
})


// telling the app that we'll use json
app.use(express.json())

const decodeParams = searchParams => Array
  .from(searchParams.keys())
  .reduce((acc, key) => ({ ...acc, [key]: searchParams.get(key) }), {});

