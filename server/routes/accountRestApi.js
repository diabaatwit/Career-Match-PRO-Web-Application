const express = require('express')
const router = express.Router()
const cors = require('cors')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");

const JWT_SECRET =
  "1234567890-=!@#$%^^&*()_+qwertyuuiopl;'kjhgfdsazxcvbnm,./<>?~{}QWERTYUIOPASDFGHJKLMNBVCXZ";


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

// adding an account
router.post('/sign-up', async (req, res) => {
  const { firstName, lastName, email, phoneNumber, password } = req.body;
  const encryptedPassword = await encryptPassword(password)

  const account = new Account({
    firstName: firstName,
    lastName: lastName,
    email: email,
    phoneNumber: phoneNumber,
    password: encryptedPassword
  })
  try {
    const existingAccount = await Account.findOne({ email })
    if (existingAccount) {
      return res.status(409).json({ error: "User Exists!" })
    }
    // add the account
    const newAccount = await account.save()
    res.header("Access-Control-Allow-Origin", "*")
    res.status(201).json(newAccount)
  } catch (err) {
    // if error, display error 400
    res.status(400).json({ message: err.message })
  }
});

router.post("/login-user", async (req, res) => {
  const { email, password } = req.body;

  const account = await Account.findOne({ email });
  if (!account) {
    return res.status(404).json({ error: "User Not found" });
  }
  if (await bcrypt.compare(password, account.password)) {
    /*const { firstName, lastName, email } = account; // Extract firstName, lastName, email from account object

    return res.status(200).json({ firstName, lastName, email }); // Return the extracted data*/
    const token = jwt.sign({ email: account.email }, JWT_SECRET, {
      expiresIn: "15m",
    });

    if (res.status(201)) {
      return res.status(201).json({ userToken: token });
    } else {
      return res.json({ error: "error" });
    }
  }
  res.status(401).json({ error: "Invalid Password" });
});

const encryptPassword = async (password) => {
  try {
    const encryptedPassword = await bcrypt.hash(password, 10);
    return encryptedPassword;
  } catch (error) {
    throw new Error("Encryption failed: " + error);
  }
};

router.post("/user-data", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET, (err, res) => {
      if (err) {
        return "token expired";
      }
      return res;
    });
    if (user == "token expired") {
      return res.send({ status: "error", data: "token expired" });
    }

    const useremail = user.email;
    Account.findOne({ email: useremail })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) { }
});


module.exports = router