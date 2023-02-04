import React from "react";
import "./featuress_style.css";

export default function Features() {
    return (
        <div className="container-lg" id="features">
            <div className="row mt-3 text-center">
                <div className="col-lg-4">
                    <div className="card border-info mb-3 my-1 mx-3" id="features_content">
                        <div className="card-body text-secondary">
                            <h5 className="card-title">Amazon Price Drop Alerts</h5>
                            <p className="card-text" id="min_height">Check your wanted product sku number (can be found in url after /dp/ or in the end of every amazon product under the name ASIN) and search for it's price history.</p>
                    </div>
                </div>
                </div>
                <div className="col-lg-4">
                    <div className="card border-info mb-3 my-1 mx-3" id="features_content">
                        <div className="card-body text-secondary">
                            <h5 className="card-title">Save your own list of products</h5>
                            <p className="card-text" id="min_height">Add and delete products from your own account watch list.</p>
                    </div>
                </div>
                </div>
                <div className="col-lg-4">
                    <div className="card border-info mb-3 my-1 mx-3" id="features_content">
                        <div className="card-body text-secondary">
                            <h5 className="card-title">Amazon Price History Charts</h5>
                            <p className="card-text" id="min_height">View the price history of millions of Amazon products.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}