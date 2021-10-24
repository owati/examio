import { useState } from "react";
import CenterForm from "./CenterForm";
import { API_URL } from "../functions/functions";
import '../css/signup.css'


function Signup (props){
    let mess = `create an account`;
    let [header, setHead] = useState(mess)

    let displayTime = (value) => {
        document.getElementById('headerTit').style.color = "#680c0c";
        setHead(value);
        setTimeout(() => {
            setHead(mess)
            document.getElementById('headerTit').style.color = "black";
        }, 1500);
    }

    let handleSubmit = () => {
        async function submitForm(send){         
            try{
                
                let response = await fetch(API_URL + 'signup',{
                    method: 'POST',
                    body: JSON.stringify(send),
                    headers:{
                        'Content-type': 'application/json;charset-UTF-8'
                    }
                })
                let data = await response.json()
                console.log('data',data)
                props.load()
                if(data.status === undefined){
                    if(data.error === 'server problem') {
                        displayTime('oops internal server problem');
                        props.close();
                    }
                    else displayTime('the email alread in use')
                } else {    
                    for(let i of document.getElementsByClassName('signup')) i.value = '';
                    props.close();
                    props.login();
                }


            } catch (err){
                console.log(err)
            }

        }
        let responses = [];
        let empty = false;
        for(let i of document.getElementsByClassName('signup')) {
            responses.push(i.value);
            if(i.value === '') empty = true;
        }

        if(empty) displayTime('please fill the form');

        else if(responses[4] !== responses[5]){
            displayTime('passwords not the same');
        } else {
            props.load()
            let data = {
                name: responses[0] + ' ' + responses[1],
                email: responses[2],
                phone: responses[3],
                role: props.which === 'examiner',
                password: responses[4]
            };
            submitForm(data);
            
        }



    }

    return props.show === true ? (
        <div>
            <CenterForm load={false} close={props.close}>
                <h2 id="headerTit" style={{textAlign: "center"}}> {header} </h2>
                <div style={
                    {display: 'flex'}}>
                    <input className="signup" type="text" placeholder="first name"></input>
                    <input className="signup" type="text" placeholder="last name"></input>
                </div>
                <div style={{display: 'flex'}}>
                    <input className="signup" type="email" placeholder="your email"></input>
                    <input className="signup" type="number" placeholder="phone no"></input>
                </div>
                <div style={{display: 'flex'}}>
                    <input className="signup" type="password" placeholder="enter password"></input>
                    <input className="signup" type="password" placeholder="confirm password"></input>
                </div>

                <button className="log-btn grow" onClick={handleSubmit}> sign up </button>

            </CenterForm>
        </div>
    ) : ''

}

export default Signup;