import React from "react";
import logo from "../img/logo.png";
import "./navbar_style.css";

export default function CleanNavbar() {
    return (
        <div className="container-lg">
            <div className="row mt-lg-2 mt-1">
                <div className="offset-lg-1 col-lg-2 mt-lg-2">
                    <a href="/"><img src={logo} id="logo"/></a>
                </div>
            </div>
        </div>
    );
}