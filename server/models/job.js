const mongoose = require('mongoose')


// patient schema that will help us connecting to the db.
const jobSchema = new mongoose.Schema({
    jobTitle: {
        type: String,
        //required: true
    },
    jobLocation: {
        type: String,
        //required: true
    },
    jobDescription: {
        type: String,
        //required: true
    },
    organizationName: {
        type: String,
        // required: true
    },
    salary: {
        type: String,
        // required: true
    },
    jobBoard: {
        type: String,
        // required: true
    },
    url: {
        type: String,
        //required: true
    },
    userEmail: {
        type: String,
        //required: true
    },
})

module.exports = mongoose.model('jobs', jobSchema)