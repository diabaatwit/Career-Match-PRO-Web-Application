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
        }
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    handleOnSubmit = (e) => {

        this.fetching()

    }

    async fetching() {
        // to do 
    }

    render() {
        return (
            <div class="center">
                <h1>Login</h1>
                <form>
                    <div class="txt_field">
                        <input type="text" required />
                        <span></span>
                        <label>Email</label>
                    </div>
                    <div class="txt_field">
                        <input type="password" required />
                        <span></span>
                        <label>Password</label>
                    </div>
                    <div class="pass">Forgot Password?</div>
                    <input id="actionBtn" value="Login" />
                    <div class="signup_link">
                        Not a member? <a href="/signup">Signup</a>
                    </div>
                </form>
            </div>
        )
    }
}

export default LoginForm;