
import React, { Component } from 'react';
import '../css/searchJob.css'

class SavedJobs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            jobTitleInput: "",
            locationInput: "",
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
        let url = 'http://localhost:3001/savedJobs'
        console.log(url)
        fetch(url).then(response => response.json())
            .then(({ results }) => {
                console.log(results)
                this.setState({ results })
                console.log(this.state.results)
                //this.setState({ results })
                return results.map(job => {
                    return (
                        <div>
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">{job.title}</h4>
                                    <h5>{job.location}</h5>
                                    <p class="card-text">{job.description}</p>
                                    <a href="" target="_blank">View Job</a>
                                </div>
                            </div>
                            <br />
                        </div>

                    )
                })
            })

        //console.log(this.state.results)


    }

    

    render() {
        return (
            <div class='all'>
                
                {this.fetchingJobs()}
            </div>
        )
    }
}

export default SavedJobs;