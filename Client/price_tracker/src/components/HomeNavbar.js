import React from "react";
import $ from "jquery";
import logo from "../img/logo.png";
import "./navbar_style.css";

export default function HomeNavbar() {
    let user = localStorage.getItem("userName");

    if(!user) {
        return (
            <div className="container-lg">
                <div className="row mt-lg-2 mt-1">
                    <div className="offset-lg-1 col-lg-2 mt-lg-2">
                        <a href="/"><img src={logo} id="logo"/></a>
                    </div>
                    <div className="col-lg-6"></div>
                    <div className="col-lg-2 mt-1 d-flex justify-content-center">
                        <ul className="list-group list-group-horizontal me-2 mb-2 mb-lg-0">
                            <li className="list-group-item bg-warning">
                                <a className="nav-link text-dark" aria-current="page" href="/register">Register</a>
                            </li>
                            <p>&nbsp;</p>
                            <li className="list-group-item bg-success">
                                <a className="nav-link text-light" href="/login">Log In</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="container-lg">
                <div className="row mt-lg-2 mt-1">
                    <div className="offset-lg-1 col-lg-2 mt-lg-2">
                        <a href="/"><img src={logo} id="logo"/></a>
                    </div>
                    <div className="col-lg-6"></div>
                    <div className="col-lg-2 mt-1 d-flex justify-content-center">
                        <ul className="list-group list-group-horizontal me-2 mb-2 mb-lg-0">
                            <li className="list-group-item bg-secondary">
                                <a className="nav-link text-light" aria-current="page" href="/profile">Profile</a>
                            </li>
                            <p>&nbsp;</p>
                            <li className="list-group-item bg-danger">
                                <a className="nav-link text-light" href="/" onClick={() => localStorage.clear()}>Log Out</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}