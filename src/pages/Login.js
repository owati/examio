import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { apiFetch } from "../functions/function";
import "../css/login.css";
import examio from "../assets/examio.png";

function Login(props) {
    const history = useHistory()
    function handleLoginSubmit(e) {
        let response = {};
        e.preventDefault();
        let formData = new FormData(e.target)
        let data = {
            email : formData.get("email"),
            password : formData.get("password")
        }

        apiFetch("POST", "login", data, response);

        if(response.status === 200) {
            let res_data = response.data;
            if (res_data.login) {
                props.loginFunc(res_data);
                history.push('/account/dashboard/')
            }
        } else {
            
        }
    }
    useEffect(() => {
        let form = document.getElementById("login-form");

        form.addEventListener('submit', handleLoginSubmit)
        
        return function cleanup () {
            form.removeEventListener('submit',handleLoginSubmit)
        }

    },[])
    return (
        <div className="center-div">
            <div className="logo"><img src={examio} height="20" width="90"></img></div>
            <button className="log-but grow">sign up</button>
            <form id="login-form" className="shadow-5">
                <div className="log-header"><h2 style={{ margin: "0px" }}>Sign in..</h2></div>

                <div className="log-form-arrange">
                    <input type="email" name="email" className="log-input" placeholder="email" required="required"></input>
                    <input type="password" name="password" className="log-input" placeholder="password" required="required"></input>

                    <button type="submit" className="log-butt grow"> login</button>
                </div>
            </form>
        </div>
    )
}

export default Login;