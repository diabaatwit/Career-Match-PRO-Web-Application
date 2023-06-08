import React, { Component } from 'react'
import '../css/header.css'

class Header extends Component {
    handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('email');
        localStorage.removeItem('firstName');
        localStorage.removeItem('lastName');
        window.location.assign('/login');
    }
    render() {
        let websiteTitle = 'Career Match PRO'
        let location = window.location.pathname.split('/')
        return location[1] == 'signup' || location[1] == 'login' ? (
            <header>
                <div class="inner">
                    <div class="logo">
                        <div>
                            <a href="/">
                                <h1 className='title'>

                                    {websiteTitle}
                                </h1>
                            </a>
                        </div>
                    </div>
                </div>
            </header>
        ) : location[1] == '' || location[1] == 'about' ? (
            <header>
                <div class="inner">
                    <div class="logo">
                        <div>
                            <a href="/">
                                <h1 className='title'>

                                    {websiteTitle}
                                </h1>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="inner">
                    <nav>
                        <li><span><a href="/login" class="savedjobs">Login</a></span></li>
                        <li><span><a href="/signup" class="logout">Sign Up</a></span></li>
                    </nav>
                </div>
            </header>
        ) : (
            <header>
                <div class="inner">
                    <a class="username" href="/home">{localStorage.getItem('firstName')} <span>{localStorage.getItem('lastName')}</span></a>
                    <nav>
                        <li><span><a href="/savedJobs" class="savedjobs">Saved Jobs</a></span></li>
                        <li><span><button class="logout" onClick={this.handleLogout}>Log Out</button></span></li>
                    </nav>
                </div>
            </header>
        )

    }
}

export default Header;