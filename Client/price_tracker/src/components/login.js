import React from "react";
import $ from "jquery";
import "./login_style.css";

export default function LoginComp() {
    $(function() {
        $("#btn-click").on("click", async function() {
            const json_req = JSON.stringify({"user_name": $("#usr").val(), "password": $("#pass").val()});
            const userData = await fetch('http://localhost:3080/user/login/', 
            {method: 'POST', headers: {'Content-Type': 'application/json'}, body: json_req})
            .then(response => response.text())
            .then(res => JSON.parse(res));

            if(userData === "Wrong credentials!") {
                alert("Wrong credentials! Please try again.");
                window.location.replace("/login");
            } else {
                localStorage.setItem("userName", userData.user_name);
                localStorage.setItem("accessToken", userData.accessToken);
                localStorage.setItem("id", userData._id);

                window.location.replace("/");
            }
        })
    });

    return (
        <React.Fragment>
            <div className="container mt-lg-3" id="login">
                <div className="row">
                    <div className="offset-lg-4 col-lg-4 mt-lg-3 rounded" id="login_form">
                        <form id="eventLogin">
                            <a>Username</a>
                            <div className="form-group  mt-lg-2 mt-1">
                                <input type="text" className="form-control" aria-describedby="emailHelp" placeholder="Username" id="usr"/>
                            </div>
                            <a>Password</a>
                            <div className="form-group mt-lg-2 mt-1">
                                <input type="password" className="form-control" placeholder="Password" id="pass"/>
                            </div>
                            <button type="button" className="btn btn-primary mt-lg-2 mt-1" id="btn-click">Log In</button>
                            <br></br><a href="/register" className="text-dark ">Don't have account? click Here.</a>
                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}