import React from 'react'
import Navbar from './Navbar'

function About() {

    let login = ""

    if (localStorage.getItem('token')) {
        login = true;
    } else {
        login = false;
    }
    return (
        <>

            <Navbar login={login} />
            <div className="container">
                <h1>Please Login or Create An Account</h1>
            </div>
        </>
    )
}


export default About
