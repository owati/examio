import { useState } from "react";
import { useHistory } from "react-router-dom";
import "../css/login.css";
import examio from "../assets/examio2.png";

function Signup(props) {
    const history = useHistory();
    return (
        <div className="center-div">
            <div className="logo"><img src={examio} height="20" width="90"></img></div>
            <button className="log-but grow" onClick={() => { history.push("/login") }}>login</button>
            <form id="signup-form" className="shadow-5">
                <div className="log-header">
                    <h2 style={{ margin: "0px" }} id="log-head">Sign up..</h2>
                </div>

                <div className="log-form-arrange" style={{height : "100%", overflow : "scroll", margin : "0px"}}>

                    <input type="email" name="email" className="log-input" placeholder="email" required="required"></input>
                    <input type="password" name="password" className="log-input" placeholder="password" required="required"></input>

                    <button type="submit" className="log-butt grow"> login</button>
                </div>
            </form>
            <div className="log-foot"><h4>examio &copy; {new Date().getFullYear()}</h4></div>
        </div>
    )
}
export default Signup;