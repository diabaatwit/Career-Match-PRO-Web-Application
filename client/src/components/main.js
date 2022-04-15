import React, { Component } from 'react'
import '../css/main.css'

class Main extends Component {
    render() {

        return (
            <html>
                <head>
                    <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'/>
                </head>
                <section>
                    <div class="Wrapper">

                        <ul class="nav-area">
                            <li><a href="/">HOME</a></li>
                            <li><a href="/about">ABOUT</a></li>
                            <li><a href="mailto:zhangf2@wit.edu">CONTACT</a></li>
                        </ul>



                    </div>

                    <div class="welcome-text">
                        <h1>Welcome to search your job!</h1>
                        <a href="#">Learn More</a>

                        <div class="icons">
                            <a href="https://www.facebook.com/"><ion-icon class="fa fa-facebook-official"></ion-icon></a>
                            <a href="https://www.instagram.com/"><ion-icon class="fa fa-instagram"></ion-icon></a>
                            <a href="https://twitter.com/"><ion-icon class="fa fa-twitter"></ion-icon></a>
                            <a href="https://www.google.com/"><ion-icon class="fa fa-google"></ion-icon></a>
                            <a href="https://www.skype.com/"><ion-icon class="fa fa-skype"></ion-icon></a>
                        </div>
                    </div>
                </section>
            </html>

        )
    }
}

export default Main;