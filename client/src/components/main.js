import React, { Component } from 'react'
import '../css/main.css'


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
                                <img src="..img..linkedin_pic" alt="Resource 1"></img>
                                <h3>Linkedin</h3>
                                <p>Connect with professionals, build your network, and showcase your career achievements on the world's largest professional networking platform.</p>
                                <a href="#" class="resource-link">Read More</a>
                            </div>
                            <div class="resource-item">
                                <img src="resource2.jpg" alt="Resource 2"></img>
                                <h3>InDeed</h3>
                                <p>Discover millions of job opportunities, browse reviews, and easily apply with the leading job search engine.</p>
                                <a href="#" class="resource-link">Read More</a>
                            </div>
                            <div class="resource-item">
                                <img src="resource3.jpg" alt="Resource 3"></img>
                                <h3>USA Jobs</h3>
                                <p>Explore government employment opportunities and contribute to public service in various federal agencies across the United States.</p>
                                <a href="#" class="resource-link">Read More</a>
                            </div>
                        </div>
                    </section>

                    <section class="more-resources">
                        <h2>More Resources</h2>
                        <div class="resource-container">
                            <div class="resource-item">
                                <img src="resource4.jpg" alt="Resource 4"></img>
                                <h3>Tittle</h3>
                                <p> description</p>
                                <a href="#" class="resource-link">Read More</a>
                            </div>
                            <div class="resource-item">
                                <img src="resource5.jpg" alt="Resource 5"></img>
                                <h3>Resource 5 Title</h3>
                                <p>Resource 5 description goes here.</p>
                                <a href="#" class="resource-link">Read More</a>
                            </div>
                            <div class="resource-item">
                                <img src="resource6.jpg" alt="Resource 6"></img>
                                <h3>Resource 6 Title</h3>
                                <p>Resource 6 description goes here.</p>
                                <a href="#" class="resource-link">Read More</a>
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