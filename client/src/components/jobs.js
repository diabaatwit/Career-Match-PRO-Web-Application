import React, { Component } from 'react'
import '../css/searchJob.css'
import { ThreeDots } from 'react-loader-spinner';
import JobCard from './jobCard';
import JobInfo from './jobInfo';

class Jobs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      results: [],
      saveText: "Save Job",
      isLoading: false,
      selectedJobIndex: 0
    }
  }

  componentDidMount() {
    this.fetchingJobs()
  }

  async fetchingJobs() {
    this.setState({ isLoading: true })
    // fetch jobs
    let url = 'http://localhost:3001/jobs/?search=' + localStorage.getItem("jobTitle") + '&location=' + localStorage.getItem("location")
    console.log(url)
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Request failed');
      }

      const results = await response.json();
      console.log(results);
      this.setState({ results: results }, () => {
        console.log('Results are:');
        console.log(this.state.results);
        console.log(localStorage.getItem('userID'));
        this.setState({ isLoading: false }, () => {
          console.log(this.state.isLoading);
        });
      });
    } catch (error) {
      console.log('Error:', error);
      this.setState({ isLoading: false });
    }
  }

  toggleJobInfo = jobIndex => {
    this.setState(prevState => ({
      selectedJobIndex: prevState.selectedJobIndex === jobIndex ? prevState.selectedJobIndex : jobIndex
    }));
  };



  render() {
    console.log("we are here in the job card component")
    const { results, isLoading, selectedJobIndex } = this.state;
    const selectedJob = results[selectedJobIndex];

    return (
      <div className="big_container">
        <div className="Cards_Container">
          {isLoading ? (
            <div className="loader">
              <ThreeDots type="ThreeDots" color="#BADA55" height={100} width={100} />
            </div>
          ) : (
            results.map((job, index) => (
              <JobCard
                job={job}
                isSelected={index === selectedJobIndex}
                toggleJobInfo={() => this.toggleJobInfo(index)}
              />
            ))
          )}
        </div>
        <div className="Info_Container">
          {selectedJob && <JobInfo job={selectedJob} currentPage="/home"/>}
        </div>
      </div>
    );
  }
}

export default Jobs;