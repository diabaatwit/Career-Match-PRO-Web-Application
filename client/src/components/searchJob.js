
import React, { Component } from 'react';
import '../css/searchJob.css'

class SearchJob extends Component {
    constructor(props) {
        super(props)
        this.state = {
            jobTitleInput: "",
            locationInput: "",
            results: [],
            saveText: "Save Job"
        }
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    handleOnSubmit = (e) => {

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

        //let saveBTN = document.getElementById('saveBtn')
        //this.textContent = 'Saved'

    }

    changeText = (id, saveText) => {
        console.log("id="+id);

        this.setState({ saveText });
        /*let btnSave = document.getElementById('saveBtn')
        btnSave.addEventListener('click', function(event){
            console.log('clicked')
            event.stopPropagation()
        })*/
    }

    // authorize user's input
    async fetchingJobs() {
        // fetch jobs
        let url = 'http://localhost:3001/jobs/?search=' + this.state.jobTitleInput + '&location=' + this.state.locationInput
        console.log(url)
        fetch(url).then(response => response.json())
            .then(({ results }) => {
                console.log(results)
                this.setState({ results })
                console.log(this.state.results)
                console.log(localStorage.getItem('userID'))
                //this.setState({ results })
            })

        //console.log(this.state.results)


    }

    jobCard = () => {
        return this.state.results.map(job => {
            return (
                <div>
                    <div class="card">
                        <div class="card-body">
                            <h4 class="card-title">{job.title}</h4>
                            <h5>{job.location.display_name}</h5>
                            <p class="card-text">{job.description}</p>
                            <button class='btn' onClick={() => { window.open(job.redirect_url, "_blank") }}>View Job</button>
                            <input type="button" value={this.state.saveText} class='btn' id='saveBtn' onClick={(e) => { e.target.value = "Saved"; this.saveJob(job.title, job.location.display_name, job.description, job.redirect_url); }}/>
                        </div>
                    </div>
                    <br />
                </div>
            )
        })
    }

    render() {
        return (
            <div class='all'>
                <div class="searchForm">
                    <h1>Search for Jobs!</h1>
                    <form>
                        <div id="invalidMsg"></div>
                        <div class="search_field">
                            <input type="text" required={true}
                                onChange={(e) => this.setState({ jobTitleInput: e.target.value })} />
                            <span></span>
                            <label>Job Title</label>
                        </div>
                        <div class="search_field">
                            <input type="text" required={true}
                                onChange={(e) => this.setState({ locationInput: e.target.value })} />
                            <span></span>
                            <label>Location</label>
                        </div>
                        <input id="searchBtn" value="Search" onClick={this.handleOnSubmit} />
                    </form>

                </div>
                {this.jobCard()}
            </div>
        )
    }
}

export default SearchJob;