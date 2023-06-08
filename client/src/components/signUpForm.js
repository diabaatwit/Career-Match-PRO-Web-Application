import React, { Component } from 'react';
import '../css/LoginAndSignUpForm.css'

class SignUpForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            password: "",
            confirmPassword: "",
        }
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    handleOnSubmit = (e) => {
        console.log('submitted')
        this.fetching()

    }

    async fetching() {
        const donotMatchMsg = document.getElementById("invalidMsg");

        if(this.state.firstName === "" || this.state.lastName === "" || this.state.email === "" || this.state.phoneNumber === "" || this.state.password === ""){
            donotMatchMsg.innerHTML = "Please fill required fields."
        } else {
            if (this.state.password === this.state.confirmPassword) {
                console.log(this.state.firstName)
                console.log(this.state.password)
                const newAccount = {
    
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    email: this.state.email,
                    phoneNumber: this.state.phoneNumber,
                    password: this.state.password,
    
                }
                const account = JSON.stringify(newAccount)
                console.log(account)
    
                const options = {
    
                    method: "POST",
                    mode: "cors",
                    headers: { "Content-Type": "application/json" },
                    body: account
    
                }
    
                await fetch("http://localhost:3001/accounts", options)
                    .then(response => response.text())
                    .catch(error => console.log('error', error));
                window.location.assign("/login");
            }
            else {
                
                donotMatchMsg.innerHTML = "Confirm Password and Password do not match."
            }
        }
    }

    render() {
        return (
            <div class="center">
                <h1>Sign Up</h1>
                <form>
                    <div class="txt_field">
                        <input type="text" required={true}
                            onChange={(e) => this.setState({ firstName: e.target.value })} />
                        <span></span>
                        <label>First Name</label>
                    </div>
                    <div class="txt_field">
                        <input type="text" required={true}
                            onChange={(e) => this.setState({ lastName: e.target.value })} />
                        <span></span>
                        <label>Last Name</label>
                    </div>
                    <div class="txt_field">
                        <input type="email" required={true}
                            onChange={(e) => this.setState({ email: e.target.value })} />
                        <span></span>
                        <label>Email</label>
                    </div>
                    <div class="txt_field">
                        <input type="text" required={true}
                            onChange={(e) => this.setState({ phoneNumber: e.target.value })} />
                        <span></span>
                        <label>Phone Number</label>
                    </div>
                    <div class="txt_field">
                        <input type="password" required={true}
                            onChange={(e) => this.setState({ password: e.target.value })} />
                        <span></span>
                        <label>Password</label>
                    </div>
                    <div class="txt_field">
                        <input type="password" required={true}
                            onChange={(e) => this.setState({ confirmPassword: e.target.value })} />
                        <span></span>
                        <label>Confirm Password</label>
                    </div>
                    <div id="invalidMsg"></div>
                    <input id="actionBtn" value="Sign Up" onClick={this.handleOnSubmit} />
                </form>
            </div>
        )
    }
}

export default SignUpForm;