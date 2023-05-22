const express = require('express')
const router = express.Router()
const fetch = require('node-fetch');
const config = require('../config');
const cors = require('cors')
const inputURL = require('url');
const { title } = require('process');


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
        //const adzunaData = await fetchAdzunaApi(req, res);
        //const usajobsData = await fetchUSAJobsApi(req, res);
        const indeedData = await fetchIndeedApi(req, res);

        //const mergedData = mergeData(adzunaData, usajobsData);
        res.json(indeedData);
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

    const targetURL = `${config.ADZUNA_BASE_URL}/${country.toLowerCase()}/${config.ADZUNA_BASE_PARAMS}&app_id=${config.ADZUNA_APP_ID}&app_key=${config.ADZUNA_API_KEY}&what=${search}&where=${location}`;

    console.log(`Proxy GET request to : ${targetURL}`);
    return fetch(targetURL)
        .then(response => response.json())
        .then(data => {
            const extractedData = data.results.map(item => ({
                jobTitle: item.title,
                jobDescription: item.description,
                organizationName: item.company.display_name,
                url: item.redirect_url,
                jobBoard: 'Adzuna'
            }));

            return extractedData;
        })
        .catch(response => {
            console.log(response);
            res.writeHead(500, headers);
            res.end(JSON.stringify(response));
        });
}

async function fetchUSAJobsApi(req, res) {
    const decodeParams = searchParams => Array
        .from(searchParams.keys())
        .reduce((acc, key) => ({ ...acc, [key]: searchParams.get(key) }), {});

    const requestURL = inputURL.parse(req.url);
    const decodedParams = decodeParams(new URLSearchParams(requestURL.search));
    const { search, location } = decodedParams;

    const targetURL = `https://${config.USAJOBS_HOST}/api/search?Keyword=${search}&LocationName=${location}`;

    console.log(`Proxy GET request to : ${targetURL}`);
    return fetch(targetURL, {
        method: 'GET',
        headers: {
            'Host': config.USAJOBS_HOST,
            'User-Agent': config.USAJOBS_USER_AGENT,
            'Authorization-Key': config.USAJOBS_AUTHORIZATION_KEY
        }
    })
        .then(response => response.json())
        .then(data => {
            const extractedData = data.SearchResult.SearchResultItems.map(item => ({
                jobTitle: item.MatchedObjectDescriptor.PositionTitle,
                jobDescription: item.MatchedObjectDescriptor.UserArea.Details.MajorDuties[0],
                organizationName: item.MatchedObjectDescriptor.OrganizationName,
                url: item.MatchedObjectDescriptor.PositionURI,
                jobBoard: 'USAJOBS'
            }));

            return extractedData;
        })
        .catch(error => {
            console.log(error);
            res.writeHead(500, headers);
            res.end(JSON.stringify(response));
        });
}

function mergeData(adzunaData, usajobsData) {
    const mergedData = adzunaData.concat(usajobsData);

    return mergedData;
}


async function fetchIndeedApi(req, res) {
    const decodeParams = searchParams => Array
        .from(searchParams.keys())
        .reduce((acc, key) => ({ ...acc, [key]: searchParams.get(key) }), {});

    const requestURL = inputURL.parse(req.url);
    const decodedParams = decodeParams(new URLSearchParams(requestURL.search));
    const { search, location } = decodedParams;

    const targetURL = `https://${config.RapidAPIHost}/jobs/search?query=${search}&location=${location}`;

    console.log(`Proxy GET request to : ${targetURL}`);
    return fetch(targetURL, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': config.RapidAPIKey,
            'X-RapidAPI-Host': config.RapidAPIHost
        }
    })
        .then(response => response.json())
        .then(async data => {
            const fullJobData = [];
            for (job of data.hits) {
                const jobLink = job.link
                console.log(jobLink)
                const jobURL = `https://${config.RapidAPIHost}${jobLink}`
                const fullJobResponse = await fetch(jobURL, {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': config.RapidAPIKey,
                        'X-RapidAPI-Host': config.RapidAPIHost,
                    },
                });
                const fullJobDataResponse = await fullJobResponse.json();

                const { job_title, description, indeed_final_url } = fullJobDataResponse;
                const organizationName = fullJobDataResponse.company?.name;

                const jobData = {
                    jobTitle: job_title,
                    jobDescription: description,
                    organizationName: organizationName,
                    url: indeed_final_url,
                    jobBoard: 'indeed'
                };

                fullJobData.push(jobData);
            }

            return fullJobData;
            //res.writeHead(200, headers);
            //res.end(JSON.stringify(data));
        })
        .catch(error => {
            console.log(error);
            res.writeHead(500, headers);
            res.end(JSON.stringify(response));
        });
}

function mergeData(adzunaData, usajobsData) {
    const mergedData = adzunaData.concat(usajobsData);

    return mergedData;
}

module.exports = router