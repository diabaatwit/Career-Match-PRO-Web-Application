
import React, { Component } from 'react';
import '../css/about.css'
import team from '../images/team.jpeg'

class AboutUs extends Component {
    render() {
        return (
            <body class='all'>
                <div class='bkg'>
                    <ul class="nav-ele">
                        <li><a href="/">HOME</a></li>
                        <li><a href="/about">ABOUT</a></li>
                        <li><a href="mailto:zhangf2@wit.edu">CONTACT</a></li>
                    </ul>
                    <div>
                        <h1 class='about-title'>About Us</h1>
                        <div class='about-body'>We are a team Research Team. A team of 3 students (Fengnan Zhang, Ahmed Diab, and Minh Quach). A students at Wentworth Institute of Technology.
                            We are building a job board website that will help people apply for jobs and a more convinient way.</div>
                    </div>
                    <div>
                        <h1 class='mission-title'>Our Mission</h1>
                        <div class='mission-body'>Our mission is to help people search for jobs in a more convinient way. When anyone try to apply for jobs, they need to visit many job boards, like LinkedIn, Indeed and Monster, and apply for jobs in each one.
                            So our goal is create a website that allows users to search for jobs from all these job boards in one time. Simply, We are trying to merge all job boards websites in a one website.</div>
                    </div>
                    <br /><br />
                    <div class='team'>
                        <img src={team} />
                    </div>


                </div>
            </body>


        )
    }
}

export default AboutUs;