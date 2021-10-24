import { useState } from "react";
import { useHistory } from "react-router";
import CenterForm from "./CenterForm";
import '../css/signup.css';
import { API_URL} from '../functions/functions'



function Login(props){
    const history = useHistory()
    
    let mess = 'Login into your account'
    let [header, setHead] = useState(mess)

    let displayTime = (value) => {
        document.getElementById('headerTit').style.color = "#680c0c";
        setHead(value);
        setTimeout(() => {
            try{
                setHead(mess)
                document.getElementById('headerTit').style.color = "black";
            } catch(err) {
                console.log(err)
            }
        }, 1500); 
    }

    async function handleLogin(data){
        try{
            let response =  await fetch(API_URL + 'login',{
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-type': 'application/json;charset-UTF-8'
                }
            })
            let res = await response.json()
            props.load()
            if(res.token === null){
                displayTime('email or password wrong');
            } else {
                displayTime('login successful')
                for(let i of document.getElementsByClassName('login')) i.value = '';
                props.log([res.name, res.token]);
                props.loguse([res.name, res.token])
                props.close()
                history.push('/account')
            }
        } catch(err){
            console.log(err)
        }

    }

    function handleSubmit(){
        let response = []
        for(let i of document.getElementsByClassName('login')) response.push(i.value)

        if (response[0] === '') displayTime("please enter email");
        else if(response[1] === '') displayTime("please enter password");
        else{
            let data = {
                email: response[0],
                password: response[1]
            }
            props.load()
            handleLogin(data);
            
        }
    }
    return props.show ? (
        <div>
            <CenterForm load={false} close={props.close}>
                <h2 id="headerTit" style={{textAlign: "center"}}> {header} </h2>
                    <div style={
                        {display: 'flex'}}>
                        <input className="login" type="email" placeholder="email"></input>
                    </div>
                    <div style={{display: 'flex'}}>
                        <input className="login" type="password" placeholder="password"></input>
                    </div>

                    <button className="log-btn grow" onClick={handleSubmit}> login </button>

            </CenterForm>
        </div>
    ) : '';
}
export default Login;