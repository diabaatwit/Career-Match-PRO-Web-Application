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
      selectedJobIndex: 0
    }
  }

  componentDidMount() {
    this.fetchingJobs()
  }

  async saveJob(jobTitle, jobLocation, jobDescription, organizationName, salary, jobBoard, url) {
    const newSavedJob = {
      jobTitle: jobTitle,
      jobLocation: jobLocation,
      jobDescription: jobDescription,
      organizationName: organizationName,
      salary: salary,
      jobBoard: jobBoard,
      url: url,
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
    return (
      <div className="container">
        <div className="jobCardsContainer">
          {this.state.isLoading ? (
            <div className="loader">
              <ThreeDots type="ThreeDots" color="#BADA55" height={100} width={100} />
            </div>
          ) : (
            this.state.results.map((job, index) => {
              const isJobSelected = this.state.selectedJobIndex === index;
              return (
                <div key={index} className={`card${isJobSelected ? " selected" : ""}`}>
                  <div className="card-body" onClick={() => this.toggleJobInfo(index)}>
                    <h4 className="card-title">{job.jobTitle} - {job.jobBoard}</h4>
                    <h5 className="card-title">{job.organizationName}</h5>
                    <h6>{job.jobLocation}</h6>
                    <h6>{job.salary}</h6>

                  </div>
                </div>
              );
            })
          )}
        </div>
        <div className="jobInfoContainer">
          {this.state.results.map((job, index) => {
            const isJobSelected = this.state.selectedJobIndex === index;
            return (
              <React.Fragment key={index}>
                {isJobSelected && (
                  <div className="jobInfoBody">
                    <h4 className="jobInfoTitle">{job.jobTitle} - {job.jobBoard}</h4>
                    <div className="jobInfoDetails">
                      <div className="jobInfoColumn">
                        <h5 className="jobInfoSubtitle">Organization:</h5>
                        <p className="jobInfoText">{job.organizationName}</p>
                        <h5 className="jobInfoSubtitle">Location:</h5>
                        <p className="jobInfoText">{job.jobLocation}</p>
                      </div>
                      <div className="jobInfoColumn">
                        <h5 className="jobInfoSubtitle">Salary:</h5>
                        <p className="jobInfoText">{job.salary}</p>
                      </div>
                    </div>
                    <div className="jobInfoDescription">
                      <h5 className="jobInfoSubtitle">Description:</h5>
                      <p className="jobInfoText">{job.jobDescription}</p>
                    </div>
                    <div className="jobInfoActions">
                      <button className="btn" onClick={() => window.open(job.url, '_blank')}>View Job</button>
                      <input
                        type="button"
                        value={this.state.saveText}
                        className="btn"
                        id="saveBtn"
                        onClick={(e) => {
                          e.target.value = 'Saved';
                          this.saveJob(
                            job.jobTitle,
                            job.jobLocation,
                            job.jobDescription,
                            job.organizationName,
                            job.salary,
                            job.jobBoard,
                            job.url
                          );
                        }}
                      />
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    );
  }
}

export default JobCard;