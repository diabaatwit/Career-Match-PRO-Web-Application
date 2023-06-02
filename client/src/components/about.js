
import React, { Component } from 'react';
import '../css/about.css'

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
                    
                        <div class="section about-section">
                            <h2>About Us</h2>
                            <p>As Wentworth students majoring in Computer Science, 
                                we are fueled by our passion for science and our innate desire to 
                                help people. We strongly believe in the power of technology to drive 
                                positive change and make a difference in the lives of individuals and 
                                communities. Through our studies and experiences, we have gained a deep 
                                understanding of the capabilities of computer 
                                science and its potential to solve complex problems.</p>
                        </div>
                        <div class="section mission-section">
                            <h2>Our Mission</h2>
                            <p>Our mission is to create a user-friendly job search platform that simplifies the process of finding and applying for jobs.</p>
                        </div>
                        <div class="section team-section">
                            <h2>Our Team</h2>
                            <div class="team-member">
                                <img src="../images/jobBG.jpg" alt="Front-end Developer"></img>
                                    <h3>Front-end Developer</h3>
                                    <p>-----Description of the front-end developer.</p>
                            </div>
                            <div class="team-member">
                                <img src="backend_dev.jpg" alt="Back-end Developer"></img>
                                    <h3>Back-end Developer</h3>
                                    <p>-----Description of the back-end developer.</p>
                            </div>
                        </div>
                        <div class="section social-section">
                            <h2>Social Information</h2>
                            <ul>
                                <li><a href="#">Facebook</a></li>
                                <li><a href="#">Twitter</a></li>
                                <li><a href="#">LinkedIn</a></li>
                            </ul>
                        </div>
                        <div class="section contact-section">
                            <h2>Contact Us</h2>
                            <p>If you have any questions or need assistance, please feel free to contact us.</p>
                        </div>
                    </div>
            </body>

        )
    }
}

export default AboutUs;