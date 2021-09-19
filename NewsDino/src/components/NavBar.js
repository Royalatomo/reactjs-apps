import React, { Component } from 'react'

import '../css/Nav.css'
import { Link } from 'react-router-dom';


export class Nav extends Component {

    render() {
        return (
            <>
                <div className="nav-container">
                    <div className="logo">
                        <img width="400" height="350" src="/imgs/logo.png" alt="" />
                    </div>
                    <nav className="navbar nav-header navbar-expand-lg navbar-dark bg-dark">
                        <div className="container-fluid">
                            <Link className="navbar-brand" to="/">NewsDino</Link>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <Link className="nav-link" aria-current="page" to="/">Home</Link>
                                    </li>
                                    <li className="nav-item"><Link className="nav-link" to="/business">Business</Link></li>
                                    <li className="nav-item"><Link className="nav-link" to="/entertainment">Entertainment</Link></li>
                                    <li className="nav-item"><Link className="nav-link" to="/health">Health</Link></li>
                                    <li className="nav-item"><Link className="nav-link" to="/science">Science</Link></li>
                                    <li className="nav-item"><Link className="nav-link" to="/sports">Sports</Link></li>
                                    <li className="nav-item"><Link className="nav-link" to="/technology">Technology</Link></li>
                                </ul>
                            </div>
                            <div className="search-container"> <form className="col-12 col-lg-auto mb-lg-0 me-lg-3"> <input id="searchBox" type="search" className="form-control form-control-dark" placeholder="Search Your News..." aria-label="Search" /> </form> <div className="text-end"> <Link to="/search" onClick={this.props.searchNews} className="nav-link px-2 text-white"><button type="button" className="btn btn-outline-light me-2">Seach</button></Link> </div> </div>

                        </div>
                    </nav>
                </div>

                <button onClick={() => { window.scroll(0, 0) }} id="scrollToTop">
                    <i className="material-icons">arrow_upward</i>
                </button>
            </>
        )
    }
}

export default Nav
