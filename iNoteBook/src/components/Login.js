import React, { useState } from 'react'
import "../css/Login.css"
import { useHistory } from 'react-router-dom'

function Login(props) {

    const history = useHistory();
    const [wrong, setWrong] = useState(false)

    // Stores All Information User Typed
    const [credentials, setCredentials] = useState({ email: "", password: "" })

    // Update info user typed
    const updateCredentials = async (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handelFormSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify(credentials)
        })
        const json = await response.json();

        if (json.success) {

            setWrong(false)
            localStorage.setItem("token", json.authToken)
            history.push('/')

        } else {
            setWrong(true)
        }
    }

    return (
        <div className="login-main-div">
            <a href="/" className="btn-back">Back</a>
            <div className="login-div">
                <div className="main-box">
                    <div className="left-side">
                        <div className="img-display-box"><img src="my.jpg" alt="" /></div>
                        <div className="message"> <p>Don't Have An Account?</p> <a className="link" href="/signup">Create One</a> </div>
                    </div>

                    <form className="right-side">
                        <div className="form-fields">
                            <input required name="email" onChange={updateCredentials} type="email" placeholder="Email" className="input-form" />
                            <input required name="password" onChange={updateCredentials} type="password" placeholder="Password" className="input-form" />
                        </div>
                        <div className="captcha"></div>
                        {
                            wrong ? <p className="miss-match">Username or Password is incorrect</p> : ""
                        }
                        <div onClick={handelFormSubmit} className="login-button">
                            <button className="login">Login</button>
                        </div>
                        <div className="message2"> <p>Don't Have An Account?</p> <a className="link" href="/signup">Create One</a> </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
