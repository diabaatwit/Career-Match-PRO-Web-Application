import React, { Component } from 'react';
import '../css/searchJob.css';

class JobCard extends Component {
  render() {
    const { job, isSelected, toggleJobInfo } = this.props;

    return (
      <div
        className={`card${isSelected ? ' selected' : ''}`}
        onClick={toggleJobInfo}
      >
        <div className="card-body">
          <h4 className="card-title">{job.jobTitle} - {job.jobBoard}</h4>
          <h5 className="card-title">{job.organizationName}</h5>
          <h6>{job.jobLocation}</h6>
          <h6>{job.salary}</h6>
        </div>
      </div>
    );
  }
}

export default JobCard;