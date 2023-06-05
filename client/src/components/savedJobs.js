
import React, { Component } from 'react';
import '../css/searchJob.css'
import JobCard from './jobCard';
import JobInfo from './jobInfo';

class SavedJobs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            results: [],
            selectedJobIndex: 0
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
            results = allResults.filter(job => job.accountID == localStorage.getItem('userID'));

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

    toggleJobInfo = jobIndex => {
        this.setState(prevState => ({
            selectedJobIndex: prevState.selectedJobIndex === jobIndex ? prevState.selectedJobIndex : jobIndex
        }));
    };



    render() {
        const { results, selectedJobIndex } = this.state
        const selectedJob = results[selectedJobIndex];
        return results.length > 0 ? (
            <div class='all'>
                {/* <h2 className='savedJobsTitle'>Saved Jobs</h2> */}
                <div className="saveBig_Container">
                    <div className="saveCards_Container">
                        {(
                            results.map((job, index) => (
                                <JobCard
                                    job={job}
                                    isSelected={index === selectedJobIndex}
                                    toggleJobInfo={() => this.toggleJobInfo(index)}
                                />
                            ))
                        )}
                    </div>
                    <div className="saveInfo_Container">
                        {selectedJob && <JobInfo job={selectedJob} currentPage="/savedJobs" />}
                    </div>
                </div>
            </div>
        ) : (
            <h1 class='noSavedJobs'>You don't have any saved jobs yet</h1>
        )
    }
}

export default SavedJobs;
