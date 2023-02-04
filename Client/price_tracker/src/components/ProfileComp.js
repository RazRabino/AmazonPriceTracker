import React from "react";
import "./profile_style.css";
import $ from "jquery";

export default function ProfileComp() {
    const user = localStorage.getItem("userName");

    async function HandleFetch() {
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

        const watch_list_container = document.getElementById("products");

        data.forEach(async function(element, index) {
            const productData = await fetch('http://localhost:3080/product/' + element.sku)
            .then(response => response.text())
            .then(res => res);

            const fields = JSON.parse(productData);
            
            const title = fields.title;
            const current_price = fields.price;
            const sku = element.sku;
            const img = fields.img;

            const product_li = document.createElement("li");
            product_li.setAttribute("className", "border border-warning rounded py-2 px-2");
            product_li.setAttribute("id", "products_data");
            product_li.style.marginTop = "3vh";
            const br = document.createElement("br");
            const img_cont = document.createElement("img");
            img_cont.src = img;
            img_cont.style.width = "5%";
            
            product_li.appendChild(img_cont);
            product_li.appendChild(br.cloneNode());
            product_li.appendChild(document.createTextNode("Title: " + title));
            product_li.appendChild(br.cloneNode());
            product_li.appendChild(document.createTextNode("Current price: " + current_price));
            product_li.appendChild(br.cloneNode());
            product_li.appendChild(document.createTextNode("Your wanted price: " + element.desiredPrice));
            product_li.appendChild(br.cloneNode());
            product_li.appendChild(document.createTextNode("SKU: " + sku));
            product_li.appendChild(br.cloneNode());

            const delete_btn = document.createElement("a");
            delete_btn.setAttribute("id", "delete_btn");
            delete_btn.text = "Delete Alert!";
            delete_btn.href = "/profile";
            delete_btn.type = sku;
            product_li.appendChild(delete_btn);

            product_li.appendChild(br.cloneNode());
            const amazon_link_a = document.createElement("a");
            amazon_link_a.appendChild(document.createTextNode("Amazon Product Page."));
            amazon_link_a.href = "https://www.amazon.com/dp/" + fields.sku;
            product_li.appendChild(amazon_link_a);    

            watch_list_container.appendChild(product_li);
        });
    }

    document.onload = HandleFetch();

    $(function() {
        const onDeleteHandler = async function (e) {
            const json_req = JSON.stringify({"sku": e.target.type});
            await fetch('http://localhost:3080/user/alert/del/' + localStorage.getItem("id"), 
            {method: 'PUT', headers: {"Authorization": "bearer " + localStorage.getItem("accessToken"),'Content-Type': 'application/json'}, body: json_req})
            .then(response => response.text())
            .then(res => JSON.parse(res));
        };
        
        $('#products').on("click", "#delete_btn", onDeleteHandler);
    });

    async function DeleteUser() {
        await fetch('http://localhost:3080/user/del/' + localStorage.getItem("id"), 
        {method: 'DELETE', headers: {"Authorization": "bearer " + localStorage.getItem("accessToken")}})
        .then(response => response.text())
        .then(res => JSON.parse(res));

        window.localStorage.clear();
        window.location.replace("/");
    }

    return (
        <div className="container-lg mt-lg-3 mt-1">
            <div className="row">
                <div className="offset-lg-1 col-lg-10 mt-1 py-3 border border-info rounded">
                    <p className="">Hi {user}, we are hoping you're fine today (:</p>
                    <hr></hr>
                    <p>This is you're price watch list:</p>
                    <ul className="" id="products"></ul>
                    <hr></hr>
                    <button className="btn btn-danger text-dark" onClick={() => {
                        const text = "Are you sure you want to delete your user?\nthis proccess cannot be undo.";
                        if (window.confirm(text) === true) {
                            DeleteUser();
                        } else {
                            alert("We are happy to see you are not leaving...");
                        }
                    }}>
                    Want to delete your user? click HERE.</button>
                </div>
            </div>
        </div>
    );
}