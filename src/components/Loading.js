import { useEffect } from "react";
import examio from "../assets/examio.png";
import "../css/loading.css";

function Loading(props) {
    var timer;

    useEffect(() => {
        if (props.show) {
            var count = 1;
            timer = setInterval(() => {
                for (let i = 1; i < 4; i++) {
                    let which = document.getElementById(`load${i}`)

                    if (i === count) {
                        which.style.width = "13px";
                        which.style.height = "13px";
                    } else {
                        which.style.width = "10px";
                        which.style.height = "10px";
                    }
                }

                if (count === 3) {
                    count = 1;
                } else {
                    count++;
                }
            }, 500)
        } else {
            clearInterval(timer)
        }

        return function cleanup() {
            clearInterval(timer)
        }

    }, [props])

    return props.show ? (
        <div className="load-center">
            <img src={examio} height="30" width="120"></img>
            <div style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                width: "50px",
                height: "30px",
                marginTop: "10px"
            }}>
                <div id="load1">

                </div>
                <div id="load2">

                </div>
                <div id="load3">

                </div>

            </div>

        </div>
    ) : ''
}

export default Loading;