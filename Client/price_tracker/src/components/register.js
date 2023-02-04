import React from "react";
import $ from "jquery";
import "./register_style.css";

export default function RegisterComp() {
    $(function() {
        $("#btn-click").on("click", async function() {
            const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

            if($("#usr").val().length === 0 || $("#pass").val().length === 0) {
                alert("Username or password missing! Please try again.");
                window.location.reload();
            }

            if($("#usr").val().includes(" ") || $("#pass").val().includes(" ")) {
                alert("Username or password cannot contain space! Please try again.");
                window.location.reload();
            }

            if($("#mail").val().match(validRegex)) {
                const json_req = JSON.stringify({"user_name": $("#usr").val(), "e_mail": $("#mail").val(), "password": $("#pass").val()});
                const userData = await fetch('http://localhost:3080/user/register/', 
                {method: 'POST', headers: {'Content-Type': 'application/json'}, body: json_req})
                .then(response => response.text())
                .then(res => JSON.parse(res));

                if(userData.code === 11000) {
                    alert("Username or Email is already in use, choose another one.");
                    window.location.reload();
                    return;
                }
                
                if(userData === "Wrong credentials!") {
                    alert("Somthing went wrong! Please try again later.");
                    window.location.replace("/register");
                } else {
                    localStorage.setItem("userName", userData.user_name);
                    localStorage.setItem("accessToken", userData.accessToken);
                    localStorage.setItem("id", userData._id);

                    window.location.replace("/");
                }
            } else {
                alert("Email is not valid! Please try again.");
                window.location.reload();
                return;
            }
        })
    });

    return (
        <React.Fragment>
            <div className="container mt-lg-3" id="register">
                <div className="row">
                    <div className="offset-lg-4 col-lg-4 mt-lg-3 rounded" id="register_form">
                        <form>
                            <a>Username</a>
                            <div className="form-group  mt-lg-2 mt-1">
                                <input type="text" className="form-control" placeholder="Enter Username" id="usr"/>
                            </div>
                            <a>Email address</a>
                            <div className="form-group  mt-lg-2 mt-1">
                                <input type="email" className="form-control" aria-describedby="emailHelp" placeholder="Enter email" id="mail"/>
                            </div>
                            <a>Password</a>
                            <div className="form-group mt-lg-2 mt-1">
                                <input type="password" className="form-control" placeholder="Password" id="pass"/>
                            </div>
                            <button type="button" className="btn btn-primary mt-lg-2 mt-1" id="btn-click">Register</button>
                            <br></br><a href="/login" className="text-dark ">Already have account? click Here.</a>
                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}