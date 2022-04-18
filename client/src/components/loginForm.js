import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom'
import '../css/LoginAndSignUpForm.css'



class LoginForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            id: "",
            accounts: [],
            isValid: false
        }
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    handleOnSubmit = (e) => {

        this.authorization()

    }

    // authorize user's input
    async authorization() {
        // fetch accounts
        const response = await fetch('https://jobfinderserver.herokuapp.com/accounts'); //path
        if (response.ok) {
            const accounts = await response.json()

            // compare user input with accounts' emails and passwords, if ok, then open home page otherwise display invalid message
            for (let i = 0; i < accounts.length; i++) {
                if (accounts[i].email == this.state.email && accounts[i].password === this.state.password) {
                    this.state.isValid = true
                    const id = accounts[i]._id
                    const firstName = accounts[i].firstName
                    const lastName = accounts[i].lastName
                    this.setState({ id, firstName, lastName })
                    console.log(this.state.id)
                    localStorage.setItem('userID', this.state.id)
                    localStorage.setItem('firstName', this.state.firstName)
                    localStorage.setItem('lastName', this.state.lastName)
                    console.log(localStorage.getItem('userID'))
                    window.location.assign("/home");
                    
                }
            }

            // if user entered invalid email or password, display invalid email or password msg.
            if (this.state.isValid == false){
                const invalidMSG = document.getElementById("invalidMsg");
                invalidMSG.innerHTML = "Invalid email or password. Please try again."
            }


        }
        console.log(this.state.isValid)
    }

    render() {
        return (
            <div class="center">
                <h1>Login</h1>
                <form>
                    <div id="invalidMsg"></div>
                    <div class="txt_field">
                        <input type="text" required={true}
                            onChange={(e) => this.setState({ email: e.target.value })} />
                        <span></span>
                        <label>Email</label>
                    </div>
                    <div class="txt_field">
                        <input type="password" required={true}
                            onChange={(e) => this.setState({ password: e.target.value })} />
                        <span></span>
                        <label>Password</label>
                    </div>
                    <div class="pass">Forgot Password?</div>
                    <input id="actionBtn" value="Login" onClick={this.handleOnSubmit} />
                    <div class="signup_link">
                        Not a member? <a href="/signup">Signup</a>
                    </div>
                </form>
            </div>
        )
    }
}

export default LoginForm;