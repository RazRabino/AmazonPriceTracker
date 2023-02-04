import React from "react";
import "./header_style.css";

export default function Header() {
    return (
        <div className="container-lg mt-lg-3 border border-info rounded" id="header">
            <div className="row-lg">
                <div className="col-lg-12 text-center">
                    <h1 className="mb-lg-3 text-dark">Amazon Price Tracker Service</h1>
                    <h4 className="mb-lg-3 text-dark">Search for your desired product now!</h4>
                    <form className="d-lg-flex me-auto" role="search" id="sku_search">
                        <input className="form-control me-auto mt-lg-2" type="search" value="https://www.amazon.com/dp/" aria-label="Search" readOnly disabled/>
                        <p id="hide_element">&nbsp;</p>
                        <input className="form-control me-auto mt-lg-2" type="search" placeholder="Sku" aria-label="Search" id="sku"/>
                        <p id="hide_element">&nbsp;</p>
                        <button className="btn btn-outline-secondary mt-lg-2" type="button" onClick={
                            (e) => {
                                window.location.replace("/product/" + document.getElementById("sku").value);
                            }
                        }>Search</button>
                    </form>
                    <h5 className="mt-lg-3 text-secondary">* insert SKU number in the second input field.</h5>
                </div>
            </div>
        </div>
    );
}