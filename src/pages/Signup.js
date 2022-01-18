import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { apiFetch } from "../functions/function";
import "../css/login.css";
import examio from "../assets/examio2.png";

function Signup(props) {
    const history = useHistory();

    function displayError(message) {
        let header = document.getElementById("log-head");
        header.innerHTML = message;
        setTimeout(
            () => {
                header.innerHTML = "Sign up.."
            }, 2000
        )
    }

    useEffect(() => {
        function handleSubmit(event) {
            event.preventDefault();
            let form = event.target
            let formData = new FormData(form);

            if(formData.get("first").length < 2 | formData.get("last").length < 2) {
                displayError("name is too short..")
            } else if(formData.get("password").length < 5) {
                displayError("password too short..");
            } else if (formData.get("password").length > 10) {
                displayError("password too long ...");
            } else if(formData.get("password") !== formData.get("password2")) {
                displayError("passwords do not match..");
            } else {
                let dest = {};
                props.load();
                apiFetch("POST", "signup", {
                    name : formData.get("first") + " " + formData.get("last"),
                    phone : formData.get("phone"),
                    email : formData.get("email"),
                    password : formData.get("password"),
                    role : formData.get("role") === "examiner"
                }, dest)
                .then(
                    () => {
                        props.load();
                        if(dest.status === 200) {
                            displayError("accout create successfull");
                            history.push('/login');
                        } else if(dest.status === 401) {
                            displayError("email already exists...");
                        } else {
                            displayError("couldn't create account");
                            history.push("/home");
                        }
                    }
                )
            }

        }
        let form = document.getElementById("signup-form");
        form.addEventListener("submit", handleSubmit)

        return function cleanup () {
            form.removeEventListener("submit", handleSubmit)
        }
    },[])
    return (
        <div className="center-div">
            <div className="logo"><img src={examio} height="20" width="90"></img></div>
            <button className="log-but grow" onClick={() => { history.push("/login") }}>login</button>
            <form id="signup-form" className="shadow-5">
                <div className="log-header">
                    <h2 style={{ margin: "0px" }} id="log-head">Sign up..</h2>
                </div>

                <div className="log-form-arrange sign-arrange">

                    <input type="text" name="first" className="log-input sign-input" placeholder="first name" required="required"></input>
                    <input type="text" name="last" className="log-input sign-input" placeholder="last name" required="required"></input>
                    
                    <input type="email" name="email" className="log-input sign-input" placeholder="email" required="required"></input>
                    <input type="number" name="phone" className="log-input sign-input" placeholder="phone_no" required="required"></input>
                    
                    <input type="password" name="password" className="log-input sign-input" placeholder="password" required="required"></input>
                    <input type="password" name="password2" className="log-input sign-input" placeholder="confirm password" required="required"></input>

                    <select name="role" className="log-input sign-input" placeholder="">
                        <option style={{color : "black"}} value="examiner">As examiner</option>
                        <option style={{color : "black"}} value="examinee">As examinee</option>
                    </select>

                    <button type="submit" className="log-butt grow sign-butt"> login</button>
                </div>
            </form>
            <div className="log-foot"><h4>examio &copy; {new Date().getFullYear()}</h4></div>
        </div>
    )
}
export default Signup;