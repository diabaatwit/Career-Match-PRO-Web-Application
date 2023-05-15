const express = require('express')
const router = express.Router()
const cors = require('cors')


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


// get job schema from ../models/job
const Job = require('../models/job')

// Getting all jobs
router.get('/', async (req, res) => {
    try {
        // get all jobs, and retrieve it in json format.
        const jobs = await Job.find()
        res.header("Access-Control-Allow-Origin", "*")
        res.json(jobs)
    }
    catch (err) {
        // if error, display error 500
        res.status(500).json({ message: err.message })
    }
})

// getting one job
router.get('/:id', getJob, (req, res) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.json(res.job)
})

// adding a job
router.post('/', async (req, res) => {
    const job = new Job({
        title: req.body.title,
        location: req.body.location,
        description: req.body.description,
        url: req.body.url,
        accountID: req.body.accountID,
    })
    try {
        // add the job
        const newJob = await job.save()
        res.header("Access-Control-Allow-Origin", "*")
        console.log(newJob)
        res.status(201).json(newJob)
    } catch (err) {
        // if error, display error 400
        res.status(400).json({ message: err.message })
    }
});

// deleting a job
router.delete('/:id', getJob, async (req, res) => {
    try {
        // delete job with this id.
        await res.job[0].remove()
        res.json({ message: 'Job deleted' })
    } catch (err) {
        // if error, display error 500
        res.status(500).json({ message: err.message })
    }
})


// getting a specific job by id
async function getJob(req, res, next) {
    let job = []
    try {
        // get job by id.
        job[0] = await Job.findById(req.params.id)
        // if there is no job with this id, display cannot find job.
        if (job == null) {
            return res.status(404).json({ message: 'Cannot find job' })
        }
    } catch (err) {
        // if error, display error 500
        return res.status(500).json({ message: err.message })
    }

    res.job = job
    next()
}


module.exports = router