
import React, { Component } from 'react';
import '../css/searchJob.css'
import { ThreeDots } from 'react-loader-spinner';
import JobCard from './jobCard';

class SearchJob extends Component {
    constructor(props) {
        super(props)
        this.state = {
            jobTitleInput: "",
            locationInput: "",
            results: [],
            saveText: "Save Job",
            isLoading: false,
            searchClicked: false,
            key: 1,
        }
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    handleOnSubmit = (e) => {

        //this.fetchingJobs()
        e.preventDefault();

        // Save jobTitleInput and locationInput values to localStorage
        localStorage.setItem('jobTitle', this.state.jobTitleInput);
        localStorage.setItem('location', this.state.locationInput);

        this.setState((prevState) => ({ 
            searchClicked: true,
            key: prevState.key + 1,
        }))

        localStorage.setItem('searchClicked', JSON.stringify(true))


    }

    resetSearchClicked = () => {
        this.setState({ searchClicked: false });
    };

    /*async saveJob(jobTitle, jobLocation, jobDescription, jobUrl) {
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
        let url = 'http://localhost:3001/jobs/?search=' + this.state.jobTitleInput + '&location=' + this.state.locationInput
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

        //console.log(this.state.results)


    }

    jobCard = () => {
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

    }*/

    render() {
        /*const { submitted } = this.state;

        if (submitted) {
            // Render the new component
            return <JobCard />;
        }*/
        //const searchClicked = (JSON.parse(localStorage.getItem('searchClicked')) === true);
        const { searchClicked, key } = this.state
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
                {console.log("is clicked " + this.state.searchClicked)}
                {searchClicked && <JobCard resetSearchClicked={this.resetSearchClicked} key={key}/>} {/* Render the other component conditionally */}
                {/*this.jobCard()*/}
            </div>
        )
    }
}

export default SearchJob;