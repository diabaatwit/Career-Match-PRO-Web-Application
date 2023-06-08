const express = require('express')
const router = express.Router()
const cors = require('cors')
const bcrypt = require('bcryptjs')

//Give write access to server
const whitelist = ["http://localhost:3000", "https://whimsical-begonia-2907aa.netlify.app"]
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}
router.use(cors(corsOptions))


// get account schema from ../models/account
const Account = require('../models/account')
const { default: mongoose } = require('mongoose')

// Getting all accounts
router.get('/', async (req, res) => {
  try {
    // get all accounts, and retrieve it in json format.
    const accounts = await Account.find()
    res.header("Access-Control-Allow-Origin", "*")
    res.json(accounts)
  }
  catch (err) {
    // if error, display error 500
    res.status(500).json({ message: err.message })
  }
})

// getting one account
router.get('/:id', getAccount, (req, res) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.json(res.account)
})

// adding an account
router.post('/', async (req, res) => {
  const encryptedPassword = await encryptPassword(req.body.password)
  console.log("Encrypted password is: " + encryptedPassword)

  const account = new Account({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    password: encryptedPassword
  })
  try {
    const existingAccount = await Account.findOne({ email })
    if(existingAccount) {
      return res.status(409).json({ error: "User Exists!" })
    }
    // add the account
    const newAccount = await account.save()
    res.header("Access-Control-Allow-Origin", "*")
    console.log(newAccount)
    res.status(201).json(newAccount)
  } catch (err) {
    // if error, display error 400
    res.status(400).json({ message: err.message })
  }
});

// deleting an account
router.delete('/:id', getAccount, async (req, res) => {
  try {
    // delete account with this id.
    await res.account[0].remove()
    res.json({ message: 'Account deleted' })
  } catch (err) {
    // if error, display error 500
    res.status(500).json({ message: err.message })
  }
})


// getting a specific account by id
async function getAccount(req, res, next) {
  let account = []
  try {
    // get account by id.
    account[0] = await Account.findById(req.params.id)
    // if there is no account with this id, display cannot find account.
    if (account == null) {
      return res.status(404).json({ message: 'Cannot find account' })
    }
  } catch (err) {
    // if error, display error 500
    return res.status(500).json({ message: err.message })
  }

  res.account = account
  next()
}

const encryptPassword = async (password) => {
  try {
    const encryptedPassword = await bcrypt.hash(password, 10);
    return encryptedPassword;
  } catch (error) {
    throw new Error("Encryption failed: " + error);
  }
};


module.exports = router