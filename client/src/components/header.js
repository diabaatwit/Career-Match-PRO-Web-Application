import React, { Component } from 'react'
import '../css/header.css'

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
        };
        this.getUserData = this.getUserData.bind(this);
    }

    async componentDidMount() {
        const location = window.location.pathname.split('/');
        if (location[1] === 'home' || location[1] === 'savedJobs') {
            await this.getUserData();
        }
    }

    getUserData = async () => {
        try {
            const response = await fetch('http://localhost:3001/accounts/user-data', {
                method: 'POST',
                crossDomain: true,
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({
                    token: localStorage.getItem('userToken'),
                }),
            });

            const data = await response.json();

            if (data.data === 'token expired') {
                alert('Token expired. Please log in again.');
                localStorage.clear();
                window.location.href = '/login';
            } else {
                localStorage.setItem('firstName', data.data.firstName);
                localStorage.setItem('lastName', data.data.lastName);

                this.setState({
                    isLoading: false,
                });
            }
        } catch (error) {
            console.log('Error occurred while fetching user data:', error);
        }
    };

    handleLogout = (e) => {
        e.preventDefault();
        window.localStorage.clear();
        window.location.assign('/login');
    }
    render() {
        let websiteTitle = 'Career Match PRO'
        let location = window.location.pathname.split('/')
        const { isLoading } = this.state;
        return location[1] == 'signup' || location[1] == 'login' ? (
            <header>
                <div class="inner">
                    <div class="logo">
                        <div>
                            <a href="/">
                                <h1 className='headerTitle'>

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
        ) : location[1] == '' || location[1] == 'about' ? (
            <header>
                <div class="inner">
                    <div class="logo">
                        <div>
                            <a href="/">
                                <h1 className='headerTitle'>

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
        ) : isLoading? (
            <div>Loading...</div>
        ) : (
            <header>
                <div class="inner">
                    <a class="headerTitle" href="/home">{localStorage.getItem('firstName')} <span>{localStorage.getItem('lastName')}</span></a>
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