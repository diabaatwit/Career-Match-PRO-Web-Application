// server/index.js

const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

const mongoose = require('mongoose')

// database url.
const url = 'mongodb+srv://nocturnals:AeT3RFlq38I3BXWp@cluster0.fqifx.mongodb.net/remoteJobDB?retryWrites=true&w=majority'

// connecting to the database
mongoose.connect(url, { useNewUrlParser: true})

// check if the connection was successful or no
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to database'))

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


app.get("/", (req, res) => {
    res.json({ message: "Hello from server!" });
  });
 

// telling the app that we'll use json
app.use(express.json())

// use accounts router in http://localhost:3001/accounts
const accountRouter = require('./routes/accountRestApi')
app.use('/accounts', accountRouter)
app.get("/accounts", (req, res) => {
    res.json({ message: "accounts server" });
  });