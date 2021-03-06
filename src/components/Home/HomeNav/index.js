import React from "react";
import "./index.css";
// import logo from '../../Common/Imgs/newcroplogo.png';

class HomeNav extends React.Component {

	render() {

	    return (
				<nav className="navbar navbar-expand-lg navbar-dark">
				  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
				    <span className="navbar-toggler-icon"></span>
				  </button>
				  <a className="navbar-brand" href="/">Rusticana</a>

				    <div className="collapse navbar-collapse " id="navbarTogglerDemo03">
				        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
				            <li className="nav-item">
				                <a className="nav-link" onClick={() => localStorage.removeItem('token')} href="/">Log Out</a>
				            </li>				            
				        </ul>
				    </div>		    
				</nav>   
	    )
	}

}

export default HomeNav