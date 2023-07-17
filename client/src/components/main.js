import React, { Component } from 'react'
import '../css/main.css'
import linkedinImg from '../images/Linkedin.jpg'
import IndeedImg from '../images/indeed.jpg'
import UsaJobImg from "../images/usa.jpg"
import AdzunaImg from "../images/adzuna.jpg"
import ZipRecruiterImg from "../images/zipRecruiter.jpg"
import GlassdoorImg from "../images/glassdoor.jpg"


class Main extends Component {
    render() {
        return (
            <html>
                <head>
                    <title>Career Match PRO</title>
                </head>
                    
                <body>
                <section>
                    <div class="Wrapper">
                        <ul class="main_nav-area">
                            <li><a href="/">HOME</a></li>
                            <li><a href="/about">ABOUT</a></li>
                            <li><a href="mailto:zhangf2@wit.edu">CONTACT</a></li>
                        </ul>
                    </div>
                    </section>

                    <section class="hero-section">
                        <div class = "hero">
                        <div class="hero-content">
                            <h1>Career Match PRO</h1>
                            <p>Discover our resources to enhance your career search, uncover invaluable insights, and streamline the job-seeking process. With our comprehensive collection of job APIs, you can access all the opportunities you need in one convenient location, making your job search more efficient and effective.</p>
                            <a href="/signup" class="cta-button">Get Started</a>
                        </div>
                        </div>
                    </section>
                

                   <section class="featured-resources">
                        <h2>Featured Resources</h2>
                        <div class="resource-container">
                            <div class="resource-item">
                                <img src={linkedinImg} />
                                <h3>Linkedin</h3>
                                <p>Connect with professionals, build your network, and showcase your career achievements on the world's largest professional networking platform.</p>
                                <a href="http://linkedin.com" target="_blank" class="resource-link">Read More</a>
                            </div>
                            <div class="resource-item">
                                <img src={IndeedImg}/>
                                <h3>Indeed</h3>
                                <p>Discover millions of job opportunities, browse reviews, and easily apply with the leading job search engine.</p>
                                <a href="https://www.indeed.com/"target="_blank" class="resource-link">Read More</a>
                            </div>
                            <div class="resource-item">
                                <img src={UsaJobImg}/>
                                <h3>USAJobs</h3>
                                <p>Explore government employment opportunities and contribute to public service in various federal agencies across the United States.</p>
                                <a href="https://www.ssa.gov/careers/join/usajobs.html"target="_blank" class="resource-link">Read More</a>
                            </div>
                        </div>
                    </section>

                    <section class="more-resources">
                        <h2>More Resources</h2>
                        <div class="resource-container">
                            <div class="resource-item">
                                <img src={AdzunaImg}/>
                                <h3>Adzuna</h3>
                                <p>A comprehensive job search engine that aggregates listings, expanding opportunities for job seekers and employers alike.</p>
                                <a href="https://www.adzuna.com/" target="_blank"class="resource-link">Read More</a>
                            </div>
                            <div class="resource-item">
                                <img src={ZipRecruiterImg}/>
                                <h3>ZipRecruiter</h3>
                                <p>Streamlining the job search process with a user-friendly interface and effective employer-candidate connections.</p>
                                <a href="https://www.ziprecruiter.com/" target="_blank"class="resource-link">Read More</a>
                            </div>
                            <div class="resource-item">
                                <img src={GlassdoorImg}/>
                                <h3>Glassdoor</h3>
                                <p>The go-to platform for job seekers, offering transparent company information and employee reviews.</p>
                                <a href="https://www.glassdoor.com/" target="_blank"class="resource-link">Read More</a>
                            </div>
                        </div>
                    </section>


                    <footer>
                        <p>&copy; 2023 Your Company. All rights reserved.</p>
                    </footer>
                </body>  
            </html>

        )
    }
}

export default Main;