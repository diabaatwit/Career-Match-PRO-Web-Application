const express = require('express')
const router = express.Router()


// get account schema from ../models/account
const Account = require('../models/account')

// Getting all exams
router.get('/', async (req, res) => {
    try {
        // get all exams, and retrieve it in json format.
        const accounts = await Account.find()
        res.header("Access-Control-Allow-Origin", "*")
        res.json(accounts)
    }
    catch (err) {
        // if error, display error 500
        res.status(500).json({ message: err.message})
    }
})

// adding an account
router.post('/', async (req, res) => {
    const account = new Account({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      password: req.body.password
    })
    try {
        // add the account
        const newAccount = await account.save()
        console.log(newAccount)
        res.status(201).json(newAccount)
    } catch (err) {
        // if error, display error 400
        res.status(400).json({ message: err.message })
    }
});


module.exports = router