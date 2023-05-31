import React from 'react';
import '../css/searchJob.css';

const JobInfo = ({ job }) => {
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
          value="Save Job"
          className="btn"
          id="saveBtn"
          onClick={() => {
            // Save job logic here
          }}
        />
      </div>
    </div>
  );
};

export default JobInfo;