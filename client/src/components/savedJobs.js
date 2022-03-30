
import React, { Component } from 'react';
import '../css/searchJob.css'

class SearchJob extends Component {
    constructor(props) {
        super(props)
        this.state = {
            results: [],
        }
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    handleOnSubmit = (e) => {

        this.fetchingJobs()

    }

    // authorize user's input
    async fetchingJobs() {
        // fetch jobs
        const response = await fetch('http://localhost:3001/savedJobs');
        if (response.ok) {
            const results = await response.json()
            console.log(results)
            console.log(typeof (results))
            this.setState({ results })
        } 
    }

    jobCard = () => {
        return this.state.results.map(job => {
            return (
                <div>
                    <div class="card">
                        <div class="card-body">
                            <h4 class="card-title">{job.title}</h4>
                            <h5>{job.location}</h5>
                            <p class="card-text">{job.description}</p>
                            <a href={job.redirect_url} target="_blank">View Job</a>
                        </div>
                    </div>
                    <br />
                </div>
            )
        })
    }

    render() {
        return  this.state.results.length > 0 ? (
            <div class='all'>
                <h2 className='savedJobsTitle'>Saved Jobs</h2>
                {this.handleOnSubmit()}
                {this.jobCard()}
            </div>
        ) : (
            <h1>You don't have any saved jobs yet</h1>
        )
    }
}

export default SearchJob;