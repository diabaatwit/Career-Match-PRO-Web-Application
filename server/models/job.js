const mongoose = require('mongoose')


// patient schema that will help us connecting to the db.
const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        //required: true
    },
    location: {
        type: String,
        //required: true
    },
    description: {
        type: String,
        //required: true
    },
})

module.exports = mongoose.model('jobs', jobSchema)