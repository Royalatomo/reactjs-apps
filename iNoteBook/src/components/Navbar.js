import React from 'react'
import { useLocation, useHistory, Link } from 'react-router-dom'
import "../css/Navbar.css"

function Navbar(props) {

  let location = useLocation();
  const history = useHistory();

  const logout = async () => {
    const response = await fetch("http://localhost:5000/api/auth/logout", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },

    })
    localStorage.removeItem('token')
    const json = await response.json();
    if (json.success) {
      history.push('/about')
    }
  }
  return (
    <div className="home-nav-bar">

      <div className="home-left-buttons">
        <p>iNoteBook</p>
      </div>

      <div className="home-right-buttons">

        <div className="dropdown">

          <button type="button" className="dropdown-toggle" data-toggle="dropdown">
            <i className="fas fa-bars "></i>
          </button>

          <div className="dropdown-menu">
            {props.login ? <Link to="/" className="dropdown-item" >Home</Link> : ""}
            <Link to="/about" className="dropdown-item" >About</Link>
            {props.login ? <Link to="" onClick={logout} className="dropdown-item" >Logout</Link> : <><Link to="/login" className="dropdown-item" >Login</Link>
              <Link to="/signup" className="dropdown-item" >Sign-up</Link></>}
          </div>

        </div>

        <span className="home-nav-big-buttons">
          {props.login ? <Link to="/" className={`home-right-button-link ${location.pathname === "/" ? "active" : ""}`}>Home</Link> : ""}
          <Link to="/about" className={`home-right-button-link ${location.pathname === "/about" ? "active" : ""}`}>About</Link>
          {props.login ? <Link to="" className="home-right-button-link" onClick={logout}>Logout</Link> : <><Link to="/login" className="home-right-button-link">Login</Link>
            <Link to="/signup" className="home-right-button-link">Sign-up</Link></>}
        </span>

      </div>

      <div className="collapseButton">
        <div className="collapse" id="navbarToggleExternalContent">
          <div className="bg-dark p-4">
            <h5 className="text-white h4">Collapsed content</h5>
            <span className="text-muted">Toggleable via the navbar brand.</span>
          </div>
        </div>

        <nav className="navbar navbar-dark bg-dark">
          <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </nav>
      </div>

    </div >
  )

  // return (
  //   <>

  //     <div className="site-mobile-menu" >

  //       <div className="dropdown" style={{ position: "relative", zIndex: "10" }}>
  //         <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown">
  //           Dropdown button
  //         </button>
  //         <div className="dropdown-menu">
  //           <a className="dropdown-item" href="#">Link 1</a>
  //           <a className="dropdown-item" href="#">Link 2</a>
  //           <a className="dropdown-item" href="#">Link 3</a>
  //         </div>
  //       </div>

  //       <div className="site-mobile-menu-body"></div>
  //     </div>

  //     <header className="site-navbar navbar navbar-dark bg-primary" style={{ position: "relative", zIndex: "-1", top: "0", marginBottom: "20px", width: "100vw" }} role="banner">

  //       <div className="container">
  //         <div className="row align-items-center" style={{ width: "100%" }}>

  //           <div className="col-11 col-xl-2" style={{ display: "flex", alignItems: "center" }}>
  //             <h1 className="mb-0 site-logo"><a href="/" className="text-white mb-0">iNoteBook</a></h1>
  //             <div className="d-inline-block d-xl-none ml-md-0 mr-auto py-3" style={{ "position": "relative", "top": "3px", width: "100%", textAlign: "end" }}><a href="/" className="site-menu-toggle js-menu-toggle text-white"><span className="icon-menu h3"></span></a></div>
  //           </div>

  //           <div className="col-12 col-md-10 d-none d-xl-block">

  //             <nav className="site-navigation position-relative text-right" role="navigation">

  //               <ul className="site-menu js-clone-nav mr-auto d-none d-lg-block">
  //                 {props.login ? <li className={`${location.pathname === "/" ? "active" : ""}`}><a href="/"><span>Home</span></a></li> : ""}

  //                 <li className={`${location.pathname === "/about" ? "active" : ""}`}><a href="/about"><span>About</span></a></li>

  //                 {/* eslint-disable-next-line */}
  //                 {props.login ? <li ><a href="#" ><span onClick={logout}>Logout</span></a></li> : <><li className=""><a href="/login"><span>Login</span></a></li>
  //                   <li className=""><a href="/signup"><span>Sign-up</span></a></li></>}

  //               </ul>
  //             </nav>
  //           </div>

  //         </div>

  //       </div>
  //     </header>


  //   </>
  // )
}

export default Navbar