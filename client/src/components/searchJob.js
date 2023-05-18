
import React, { Component } from 'react';
import '../css/searchJob.css'
import JobCard from './jobCard';

class SearchJob extends Component {
    constructor(props) {
        super(props)
        this.state = {
            jobTitleInput: "",
            locationInput: "",
            searchClicked: false,
            key: 1,
        }
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    handleOnSubmit = (e) => {
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

    render() {
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
                {searchClicked && <JobCard resetSearchClicked={this.resetSearchClicked} key={key} />} {/* Render the other component conditionally */}
                {/*this.jobCard()*/}
            </div>
        )
    }
}

export default SearchJob;