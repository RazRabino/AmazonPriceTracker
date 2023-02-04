import React from "react";

export default function Faq() {
    return (
            <div className="container-lg" id="faq">
            <div className="row">
                <div className="offset-lg-2 col-lg-8">
                    <div className="text-center mt-lg-1" id="footer">
                        <h3>FAQ</h3>
                        <h5>Find the answers for the most frequently asked questions below</h5>

                        <div className="accordion mt-lg-3">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingOne">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                How Our Price Checking System Works?
                                </button>
                                </h2>
                                <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    Our system search and scan for products information according to your wanted products, in each search you are doing we add your wanted product to our list, and after that in each end of the day we update the information using scarping and automation.
                                </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingTwo">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    How I Search For Desired Product?
                                </button>
                                </h2>
                                <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    When you see a product that you liked in Amazon you can see it's price history in our site in two ways:
                                    <br></br>1.copy the value in the url of that product in amazon (the required value is the set of number and characters shown after /dp/ in the url) and use it in our search.
                                    <br></br>2.in that Amazon product page go to the end of the page and search for the value ASIN, copy it's value and use it in our search.
                                </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingThree">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                    Want To Ask Another Question?
                                </button>
                                </h2>
                                <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <strong>contact us in the mail: </strong><br></br>
                                    web0app.Price.Tracker@gmail.com
                                </div>
                                </div>
                            </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
        
    );
}