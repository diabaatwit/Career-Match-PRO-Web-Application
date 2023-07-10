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
                        <p>As Wentworth students majoring in Computer Science, we are driven by our passion for technology and our desire to make a positive impact on society. Our team is composed of dedicated individuals who have a deep understanding of computer science and its potential to solve complex problems. We are committed to using our skills and knowledge to create innovative solutions that can improve people's lives.</p>
                        <p>Our mission is to simplify the job search process by creating a user-friendly platform that connects job seekers with potential employers. We aim to make job hunting less stressful and more successful for everyone.</p>
                    </div>
                    <div className="section team-section">
                        <h2>Our Team</h2>
                        <div className="team-members">
                            <div className="team-member">
                                <img src={frond_end} alt="Front-end Developer" />
                                <div>
                                    <h3>Amanda Zhang  --  Front-end Developer</h3>
                                    <p>Our front-end developer is responsible for creating a user-friendly interface that makes job searching a breeze. They ensure our platform is visually appealing and easy to navigate.</p>
                                </div>
                            </div>
                            <div className="team-member">
                                <img src={back_end} alt="back-end Developer" />
                                <div>
                                    <h3>Ahmed Diab  --  Back-end Developer</h3>
                                    <p>Our back-end developer ensures that our platform runs smoothly and efficiently. They handle data management and server-side logic, making sure that user data is secure and accessible when needed.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="section social-section">
                        <h2>Follow Us</h2>
                        <ul>
                            <li><a href="https://www.facebook.com/">Facebook</a></li>
                            <li><a href="https://twitter.com/">Twitter</a></li>
                            <li><a href="https://www.linkedin.com/">LinkedIn</a></li>
                            <li><a href="https://www.google.com/">Google</a></li>
                            <li><a href="https://www.skype.com/">Skype</a></li>
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