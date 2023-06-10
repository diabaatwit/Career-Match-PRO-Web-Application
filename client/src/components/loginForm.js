import React, { Component } from 'react';
import '../css/LoginAndSignUpForm.css'



class LoginForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            userToken: ""
        }
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin = (e) => {

        this.authorization()

    }

    // authorize user's input
    async authorization() {
        const invalidMSG = document.getElementById("invalidMsg");
        const input = JSON.stringify({
            email: this.state.email,
            password: this.state.password,
        })

        const options = {

            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: input

        }
        // fetch accounts
        const response = await fetch('http://localhost:3001/accounts/login-user', options); //path
        if (response.ok) {
            const responseData = await response.json();
            const userToken = responseData.userToken
            this.setState({ userToken })
            localStorage.setItem('userToken', this.state.userToken)
            window.location.assign("/home")

        } else if (response.status === 404) {
            invalidMSG.innerHTML = "User not found!"
        } else if (response.status === 401) {
            invalidMSG.innerHTML = "Invalid Password!"
        } else {
            invalidMSG.innerHTML = "Error Login!"
        }
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
                    <input id="actionBtn" value="Login" onClick={this.handleLogin} />
                    <div class="signup_link">
                        Not a member? <a href="/signup">Signup</a>
                    </div>
                </form>
            </div>
        )
    }
}

export default LoginForm;