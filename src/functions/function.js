import { useState ,useEffect } from "react";

export const API_URL =  "http://127.0.0.1:8000/"  // "https://examio.herokuapp.com/"   

export const apiFetch = async function (method = 'GET', endPoint = null, body = {}, destination) {

    try {
        let response = method !== "GET" ? await fetch(API_URL + endPoint, {
            method: method,
            body: JSON.stringify(body),
            headers: {
                "content-type": "application/json"                      // to be returned
            }
        }) : await fetch(API_URL +  endPoint)
        destination.status = response.status

        let res = await response.json()
        destination.data = res;
        console.log(destination)
    } catch(error) {
        console.log(error)
    }
}

export var CountDownTimer = props => {

    let [show, setShow] = useState(false);

    function beautify(num) {
        if (num < 10) {
            return  '0' + num;
        } else {
            return num
        }
    }
    
    useEffect(
        () => {
            let dest = {};
            var timer;
            apiFetch("GET","time",{},dest)
            .then(
                () => {
                    if (dest.status === 200) {
                        console.log(props.start)
                        let now = new Date(dest.data.curr_time);
                        let end = new Date(props.start)
                        console.log(now, end, now -end)
                        let duration = end - now;
                        duration = Math.floor(duration / 1000)
                        timer = setInterval(() => {
                            if (duration < 1) {
                                clearInterval(timer);
                                setShow(true)
                            }
                            let days = Math.floor(duration / (3600 * 24))
                            let hours = Math.floor((duration % (3600 * 24)) / 3600)
                            let minutes = Math.floor((duration % 3600) / 60)
                            let secs = duration % 60

                            try{
                                document.getElementById("timer").innerHTML = `${days} days ${beautify(hours)}:${beautify(minutes)}:${beautify(secs)}`
                            } catch {

                            }
                            duration -= 1
                        }, 1000);
                    }
                }
            )

            return function cleanup () {
                try{
                    clearInterval(timer)
                } catch {

                }
            }
        },[]
    )
    return !show ? (
        <h2 id="timer" className="small-marg" style={props.big ? {fontSize : "50px"} : {}}>00:00:00</h2>
    ) : props.children === undefined ? (
        <h2>00:00:00</h2>
    ) : (
        <div>
         {props.children}
        </div>
    )
}