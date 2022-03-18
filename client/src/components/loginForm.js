import React, { Component } from 'react';
import '../css/LoginAndSignUpForm.css'


//Five boxes for info
//Then 3 buttons for add, update, delete

//helpful URL: https://www.geeksforgeeks.org/how-to-connect-mongodb-with-reactjs/?ref=rp
//helpful URL: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events


class LoginForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            accounts: [],
            isValid: false
        }
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    handleOnSubmit = (e) => {

        this.authorization()

    }

    async authorization() {
        const response = await fetch('http://localhost:3001/accounts'); //path
        if (response.ok) {
            const accounts = await response.json()
            for (let i = 0; i < accounts.length; i++) {
                if (accounts[i].email == this.state.email && accounts[i].password === this.state.password) {
                    this.state.isValid = true
                    break
                }
            }


        }
        console.log(this.state.isValid)
    }

    render() {
        return (
            <div class="center">
                <h1>Login</h1>
                <form>
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