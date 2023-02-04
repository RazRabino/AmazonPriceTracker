import React from "react";
import CleanNavbar from "../components/clean_nav"
import LoginComp from "../components/login";
import CleanFooter from "../components/clean_footer"

export default function Login() {
    return (
        <React.Fragment>
            <CleanNavbar/>
            <LoginComp/>
            <CleanFooter/>
        </React.Fragment>
    );
}