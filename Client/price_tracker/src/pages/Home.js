import React from "react";
import HomeNavbar from "../components/HomeNavbar";
import Header from "../components/Header";
import Features from "../components/features"
import Faq from "../components/faq";
import Footer from "../components/footer"

export default function Home() {
    return (
        <React.Fragment>
            <HomeNavbar/>
            <Header/>
            <Features/>
            <Faq/>
            <Footer/>
        </React.Fragment>
    );
}