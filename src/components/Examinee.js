import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { apiFetch, CountDownTimer } from "../functions/function";

function ViewPage(props) {
    const history = useHistory();
    let [sorted, setSort] = useState([[], []]);
    let [page, setPage] = useState("all");

    let joinHall = exam => {history.push("/hall/" + exam.exam["exam code"])}

    let deleteExam = exam => {
        props.load();
        let dest = {}
        apiFetch("DELETE", `exam/${props.token}/${exam.id}`,{},dest)
        .then(
            () => {
                props.load()
                if(dest.status === 200) {
                    props.reload()
                }
            }
        )
    }

    function buttonFunc(id) {
        try {
            let div = document.getElementById("exam-details-" + id)
            if (div.style.height === "0px") {div.style.height = "150px"; div.style.overflowY = "scroll";}
            else {div.style.height = "0px"; div.style.overflowY = "hidden"}
        } catch {

        }
    }

    let displayExtended = exam => {
        switch (exam.status) {
            case "registered":
                if (exam.exam.status === "created") {
                    if (exam.exam.start === null) {
                        return (
                            <div className="centralize">
                                <h2>This exam has no time, specified by the examinerr</h2>
                                <button className="exam-create-but danger" onClick={() => deleteExam(exam)}> delete </button>
                            </div>
                        )
                    } else {
                        return (
                            <div className="centralize">
                                <h2>time till exam ..</h2>
                                <CountDownTimer start={exam.exam.start}>
                                    <button className="exam-create-but" onClick={() => joinHall(exam)}>Join Exam</button>
                                </CountDownTimer>
                                <button className="exam-create-but danger" onClick={() => deleteExam(exam)}> delete </button>
                            </div>
                        )
                    }
                } else if (exam.exam.status === "starting") {
                    return (
                        <div className="centralize">
                            <h2>The exam will soon be starting..</h2>
                            <button className="exam-create-but" onClick={() => joinHall(exam)}>Join Exam</button>
                            <button className="exam-create-but danger" onClick={() => deleteExam(exam)}> delete </button>
                        </div>
                    )
                } else if (exam.exam.status === "during") {
                    return (
                        <div className="centralize">
                            <h2>The exam is currently ongoing..</h2>
                            <button className="exam-create-but" onClick={() => joinHall(exam)}>Join Exam</button>
                            <button className="exam-create-but danger" onClick={() => deleteExam(exam)}> delete </button>
                        </div>
                    )
                } else {
                    return (
                        <div className="centralize"> 
                            <h2>The exam has already been concluded..</h2>
                            <button className="exam-create-but danger" onClick={() => deleteExam(exam)}> delete </button>
                        </div>
                    )
                }
            default:
                return (
                    <div className="centralize">
                        <h3>Exam completed</h3>
                        <button className="exam-create-but">View result</button>
                        <button className="exam-create-but danger" onClick={() => deleteExam(exam)}> delete </button>
                    </div>
                )
        }
    }

    let generateExamList = (page) => {
        try {
            let content = [];
            switch (page) {
                case "all":
                    for (let i of props.exams) {
                        content.push(
                            <div>
                                <button className='exam-list-button grow shadow-5' onClick={() => { buttonFunc(i.id) }}>
                                    <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                                        <h4 style={{ margin: "0px" }}>{i.exam.name}</h4> <h4 style={{ margin: "0px" }}>{new Date(i.date_stamp).toLocaleDateString()}</h4>
                                    </div>
                                    <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
                                        <h4 style={{ margin: "10px", color: "rgba(255, 248, 220, 0.474)" }}>Status : {i.status}</h4>
                                    </div>
                                </button>
                                <div style={{ height: "0px", overflowY: "hidden", transition: "0.8s all ease" }} id={`exam-details-${i.id}`}>
                                    {displayExtended(i)}
                                </div>
                            </div>)
                    }
                    break;
                case "start":
                    for (let i of sorted[0]) {
                        content.push(
                            <div>
                                <button className='exam-list-button grow shadow-5' onClick={() => { buttonFunc(i.id) }}>
                                    <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                                        <h4 style={{ margin: "0px" }}>{i.exam.name}</h4> <h4 style={{ margin: "0px" }}>{new Date(i.date_stamp).toLocaleDateString()}</h4>
                                    </div>
                                    <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
                                        <h4 style={{ margin: "10px", color: "rgba(255, 248, 220, 0.474)" }}>Status : {i.status}</h4>
                                    </div>
                                </button>
                                <div style={{ height: "0px", overflowY: "hidden", transition: "0.8s all ease" }} id={`exam-details-${i.id}`}>
                                    {displayExtended(i)}
                                </div>
                            </div>)
                    }
                    break;
                case "com":
                    for (let i of sorted[1]) {
                        content.push(
                            <div>
                                <button className='exam-list-button grow shadow-5' onClick={() => { buttonFunc(i.id) }}>
                                    <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                                        <h4 style={{ margin: "0px" }}>{i.exam.name}</h4> <h4 style={{ margin: "0px" }}>{new Date(i.date_stamp).toLocaleDateString()}</h4>
                                    </div>
                                    <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
                                        <h4 style={{ margin: "10px", color: "rgba(255, 248, 220, 0.474)" }}>Status : {i.status}</h4>
                                    </div>
                                </button>
                                <div style={{ height: "0px", overflowY: "hidden", transition: "0.8s all ease" }} id={`exam-details-${i.id}`}>
                                    {displayExtended(i)}
                                </div>
                            </div>)
                    }
                    break;
                default:
                    content = []
            }
            content.reverse();

            if (content.length === 0) {
                content = (<div className='exam-none'>
                    <h5>{page === "all" ? "you have no registered exam" : "no exam in this category"}</h5>
                </div>)
            }
            return (
                <div className='exam-details-list'>
                    {content}
                </div>
            )
        }
        catch (error) {
            return <div>loading</div>
        }
    }

    useEffect(() => {
        try {

            if (!props.loading) {
                let start = [], complete = [];

                for (let i of props.exams) {
                    if (i.status === "registered") start.push(i);
                    else complete.push(i);
                }
                setSort([start, complete]);
            }
        } catch {

        }

    }, [props])
    try {
        return (
            <div className='exam-view'>
                <div style={{ display: "flex", position: "sticky" }} className="pad-10">
                    <h2 className='back-button grow' style={{ marginTop: "8px" }} onClick={
                        () => {
                            document.getElementsByClassName("exam-action-page")[0].style.display = "none";
                        }
                    }>&#8630; </h2>
                    <h2 id="create-header">View Exams...</h2>
                </div>
                <div className='exam-view-actions'>
                    <div className={'exam-view-group grow' + (page === "all" ? ' bottom-border' : '')} onClick={() => { setPage("all") }}>
                        <h4 style={{ display: "flex" }}>all <div className='exam-num'>{props.exams.length}</div></h4>
                    </div>
                    <div className={'exam-view-group grow' + (page === "start" ? ' bottom-border' : '')} onClick={() => { setPage("start") }}>
                        <h4 style={{ display: "flex" }}>pending <div className='exam-num'>{sorted[0].length}</div></h4>
                    </div>
                    <div className={'exam-view-group grow' + (page === "com" ? ' bottom-border' : '')} onClick={() => { setPage("com") }}>
                        <h4 style={{ display: "flex" }}>completed <div className='exam-num'>{sorted[1].length}</div></h4>
                    </div>

                </div>
                {generateExamList(page)}
            </div>
        )
    }
    catch {
        return <div>Loading...</div>
    }

}

function RegisterExam(props) {

    function displayError(mes) {
        let header = document.getElementById("create-header")
        header.innerHTML = mes

        setTimeout(
            () => {
                header.innerHTML = "Enter exam code to register.."
            }, 2000
        )
    }

    function handleRegister(event) {
        props.load()
        event.preventDefault();
        let formData = new FormData(event.target)
        let dest = {}
        apiFetch("POST", `exam/${props.token}/all`, {
            id: formData.get("exam-code")
        }, dest)
            .then(
                () => {
                    props.load()
                    if (dest.status === 200) {
                        displayError("Exam registeration successfully..")
                        props.reload()
                    }
                    else if (dest.status === 403) {
                        let remark = dest.data.status
                        if (remark === "not allowed for this exam") {
                            displayError("❗ Sorry this exam is for specific people")
                        } else if (remark === "exam has already ended") {
                            displayError("Oops the exam has already ended")
                        } else if (remark === "already registered") {
                            displayError("You have already registered for this exam")
                        }
                    } else if (dest.status === 404) {
                        displayError("Exam code is not valid ❗❗")
                    } else {
                        displayError("Exam could not be registered..")
                    }

                }
            )


    }
    useEffect(
        () => {
            let form = document.getElementById("exam-register-div")

            form.addEventListener("submit", handleRegister)

            return function cleanup() {
                form.removeEventListener("submit", handleRegister)
            }
        }, []
    )
    return (
        <div className='exam-create-div'>
            <div style={{ display: "flex", position: "sticky" }}>
                <h2 className='back-button grow' style={{ marginTop: "8px" }} onClick={
                    () => {
                        document.getElementsByClassName("exam-action-page")[0].style.display = "none";
                    }
                }>&#8630; </h2>
                <h2 id="create-header">Enter exam code to register..</h2>
            </div>
            <form id="exam-register-div" style={{ alignItems: "center", marginTop: "50px", border: "2px solid rgba(242, 242, 242, 0.529)", borderRadius: "10px", padding: "10px" }}>
                <input type="text" name="exam-code" style={{
                    height: "40px"
                }} className="create-form-input" placeholder="exam code.."></input>
                <button className="exam-create-but" style={{ height: "50px" }} type="submit"> Register</button>
            </form>
        </div>
    )
}


function Examinee(props) {
    let [page, setPage] = useState("view")

    let [exam, setExam] = useState({ data: null })
    
    let getData = () => {
        let dest = {};
        props.load();
        apiFetch("GET", `exam/${props.token}/all`, {}, dest)
            .then(
                () => {
                    props.load()
                    if (dest.status === 200) {
                        setExam({ ...exam, data: dest.data.exams })
                    }
                }
            )
    }



    useEffect( () => {
        getData()
    }, [])

    function selectPage(page) {
        switch (page) {
            case "create":
                return <RegisterExam load={props.load} token={props.token} reload={getData}/>
            case "view":
                return <ViewPage exams={exam.data} token={props.token} load={props.load} reload={getData}/>
            default:
                return <div>fuck..</div>

        }
    }
    return (
        <div className='exam-main'>
            <div className='exam-action'>
                <div className='section-header'>
                    <h2 style={{ margin: "0px" }}>Manage Exams</h2>
                </div>
                <div className='exam-details shadow-5'>
                    <h2 style={{ margin: "0px" }}>Total exams: {props.user.exam}</h2>

                    <div></div>

                </div>

                <div className='exam-action-group'>
                    <button className={`exam-action-butt grow`}
                        onClick={() => {
                            setPage("create")
                            document.getElementsByClassName("exam-action-page")[0].style.display = "flex";
                        }}>
                        <div>
                            <h3 className={`${page === "create" ? "active" : ""}`} style={{ margin: "0px", textAlign: "start" }}> Register..</h3>
                            <h5 style={{ margin: "0px", marginTop: "10px" }}> register for new exams.. </h5>
                        </div>

                    </button>
                    <button className={`exam-action-butt grow`}
                        onClick={() => {
                            setPage("view")
                            document.getElementsByClassName("exam-action-page")[0].style.display = "flex";
                        }}>
                        <div>
                            <h3 className={`${page === "view" ? "active" : ""}`} style={{ margin: "0px", textAlign: "start" }}> View..</h3>
                            <h5 style={{ margin: "0px", marginTop: "10px" }}> list of exams registered </h5>
                        </div>

                    </button>
                    <button className={`exam-action-butt grow`}
                        onClick={() => {
                            setPage("create")
                            document.getElementsByClassName("exam-action-page")[0].style.display = "flex";
                        }}>
                        <div>
                            <h3 className={`${page === "create" ? "active" : ""}`} style={{ margin: "0px", textAlign: "start" }}> Create exam</h3>
                            <h5 style={{ margin: "0px", marginTop: "10px" }}> make new exams </h5>
                        </div>

                    </button>
                    <button className={`exam-action-butt grow`}
                        onClick={() => {
                            setPage("create")
                            document.getElementsByClassName("exam-action-page")[0].style.display = "flex";
                        }}>
                        <div>
                            <h3 className={`${page === "create" ? "active" : ""}`} style={{ margin: "0px", textAlign: "start" }}> Create exam</h3>
                            <h5 style={{ margin: "0px", marginTop: "10px" }}> make new exams </h5>
                        </div>

                    </button>
                </div>
            </div>
            <div className='exam-action-page'>
                {selectPage(page)}
            </div>

        </div>
    )


}

export default Examinee;