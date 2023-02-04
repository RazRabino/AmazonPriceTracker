import React from "react";
import Navbar from "../components/Navbar";
import ProductComp from "../components/ProductComp";
import Footer from "../components/footer"

export default function Product() {
    return (
        <React.Fragment>
            <Navbar/>
            <ProductComp/>
            <Footer/>
        </React.Fragment>
    );
}