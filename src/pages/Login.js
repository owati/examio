import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { apiFetch } from "../functions/function";
import "../css/login.css";
import examio from "../assets/examio2.png";

function Login(props) {
    const history = useHistory()

    function handleRequestError(err) {
        let head = document.getElementById("log-head");
        head.innerHTML = err
        setTimeout(() => {
            head.innerHTML = "Sign in.."
        }, 2500)

    }
    function handleLoginSubmit(e) {
        var response = {};
        e.preventDefault();
        let formData = new FormData(e.target)
        let data = {
            email: formData.get("email"),
            password: formData.get("password")
        }
        props.load();
        apiFetch("POST", "login", data, response).then(() => {
            props.load();

            if (response.status === 200) {
                let res_data = response.data;
                if (res_data.login) {
                    props.loginFunc(res_data);
                    history.push('/account/dashboard/')
                }
            } else {
                handleRequestError("Wrong details..")
            }

        });

    }
    useEffect(() => {
        let form = document.getElementById("login-form");

        form.addEventListener('submit', handleLoginSubmit)

        return function cleanup() {
            form.removeEventListener('submit', handleLoginSubmit)
        }

    }, [])
    return (
        <div className="center-div">
            <div className="logo"><img src={examio} height="20" width="90"></img></div>
            <button className="log-but grow">sign up</button>
            <form id="login-form" className="shadow-5">
                <div className="log-header">
                    <h2 style={{ margin: "0px" }} id="log-head">Sign in..</h2>
                </div>

                <div className="log-form-arrange">
                    <input type="email" name="email" className="log-input" placeholder="email" required="required"></input>
                    <input type="password" name="password" className="log-input" placeholder="password" required="required"></input>

                    <button type="submit" className="log-butt grow"> login</button>
                </div>
            </form>
            <div className="log-foot"><h4>examio &copy; {new Date().getFullYear()}</h4></div>
        </div>
    )
}

export default Login;