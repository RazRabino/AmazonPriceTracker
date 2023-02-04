import React from "react";
import Navbar from "../components/Navbar";
import ProfileComp from "../components/ProfileComp";
import Footer from "../components/footer"

export default function Profile() {
    const user = localStorage.getItem("userName");

    if(!user) {
        window.location.replace("/");
    } else {
        return (
            <React.Fragment>
                <Navbar/>
                <ProfileComp/>
                <Footer/>
            </React.Fragment>
        );
    }
}