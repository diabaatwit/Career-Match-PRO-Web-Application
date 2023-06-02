import React, { Component } from 'react';
import '../css/searchJob.css';

class JobInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActionOccurred: false,
    };
  }


  componentDidUpdate(prevProps) {
    if (prevProps.job !== this.props.job) {
      this.setState({ isActionOccurred: false });
    }
  }

  handleSaveClick = async () => {
    const { job, currentPage } = this.props;
    // Perform save/unsave job API call based on the current page
    if (currentPage === '/home') {
      await this.saveJob(job);
    } else if (currentPage === '/savedjobs') {
      await this.unsaveJob(job);
    }
  };

  async saveJob(job) {
    const newSavedJob = {
      jobTitle: job.jobTitle,
      jobLocation: job.jobLocation,
      jobDescription: job.jobDescription,
      organizationName: job.organizationName,
      salary: job.salary,
      jobBoard: job.jobBoard,
      url: job.url,
      accountID: localStorage.getItem('userID'),
    }

    const newSavedJobOptions = {

      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSavedJob)

    }

    await fetch("http://localhost:3001/savedJobs", newSavedJobOptions)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to save job');
        }
      })
      .then(savedJob => {
        // Update the isSaved state based on the response
        this.setState({ isActionOccurred: !!savedJob });
      })
      .catch(error => console.log('Error:', error));
  }

  async unsaveJob(job) {
    const options = {
      method: "DELETE",
    }

    await fetch(`http://localhost:3001/savedjobs/` + job._id, options)
      .then(response => response.text())
      .catch(error => console.log('error', error));

  }

  render() {
    const { job, currentPage } = this.props;
    const { isActionOccurred } = this.state;
    console.log("before clicking, isActionOccurred is: " + isActionOccurred)

    const actionButtonText = currentPage === '/home' ? (isActionOccurred ? 'Saved' : 'Save Job') : (isActionOccurred ? 'Unsaved' : 'Unsave Job');
    return (
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
            value={actionButtonText}
            className="btn"
            id="saveBtn"
            onClick={this.handleSaveClick}
          />
        </div>
      </div>
    );
  }

};

export default JobInfo;