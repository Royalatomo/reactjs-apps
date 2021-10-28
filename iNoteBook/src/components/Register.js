import React, { useState } from 'react'
import "../css/Login.css"
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function Register() {

    const history = useHistory();

    // Stores All Information User Typed
    const [userAccountInfo, setUserAccountInfo] = useState({ name: "", email: "", password: "", cpassword: "" })

    // Update info user typed
    const updateAccountInfo = (e) => {
        setUserAccountInfo({ ...userAccountInfo, [e.target.name]: e.target.value })
    }

    const handelFormSubmit = async (e) => {

        e.preventDefault();

        const { name, email, password } = userAccountInfo

        const response = await fetch("http://localhost:5000/api/auth/create", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({ name, email, password })
        })

        const json = await response.json();

        if (json.success) {
            console.log(json.authToken)
            localStorage.setItem("token", json.authToken)
            history.push('/')
        } else {
            alert(json.error)
        }
    }

    return (
        <div className="register-main-div">
            <a href="/" className="btn-back">Back</a>
            <div className="register-div">
                <div className="main-box">
                    <div className="left-side">
                        <div className="img-display-box"><img src="my.jpg" alt="" /></div>
                        <div className="message"> <p>Already Have An Account?</p> <a className="link" href="/login">Login</a> </div>
                    </div>
                    <form className="right-side">
                        <div className="form-fields">
                            <input required onChange={updateAccountInfo} name="name" type="text" placeholder="Name" className="input-form" />
                            <input required onChange={updateAccountInfo} name="email" type="email" placeholder="Email" className="input-form" />
                            <input required onChange={updateAccountInfo} name="password" type="password" placeholder="Password" className="input-form" />
                            <input required onChange={updateAccountInfo} name="cpassword" type="password" placeholder="Confirm Password" className="input-form" />
                        </div>
                        <div className="captcha"></div>
                        {
                            userAccountInfo.password !== userAccountInfo.cpassword ? <p className="miss-match">Password and Confirm Password doesn't match</p> : ""
                        }

                        <div onClick={handelFormSubmit} className="register-button">
                            <button style={{ backgroundColor: userAccountInfo.password !== userAccountInfo.cpassword ? "#900000" : "black" }} disabled={userAccountInfo.password !== userAccountInfo.cpassword} className="register">Create Account</button>
                        </div>
                        <div className="message2"> <p>Already Have An Account?</p> <a className="link" href="/login">Login</a> </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register
