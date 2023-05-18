const express = require('express')
const router = express.Router()
const fetch = require('node-fetch');
const config = require('../config');
const cors = require('cors')
const inputURL = require('url');


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

const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',

};

// Getting all jobs
router.get('/', async (req, res) => {
    try {
        const data = await fetchAdzunaApi(req, res);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch external data' });
    }
})

async function fetchAdzunaApi(req, res) {
    const decodeParams = searchParams => Array
        .from(searchParams.keys())
        .reduce((acc, key) => ({ ...acc, [key]: searchParams.get(key) }), {});

    const requestURL = inputURL.parse(req.url);
    const decodedParams = decodeParams(new URLSearchParams(requestURL.search));
    const { search, location, country = 'us' } = decodedParams;

    const targetURL = `${config.BASE_URL}/${country.toLowerCase()}/${config.BASE_PARAMS}&app_id=${config.APP_ID}&app_key=${config.API_KEY}&what=${search}&where=${location}`;

    console.log(`Proxy GET request to : ${targetURL}`);
    return fetch(targetURL)
        .then(response => response.json())
        .then(data => {
            res.writeHead(200, headers);
            res.end(JSON.stringify(data))
        })
        .catch(response => {
            console.log(response);
            res.writeHead(500, headers);
            res.end(JSON.stringify(response));
        });
}

module.exports = router