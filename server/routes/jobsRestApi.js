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
        const jobsData = await mergeData(req, res);
        res.json(jobsData);
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
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Invalid response from Adzuna API');
            }
        })
        .then(data => {
            const extractedData = data.results.map(item => ({
                jobTitle: item.title,
                jobDescription: item.description,
                jobLocation: item.location.display_name,
                organizationName: item.company.display_name,
                salary: `$${item.salary_min} - estimated`,
                url: item.redirect_url,
                jobBoard: 'Adzuna'
            }));

            return extractedData;
        })
        .catch(error => {
            console.log(error);
            return [];
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
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Invalid response from USAJOBS API');
            }
        })
        .then(data => {
            const extractedData = data.SearchResult.SearchResultItems.map(item => ({
                jobTitle: item.MatchedObjectDescriptor.PositionTitle,
                jobDescription: item.MatchedObjectDescriptor.UserArea.Details.MajorDuties[0],
                jobLocation: item.MatchedObjectDescriptor.PositionLocationDisplay,
                organizationName: item.MatchedObjectDescriptor.OrganizationName,
                salary: `$${item.MatchedObjectDescriptor.PositionRemuneration[0].MinimumRange} - $${item.MatchedObjectDescriptor.PositionRemuneration[0].MaximumRange}`,
                url: item.MatchedObjectDescriptor.PositionURI,
                jobBoard: 'USAJOBS'
            }));

            return extractedData;
            /*res.writeHead(200, headers);
            res.end(JSON.stringify(data));*/
        })
        .catch(error => {
            console.log(error);
            return[];
        });
}

/*async function fetchIndeedApi(req, res) {
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
                        'X-RapidAPI-Key': config.RAPID_API_KEY,
                        'X-RapidAPI-Host': config.RAPID_INDEED_API_HOST,
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
}*/

async function fetchIndeedApi(req, res) {
    const decodeParams = searchParams => Array
        .from(searchParams.keys())
        .reduce((acc, key) => ({ ...acc, [key]: searchParams.get(key) }), {});

    const requestURL = inputURL.parse(req.url);
    const decodedParams = decodeParams(new URLSearchParams(requestURL.search));
    const { search, location } = decodedParams;

    const targetURL = 'https://indeed11.p.rapidapi.com/';
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': config.RAPID_API_KEY,
            'X-RapidAPI-Host': config.RAPID_INDEED_API_HOST
        },
        body: JSON.stringify({
            search_terms: search,
            location: location,
            page: '1'
        })
    }

    console.log(`Proxy POST request to : ${targetURL}`);
    return fetch(targetURL, options)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Invalid response from LinkedIn Jobs API');
            }
        })
        .then(data => {
            const extractedData = data.map(item => ({
                jobTitle: item.job_title,
                jobDescription: item.summary,
                jobLocation: item.location,
                organizationName: item.company_name,
                salary: item.salary,
                url: item.url,
                jobBoard: 'Indeed'
            }));

            return extractedData;

        })
        .catch(error => {
            console.log(error);
            return [];
        });
}

async function fetchLinkedinApi(req, res) {
    const decodeParams = searchParams => Array
        .from(searchParams.keys())
        .reduce((acc, key) => ({ ...acc, [key]: searchParams.get(key) }), {});

    const requestURL = inputURL.parse(req.url);
    const decodedParams = decodeParams(new URLSearchParams(requestURL.search));
    const { search, location } = decodedParams;

    const targetURL = 'https://linkedin-jobs-search.p.rapidapi.com/';
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': config.RAPID_API_KEY,
            'X-RapidAPI-Host': config.RAPID_LINKEDIN_API_HOST
        },
        body: JSON.stringify({
            search_terms: search,
            location: location,
            page: '1'
        })
    }

    console.log(`Proxy POST request to : ${targetURL}`);
    return fetch(targetURL, options)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Invalid response from LinkedIn Jobs API');
            }
        })
        .then(data => {
            const extractedData = data.map(item => ({
                jobTitle: item.job_title,
                jobDescription: '',
                jobLocation: item.job_location,
                organizationName: item.company_name,
                salary: '',
                url: item.linkedin_job_url_cleaned,
                jobBoard: 'Linkedin'
            }));

            return extractedData;

        })
        .catch(error => {
            console.log(error);
            return [];
        });
}


async function mergeData(req, res) {
    try {
        const [adzunaData, usajobsData, indeedData, linkedinData] = await Promise.all([
            fetchAdzunaApi(req, res),
            fetchUSAJobsApi(req, res),
            fetchIndeedApi(req, res),
            fetchLinkedinApi(req, res)
        ]);

        const mergedData = linkedinData.concat(indeedData, adzunaData, usajobsData);

        return mergedData;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch data from one or more APIs');
    }
}

module.exports = router