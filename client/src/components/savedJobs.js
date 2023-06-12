
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
            results = allResults.filter(job => job.userEmail == localStorage.getItem('email'));

            console.log(results)

            this.setState({ results })
        }
    }

    unsaveJob = (jobID) => {
        const updatedResults = this.state.results.filter(job => job._id !== jobID);
        this.setState({ results: updatedResults });

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
            <div class='savedJobs-all'>
                <h2 className='savedJobsTitle'>Your saved jobs!</h2>
                <div className="savedJobsBigContainer">
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
                        {selectedJob && <JobInfo job={selectedJob} currentPage="/savedJobs" removeJob={this.unsaveJob} />}
                    </div>
                </div>
            </div>
        ) : (
            <h1 class='noSavedJobs'>You don't have any saved jobs yet!</h1>
        )
    }
}

export default SavedJobs;
