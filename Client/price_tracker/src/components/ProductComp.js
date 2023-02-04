import React from "react";
import $ from "jquery";
import "./product_style.css";
import { useParams } from "react-router-dom";


export default function ProductComp() {
    async function HandleFetch() {
        const params = useParams();
        let productData = await fetch('http://localhost:3080/product/' + params.sku)
        .then(response => response.text())
        .then(res => res);

        if(productData.length == 2) {
            alert("Product Not Valid! one or more required data is missing.");
            window.location.replace("/");
        }

        const fields = JSON.parse(productData);

        if(fields) {
            const product_container = document.getElementById("product_data");

            if(fields.img != undefined) {
                const img_container = document.getElementById("product_img");
                img_container.src = fields.img;
            }
            
            if(fields.title != undefined) {
                const title_li = document.createElement("li");
                title_li.appendChild(document.createTextNode("Title: " + fields.title));
                product_container.appendChild(title_li);
            }

            if(fields.sku != undefined) {
                const sku_li = document.createElement("li");
                sku_li.appendChild(document.createTextNode("ASIN: " + fields.sku));
                product_container.appendChild(sku_li);
            }

            if(fields.price != undefined && fields.price != 0) {
                const price_li = document.createElement("li");
                price_li.appendChild(document.createTextNode("Price: " + fields.price));
                product_container.appendChild(price_li);
            }
            
            if(fields.updatedAt != undefined) {
                const updatedAt_li = document.createElement("li");
                updatedAt_li.appendChild(document.createTextNode("Last updated at: " + fields.updatedAt));
                product_container.appendChild(updatedAt_li);
            }
            
            if(fields.customer_reviews_stars != undefined) {
                const customer_reviews_stars_li = document.createElement("li");
                customer_reviews_stars_li.appendChild(document.createTextNode("Customer reviews: " + fields.customer_reviews_stars));
                product_container.appendChild(customer_reviews_stars_li);
            }

            if(fields.customer_reviews_amount != undefined) {
                const customer_reviews_amount_li = document.createElement("li");
                customer_reviews_amount_li.appendChild(document.createTextNode("Out of: " + fields.customer_reviews_amount));
                product_container.appendChild(customer_reviews_amount_li);    
            }
            
            if(fields.description != undefined) {
                const description_li = document.createElement("li");
                description_li.appendChild(document.createTextNode("Description: " + fields.description));
                product_container.appendChild(description_li);    
            }

            if(fields.sku != undefined) {
                const amazon_link_a = document.createElement("a");
                amazon_link_a.appendChild(document.createTextNode("Amazon Product Page."));
                amazon_link_a.href = "https://www.amazon.com/dp/" + fields.sku;
                product_container.appendChild(amazon_link_a);    
            }
        }

        const data = [];

        fields.price_history.forEach(element => {
            data.push({date: element.date.substring(0, 10), price: parseFloat(element.price)});
        });

        data.reverse();
        const price_container = document.getElementById("price_history");

        data.forEach(element => {
            const price_li = document.createElement("li");
            price_li.appendChild(document.createTextNode("Price: " + element.price + " - Date: " + element.date));
            price_container.appendChild(price_li);
        });

        if(data.length == 0) {
            document.getElementById("price_history_title").style.display = "none";
        }
    }

    function AddAlert() {
        if(localStorage.getItem("userName")) {
            return (
                <div>
                    <hr></hr>
                    <h5>When price is: </h5>
                    <input type="number" id="add_alert_price"></input><br></br>
                    <button type="click" className="btn btn-secondary mx-1 mt-2" id="add_alert">Alert Me!</button>
                </div>
            )
        }
    }
    
    document.onload = HandleFetch();
    
    $(function() {
        $("#add_alert").on("click", async () => {
            const price_input = document.getElementById("add_alert_price").value;
            const sku = window.location.href.substring(30);

            const token = localStorage.getItem("accessToken");
            const productData = await fetch(`http://localhost:3080/User/profile/${localStorage.getItem("id")}`, {
                method: 'GET', headers: {'Content-type': "application/json ", "Authorization": `bearer ${token}`}
            })
            .then(response => response.text())
            .then(res => res);

            const fields = JSON.parse(productData);

            const data = [];

            fields.price_watch_list.forEach(element => {
                data.push({sku: element.sku, desiredPrice: element.price});
            });

            let flag = false;

            data.forEach(function(element) {
                if(element.sku == sku) {
                    flag = true;
                }
            });
            
            if(price_input != "" && flag == false) {
                const json_req = JSON.stringify({"sku": sku, "price": price_input});
                const addAlert = await fetch('http://localhost:3080/user/alert/add/' + localStorage.getItem("id"), 
                {method: 'PUT', headers: {"Authorization": "bearer " + localStorage.getItem("accessToken"),'Content-Type': 'application/json'}, body: json_req})
                .then(response => response.text())
                .then(res => JSON.parse(res));
            }

            window.location.replace("/profile");
        });
    });

    return (
        <div className="container-lg mt-lg-3 mt-1">
            <div className="row">
                <div className="offset-lg-1 col-lg-3 mt-1">
                    <img className="w-75" id="product_img"/>
                </div>
                <div className="col-lg-6 mt-1">
                    <ul id="product_data" className="text-dark pt-lg-5 pt-2 fw-bold fst-italic"></ul>
                </div>
            </div>
            <div className="row">
                <div className="offset-lg-1 col-lg-10 mt-1 text-center">
                    <hr></hr>
                    <h3 id="price_history_title">Price History:</h3>
                    <ul id="price_history" className="text-dark pt-1 fw-bold fst-italic"></ul>
                    {AddAlert()}
                </div>
            </div>
        </div>
    );
}