import { CountDownTimer, apiFetch } from "../functions/function";
import Cookies from "js-cookie";
import "../css/hall.css";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom"
import Loading from "../components/Loading";
import QuestionPaper from "../components/QuestionPaper";
import examio from "../assets/examio2.png";

function HallNav() {
    return (
        <div className="hall-nav">
            <img src={examio} height="20" width="90"></img>
        </div>
    )
}

function HallFoot() {
    return (
        <div className="hall-foot">
            <h3 className="small-marg"> examio &copy; {new Date().getFullYear()} </h3>

        </div>
    )
}



function Invigilator(props) {
    const history = useHistory();
    let [examState, setExamState] = useState(null)

    useEffect(   
        () => {
            let exams = Cookies.get("current-exam");

            if (exams !== undefined) {
                let info = exams.split('----');
                if (info[1] === props.code) {
                    setExamState(info[0])
                }
            } else {
                setExamState("start")
            }
            
        },[]
    )

    function organizeHall(state) {
        function ChangeUser () {
            return (
                <div>
                <h3 className="small-marg" style={{textAlign : "center"}}> switch account from "{props.user.info.name}" ? </h3>
                <h3 className="small-marg" style={{marginBottom : "30px"}}><span className="hall-link grow shadow-5"
                onClick={
                    () => {
                        let path = process.env.PUBLIC_URL + "/#/login/oneTime";
                        let top = (window.outerHeight / 2) - 250
                        let left = (window.outerWidth / 2) - 250
                        let loginWin = window.open(path, "Login to account", `height=500,width=500,top=${top},left=${left},location=no`);
                        console.log(loginWin)
                        loginWin.onunload = event => {
                            console.log("close")
                            window.location.reload()
                        }
                    }
                }
                >Click here</span></h3>
                </div>
            )
        }

        let changeMode = () => {
            let dest = {}
            apiFetch("PUT", `exam/${props.token}/${props.code}`,{
                id : props.code
            }, dest)
            .then(
                () => {
                    console.log("yippee", dest, dest.status === 200)
                    if (dest.status === 200) {
                        console.log("update")
                        Cookies.set("current-exam", `during----${props.code}`);
                        setExamState("during");
                        props.reload()
                    }
                }
            )
        }
        if (state === "start") {

            if (props.exam.status === "exam has not begun") {
                if (props.exam.start_time !== null)
                    return (
                        <div>
                            <ChangeUser/>
                            <h2 className="small-marg" style={{ textAlign: "center" }}>Time till exam</h2>
                            <CountDownTimer start={props.exam.start_time} big={true}>
                                <button className="hall-but shadow-5 grow" onClick={() => { 
                                    changeMode()
                                }}>
                                    START
                                </button>
                            </CountDownTimer>
                        </div>
                    )
                else {
                    return (
                        <h2>The exam has not been started by the examiner.</h2>
                    )
                }
            } else if (props.exam.status === "exam waiting room") {
                let detail = props.exam.details
                return (
                    <div>
                        <ChangeUser/>
                        <h2 className="small-marg" style={{ textAlign: "center" }}>Exam will soon begin</h2>
                        <CountDownTimer start={detail.start_time} big={true}>
                            <button className="hall-but shadow-5 grow" onClick={() => { changeMode() }}>
                                START
                            </button>
                        </CountDownTimer>
                    </div>
                )
            } else if (props.exam.status === "the exam is ongoing") {
                return(
                <div style={{display:"flex", flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                    <ChangeUser/>
                    <h2 className="small-marg" style={{textAlign : "center"}}>The exam has begun..</h2>
                    <button className="hall-but shadow-5 grow" onClick={() => {changeMode()}}> START </button>
                </div>)
            } else if (props.exam.status === "the exam has ended") {
                return(
                <div style={{display:"flex", flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                    <h2 className="small-marg"  style={{textAlign : "center"}}>Sorry the exam has already ended</h2>
                    <button className="hall-but shadow-5 grow" onClick={
                        () => {
                            history.push("/account/dashboard")
                        }
                    }>Go back</button>
                </div>
                )
            }
        } else if (state === "during") {
            let exam = props.exam;
            console.log(exam)
            if (exam.status === "the exam is ongoing") {
                return <QuestionPaper exam={exam} token={props.token} code={props.code} load={props.load}/>
            } else {
                return (
                    <div style={{display:"flex", flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                    <h2 className="small-marg"  style={{textAlign : "center"}}>Sorry the exam has already ended</h2>
                    <button className="hall-but shadow-5 grow" onClick={
                        () => {
                            history.push("/account/dashboard")
                        }
                    }>Go back</button>
                </div>
                )
            }

        } else {
            return (
                <div style={{display:"flex", flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                <h2 className="small-marg"  style={{textAlign : "center"}}>Sorry the exam has already ended</h2>
                <button className="hall-but shadow-5 grow" onClick={
                    () => {
                        history.push("/account/dashboard")
                    }
                }>Go back</button>
            </div>
            )
        }
    }
    return (
        <div className="center-div-2">
            {organizeHall(examState)}
        </div>
    )
}

function Hall(props) {
    let [hallData, setData] = useState({
        user: null,
        hall: null
    })

    let loader = false

    let [load, setLoad] = useState(false)

    function loadFunc() {
        loader = !loader
        setLoad(loader)
    }

    let exam_token = props.match.params.token

    let getData = () => {
        loadFunc();
        let dest1 = {}, dest2 = {};
        Promise.all([apiFetch("GET", `info/${props.user.token}`, {}, dest1), apiFetch(
            "GET", `hall/${props.user.token}/${exam_token}`, {}, dest2
        )])
            .then(
                () => {
                    loadFunc();
                    let user = null, hall = null;
                    if (dest1.status === 200) user = dest1.data;
                    if (dest2.status !== 404) hall = dest2.data;

                    setData({ ...hallData, user: user, hall: hall })
                }
            )
    }
    useEffect(
        () => {
            getData()
        }, []
    )

    function registerExam(event) {
        function displayMessage(mes) {
            let where = document.getElementById("message");
            where.innerHTML = mes
        }

        console.log(event)
        let dest = {};
        loadFunc();
        apiFetch("POST", `exam/${props.user.token}/create`, {
            id: exam_token
        }, dest)
            .then(
                () => {
                    loadFunc()
                    if (dest.status === 403) {
                        let status = dest.data.status
                        if (status === "exam has already ended") {
                            displayMessage("the exam has already been concluded..")
                        } else if (status === "not allowed for this exam") {
                            displayMessage("you are not allowed to write this exam")
                        }
                        event.target.style.display = "none";
                    } else if (dest.status === 404) {
                        displayMessage("this exam no longer exists..");
                        event.target.style.display = "none";
                    } else if (dest.status === 200) {
                        event.target.style.display = "none";
                        displayMessage("Exam registration successfull");
                        setTimeout(
                            () => {
                                getData()
                            }, 1000
                        )
                    }
                }
            )
    }

    function generateHall(hallData) {
        if (hallData.hall === null) {
            return (
                <div className="center-div-2">
                    <h1 className="small-marg not-clear">Oops  !!!</h1>
                    <h4 className="small-marg not-clear">Exam not found...</h4>
                    <h5 className="small-marg not-clear">Recheck link and try again</h5>
                </div>
            )
        } else {
            let exam_data = hallData.hall;
            let user = hallData.user
            if (user === null) {
                if (exam_data.status === "not authorized to write this exam") {
                    return (
                        <div className="center-div-2">
                            <h2 className="small-marg"> This exam requires some verificaion</h2>
                            <h3 className="small-marg"> You will need to login on this device.</h3>

                            <button className="hall-but shadow-5 grow" onClick={
                                () => {
                                    let path = process.env.PUBLIC_URL + "/#/login/oneTime";
                                    let top = (window.outerHeight / 2) - 250
                                    let left = (window.outerWidth / 2) - 250
                                    let loginWin = window.open(path, "Login to account", `height=500,width=500,top=${top},left=${left},location=no`);

                                    loginWin.onunload = event => {
                                        console.log("close")
                                        window.location.reload()
                                    }
                                }
                            }>
                                Login
                            </button>
                        </div>
                    )
                } else {
                    return (
                        <Invigilator exam={exam_data} reload={getData}/>
                    )
                }
            } else {
                if (exam_data.status === "not registered for this examination") {
                    return (
                        <div className="center-div-2">
                            <h3 className="small-marg" id="message">"{user.info.name}" is not registered for this exam</h3>

                            <button className="hall-but shadow-5 grow" onClick={event => { registerExam(event) }}>
                                Register
                            </button>
                        </div>
                    )
                } else {
                    return (
                        <Invigilator exam={exam_data} user={user} load={loadFunc} reload={getData} code={exam_token} token={props.user.token}/>
                    )
                }
            }
        }

    }
    return (
        <div>
            <Loading show={load} />
            <HallNav />
            {generateHall(hallData)}
            <HallFoot />
        </div>
    )

}

export default Hall;