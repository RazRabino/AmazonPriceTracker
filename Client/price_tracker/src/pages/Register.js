import React from "react";
import CleanNavbar from "../components/clean_nav"
import RegisterComp from "../components/register";
import CleanFooter from "../components/clean_footer"

export default function Register() {
    return (
        <React.Fragment>
            <CleanNavbar/>
            <RegisterComp/>
            <CleanFooter/>
        </React.Fragment>
    );
}