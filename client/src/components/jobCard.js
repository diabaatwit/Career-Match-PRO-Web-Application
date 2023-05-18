import React, { Component } from 'react'
import '../css/searchJob.css'
import { ThreeDots } from 'react-loader-spinner';

class JobCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            results: [],
            saveText: "Save Job",
            isLoading: false,
        }
        //this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    /*handleOnSubmit = (e) => {

        this.fetchingJobs()

    }*/

    componentDidMount() {
        this.fetchingJobs()
      }

    async saveJob(jobTitle, jobLocation, jobDescription, jobUrl) {
        const newSavedJob = {
            title: jobTitle,
            date: jobLocation,
            description: jobDescription,
            url: jobUrl,
            accountID: localStorage.getItem('userID'),
        }

        const newSavedJobOptions = {

            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newSavedJob)

        }

        await fetch("http://localhost:3001/savedJobs", newSavedJobOptions)

            .then(response => response.text())
            .catch(error => console.log('error', error));

    }

    changeText = (id, saveText) => {
        console.log("id=" + id);

        this.setState({ saveText });
    }

    // authorize user's input
    async fetchingJobs() {
        this.setState({ isLoading: true })
        // fetch jobs
        let url = 'http://localhost:3001/jobs/?search=' + localStorage.getItem("jobTitle") + '&location=' + localStorage.getItem("location")
        console.log(url)
        fetch(url).then(response => response.json())
            .then(({ results }) => {
                console.log(this.state.isLoading)
                console.log(results)
                this.setState({ results })
                console.log(this.state.results)
                console.log(localStorage.getItem('userID'))
                this.setState({ isLoading: false })
                console.log(this.state.isLoading)
                //this.setState({ results })
            })
        localStorage.setItem("searchClicked", JSON.stringify(false))
        //console.log(this.state.results)


    }

    render() {
        console.log("we are here in the job card component")
        return this.state.isLoading ? (
            <div class="loader">
                <ThreeDots type="ThreeDots" color="#BADA55" height="100" width="100" />
            </div>
        ) : (
            this.state.results.map(job => {
                return (
                    <div>
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title">{job.title}</h4>
                                <h5>{job.location.display_name}</h5>
                                <p class="card-text">{job.description}</p>
                                <button class='btn' onClick={() => { window.open(job.redirect_url, "_blank") }}>View Job</button>
                                <input type="button" value={this.state.saveText} class='btn' id='saveBtn' onClick={(e) => { e.target.value = "Saved"; this.saveJob(job.title, job.location.display_name, job.description, job.redirect_url); }} />
                            </div>
                        </div>
                        <br />
                    </div>
                )
            })
        )
    }
}

export default JobCard;