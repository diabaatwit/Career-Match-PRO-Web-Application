import React, { Component } from 'react';
import '../css/about.css'
import frond_end from '../images/amanda.jpg'; // adjust the path as needed
import back_end from '../images/ahmed.jpg';
import emailjs from 'emailjs-com';


class AboutUs extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userEmail: "",
            userName: "",
            userMessage: ""
        }
        this.sendEmail = this.sendEmail.bind(this);
    }
    
    
    sendEmail(event) {
        event.preventDefault();

        const userName = document.getElementById('name').value;
        const userEmail = document.getElementById('email').value;
        const userMessage = document.getElementById('message').value;
    
        this.setState({ userEmail, userName, userMessage }, () => {
            console.log("Email is: " + this.state.userEmail);
        
            emailjs
              .send(
                'service_mtxq05r',            // service id
                'template_q6g6xmc',           // template id
                {
                  to_name: 'Career Match PRO Support Team',
                  from_name: this.state.userName,
                  from_email: this.state.userEmail,
                  message: this.state.userMessage
                },
                'Te0ItpVk8xE-hQauW'           // public key
              )
              .then((response) => {
                console.log('Email sent successfully!', response.text);
                alert("Your message was sent successfully to our support team!")
                
              })
              .catch((error) => {
                console.error('Error sending email:', error);
              });
          });
        }
      
      
    render() {
        return (
            <div className='all'>
                <div className='bkg'>
                    <ul className="nav-ele">
                        <li><a href="/">HOME</a></li>
                        <li><a href="/about">ABOUT</a></li>
                        <li><a href="mailto:zhangf2@wit.edu">CONTACT</a></li>
                    </ul>

                    <div className="section about-section">
                        <h2>About Us & Our Mission</h2>
                        <p>At Career Match PRO, our mission is to empower job seekers with the tools they need to succeed in their career journeys. 
                            We believe that finding the right job should be a seamless and enriching experience. Our platform brings together APIs from multiple job boards, 
                            providing users with a comprehensive and diverse range of job opportunities. We strive to streamline the job search process, making it more efficient and effective. 
                            By merging data from various sources into one unified platform, we aim to revolutionize the way people search for employment. 
                            Our mission is to empower individuals to discover their dream careers and connect them with the right opportunities that align with their passions and skills. 
                            With Career Match PRO, we're here to support job seekers every step of the way on their path to success.</p>
                    </div>
                    <div className="section team-section">
                        <h2>Our Team</h2>
                        <p>Meet the dynamic duo behind Career Match PRO! Amanda Zhang and Ahmed Diab, two talented Senior CS students at WIT, 
                            are on a mission to revolutionize job searching. As their senior project, they're creating an innovative job searching website that compiles APIs from various job boards, 
                            seamlessly merging them into one convenient platform. With Career Match PRO, users can explore countless job opportunities, gather insights, 
                            and streamline their job search process, all in a single, user-friendly website. Together, they're determined to make job hunting a breeze for everyone. 
                            Get ready to take your career to new heights with Career Match PRO!</p>
                            <br />
                        <div className="team-members">
                            
                            <div className="team-member">
                                <img src={frond_end} alt="Front-end Developer" />
                                <div>
                                    <h3>Amanda Zhang  --  Senior CS Student</h3>
                                    <p></p>
                                </div>
                            </div>
                            <div className="team-member">
                                <img src={back_end} alt="back-end Developer" />
                                <div>
                                    <h3>Ahmed Diab  --  Senior CS Student</h3>
                                    <p></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="section social-section">
                        <h2>Follow Us</h2>
                        <ul>
                            <li><a href="https://www.facebook.com/">Facebook</a></li>
                            <li><a href="https://www.instagram.com/">Instagram</a></li>
                            <li><a href="https://twitter.com/">Twitter</a></li>
                            <li><a href="https://www.linkedin.com/">LinkedIn</a></li>
                            {/* <a href="https://www.facebook.com/"><ion-icon class="fa fa-facebook-official"></ion-icon></a>
                            <a href="https://www.instagram.com/"><ion-icon class="fa fa-instagram"></ion-icon></a>
                            <a href="https://twitter.com/"><ion-icon class="fa fa-twitter"></ion-icon></a>
                            <a href="https://www.google.com/"><ion-icon class="fa fa-google"></ion-icon></a>
                            <a href="https://www.skype.com/"><ion-icon class="fa fa-skype"></ion-icon></a> */}
                        </ul>
                        <hr /> {/* This creates a horizontal line */}
                    </div>
                    <div className="section contact-section">
                        <h2>Contact Us</h2>
                        <p>If you have any questions or need assistance, please feel free to contact us through the form below:</p>
                        <form className="contact-form" onSubmit={this.sendEmail}>
                            <div className="input-row">
                                <div className="input-group">
                                    <label for="name">Your Name</label>
                                    <input type="text" id="name" placeholder="Your Name" required />
                                </div>
                                <div className="input-group">
                                    <label for="email">Your Email</label>
                                    <input type="email" id="email" placeholder="Your Email" required />
                                </div>
                            </div>
                            <div className="input-group">
                                <label for="message">Your Message</label>
                                <textarea id="message" placeholder="Your Message" required></textarea>
                            </div>
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default AboutUs;