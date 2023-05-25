
import React, { Component } from 'react';
import '../css/searchJob.css'

class SearchJob extends Component {
    constructor(props) {
        super(props)
        this.state = {
            results: [],
        }
    }



    // authorize user's input
    async componentDidMount() {
        let results = []
        // fetch jobs
        const response = await fetch('http://localhost:3001/savedJobs');
        if (response.ok) {
            const allResults = await response.json()
            console.log(allResults)
            for (let i = 0; i < allResults.length; i++) {
                if (allResults[i].accountID == localStorage.getItem('userID')) {
                    results[i] = allResults[i]
                }
            }

            console.log(results)

            this.setState({ results })
        }
    }

    async unsaveJob(jobID) {
        const options = {
            method: "DELETE",
        }

        await fetch(`http://localhost:3001/savedjobs/` + jobID, options)
            .then(response => response.text())
            .catch(error => console.log('error', error));

    }

    jobCard = () => {
        return this.state.results.map(job => {
            return (
                <div>
                    <div class="card">
                        <div class="card-body">
                            <h4 class="card-title">{job.jobTitle} - {job.jobBoard}</h4>
                            <h5 class="card-title">{job.organizationName}</h5>
                            <h6>{job.jobLocation}</h6>
                            <h6>{job.salary}</h6>
                            <p class="card-text">{job.jobDescription}</p>
                            <button class='btn' onClick={() => { window.open(job.url, "_blank") }}>View Job</button>
                            <input type="button" value="Unsave" class='btn' id='unsaveBtn' onClick={(e) => { e.target.value = "Unsaved"; this.unsaveJob(job._id); }} />
                        </div>
                    </div>
                    <br />
                </div>
            )
        })
    }

    render() {
        const { results } = this.state
        return results.length > 0 ? (
            <div class='all'>
                <h2 className='savedJobsTitle'>Saved Jobs</h2>
                {this.jobCard()}
            </div>
        ) : (
            <h1 class='noSavedJobs'>You don't have any saved jobs yet</h1>
        )
    }
}

export default SearchJob;