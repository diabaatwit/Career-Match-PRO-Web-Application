
import React, { Component } from 'react';
import '../css/searchJob.css'
import Jobs from './jobs';

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

    componentDidMount() {
        // apply style to the html tag to hide the main scrollbar of the page
        document.documentElement.style.height = '100%';
        document.documentElement.style.margin = '0';
        document.documentElement.style.padding = '0';
        document.documentElement.style.position = 'fixed';
        document.documentElement.style.overflow = 'hidden';
    }

    componentWillUnmount() {
        // reset the styles we applied on html tag when compsonent unmounts
        document.documentElement.style.height = '';
        document.documentElement.style.margin = '';
        document.documentElement.style.padding = '';
        document.documentElement.style.position = '';
        document.documentElement.style.overflow = '';
    }

    handleOnSubmit = (e) => {
        e.preventDefault();

        const jobTitleInput = this.state.jobTitleInput.replace(/\s/g, '%20');
        const locationInput = this.state.locationInput.replace(/\s/g, '%20');

        // Save jobTitleInput and locationInput values to localStorage
        localStorage.setItem('jobTitle', jobTitleInput);
        localStorage.setItem('location', locationInput);

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
            <div class='home-all'>
                <div class="searchForm">
                    {/* <h1>Search for Jobs!</h1> */}
                    {/* <form>
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
                    </form> */}

                    <div class="search_header">
                        <form class="form-box">
                            <h1><strong>Search  Jobs  From  Here !</strong></h1>
                            <div class="search_field"></div>
                            <div>
                                <input type="text" class="search-field type"
                                    placeholder= "Job Title"
                                    onChange={(e) => this.setState({ jobTitleInput: e.target.value })}/>
                                <input type="text" class="search-field location"
                                    placeholder="Location"
                                    onChange={(e) => this.setState({ locationInput: e.target.value })}/>
                                <button class="search-btn" type="button" onClick={this.handleOnSubmit}>Search</button>
                            </div>
                        </form>
                    </div>

                </div>
                {console.log("is clicked " + this.state.searchClicked)}
                {searchClicked && <Jobs resetSearchClicked={this.resetSearchClicked} key={key} />} {/* Render the other component conditionally */}
            </div>
        )
    }
}

export default SearchJob;