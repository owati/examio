import { useState, useEffect } from "react";
import { apiFetch } from "../functions/function";

function ViewPage(props) {
    let [sorted, setSort] = useState([[], []]);
    let [page, setPage] = useState("all");

    function buttonFunc(id) {
        function getExam(id) {
            return props.exams.filter(
                x => x.id === id
            )[0]
        }
        let exam = getExam(id)
        try{
            let div = document.getElementById("exam-details-" + id)
            if(div.style.height === "0px") div.style.height === "150px";
            else div.style.height === "0px";
        } catch {
            
        }
    }

    let generateExamList = (page) => {
        try {
            let content = [];
            switch (page) {
                case "all":
                    for (let i of props.exams) {
                        content.push(<button className='exam-list-button grow shadow-5' onClick={() => { buttonFunc(i.id) }}>
                            <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                                <h4 style={{ margin: "0px" }}>{i.exam.name}</h4> <h4 style={{ margin: "0px" }}>{new Date(i.date_stamp).toLocaleDateString()}</h4>
                            </div>
                            <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
                                <h4 style={{ margin: "10px", color: "rgba(255, 248, 220, 0.474)" }}>Status : {i.status}</h4>
                            </div>
                        </button>)
                    }
                    break;
                case "start":
                    for (let i of sorted[0]) {
                        content.push(<button className='exam-list-button grow shadow-5' onClick={() => { buttonFunc(i.id) }}>
                            <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                                <h4 style={{ margin: "0px" }}>{i.exam.name}</h4> <h4 style={{ margin: "0px" }}>{new Date(i.date_stamp).toLocaleDateString()}</h4>
                            </div>
                            <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
                                <h4 style={{ margin: "10px", color: "rgba(255, 248, 220, 0.474)" }}>Status : {i.status}</h4>
                            </div>
                        </button>)
                    }
                    break;
                case "com":
                    for (let i of sorted[1]) {
                        content.push(<button className='exam-list-button grow shadow-5' onClick={() => { buttonFunc(i.id) }}>
                            <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                                <h4 style={{ margin: "0px" }}>{i.exam.name}</h4> <h4 style={{ margin: "0px" }}>{new Date(i.date_stamp).toLocaleDateString()}</h4>
                            </div>
                            <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
                                <h4 style={{ margin: "10px", color: "rgba(255, 248, 220, 0.474)" }}>Status : {i.status}</h4>
                            </div>
                        </button>)
                    }
                    break;
                default:
                    content = []
            }
            content.reverse();

            if (content.length === 0) {
                content = (<div className='exam-none'>
                    <h5>{page === "all" ? "you have no created exam" : "no exam in this category"}</h5>
                </div>)
            }
            return (
                <div className='exam-details-list'>
                    {content}
                </div>
            )
        }
        catch(error){
            return <div>loading</div>
        }
    }

    useEffect(() => {
        try{

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
    try{
    return (
        <div className='exam-view'>
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
    ) }
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



    useEffect(
        () => {
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
        }, []
    )

    function selectPage(page) {
        switch (page) {
            case "create":
                return <RegisterExam load={props.load} token={props.token} />
            case "view":
                return <ViewPage exams={exam.data} />
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