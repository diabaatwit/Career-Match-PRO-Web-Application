
import React, { Component } from 'react';
import '../css/searchJob.css'

class SearchJob extends Component {
    constructor(props) {
        super(props)
        this.state = {
            jobTitleInput: "",
            locationInput: "",
            jobs: [],
        }
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    handleOnSubmit = (e) => {

        this.fetchingJobs()

    }

    // authorize user's input
    async fetchingJobs() {
        // fetch jobs
        let url = 'http://localhost:3001/jobs/?search=' + this.state.jobTitleInput + '&location=' + this.state.locationInput
        console.log(url)
        /*fetch(url).then(response => response.json())
                  .then(({results})=>{
                      console.log(results)
                  })*/


    }

    render() {
        return (
           
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
            
        )
    }
}

export default SearchJob;