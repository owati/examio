import { useState, useEffect } from 'react';
import { apiFetch, API_URL, CountDownTimer } from '../functions/function';
import back from '../assets/backarr.png';

const home_url = "examio"

function ExamLogs(props) {
    let [hall, setHall] = useState({})

    function generateLogs(status) {
        switch (status) {
            case "created":
                if (props.exam.start === null) {
                    return [
                        <h2>the exam is yet to start nad has no start time..</h2>,
                        <button className='exam-create-but'>Start exam</button>
                    ]
                } else {
                    let time = new Date(props.exam.start)
                    return [
                        <h2 className='small-marg'>Start time: </h2>,
                        <h3 className='small-marg'>{time.toLocaleDateString()} {time.toLocaleTimeString()} </h3>,
                        <h3 className='small-marg' style={{marginTop : "30px"}}> exam will begin in..</h3>,
                        <CountDownTimer start={props.exam.start}>

                        </CountDownTimer>
                    ]
                }
            case "end":
                return [
                    <h1 className='small-marg'>exam has ended..</h1>

                ]

            default:
                return <h1>Oops</h1>
        }
    }
    useEffect(() => {
        // let endpoint = API_URL.replace("http", "ws") + `logs/${props.token}/${props.exam.id}`
        // let socket = new WebSocket(endpoint)

        // socket.onopen = e => {
        //     console.log("open", e)
        // }
        // socket.onmessage = e => {
        //     console.log("message", e)
        // }

        // socket.onerror = e => {
        //     console.log("error", e)
        // }

        // socket.onclose = e => {
        //     console.log("close", e)
        // }

        // return function cleanup() {
        //     socket.close()
        // }
        if (props.exam.status === "created") {
            if (props.exam.start === null) {

            }
        }
    }, [])
    try {
        return (
            <div className='exam-create-div' style={{ height: "100%", overflow: "hidden" }}>
                <div style={{ display: "flex", position: "sticky" }}>
                    <h2 className='back-button grow' onClick={
                        () => {
                            document.getElementsByClassName("exam-action-page")[0].style.display = "none";
                        }
                    }>&#8630; </h2>
                     <h2 className='small-marg' style={{ textAlign: "left" }}>Exam logs.</h2>
                </div>
               
                <div className='log-div'>
                    {generateLogs(props.exam.status)}
                </div>
            </div>
        )
    } catch {
        return (
            <div className='log-div'>
                <h3 style={{ textAlign: "center", color: "rgba(242, 242, 242, 0.529)" }}>loading...</h3>
            </div>
        )
    }
}

function ExamEdit(props) {
    let [data, setData] = useState({});

    function displayError(mes) {
        try {
            let header = document.getElementById("edit-header");
            document.getElementById("edit-div").scrollTop = "0px";
            header.innerHTML = mes;
            setTimeout(
                () => {
                    header.innerHTML = "Edit questions.."
                }, 2000
            )

        } catch {

        }
    }

    function generatePage() {
        function arrangeData(key) {
            function regularInput(which, place, type) {
                if (which === "num_of_students") which = "students"
                return <input className='create-form-input' style={{ width: "150px", height: "30px" }} placeholder={place} type={type} onChange={event => {
                    let ref = { ...data };
                    ref[which] = event.target.value;
                    setData(ref);
                }}></input>

            }

            switch (key) {
                case "num_of_students":
                    return ["Number of students", regularInput(key, "Number of students", "number")];
                case "total":
                    return ["Total marks", regularInput(key, "Total marks", "number")];
                case "end-time":
                    return ["End time", <h3 style={{ margin: "10px 0px", color: "rgba(255, 248, 220, 0.474)" }}>this field cannot be changed</h3>]
                case "start":
                    let dateChange = event => {
                        let self = event.target;
                        let check = self.type === "date"
                        let other = document.getElementById(`${check ? "time-update" : "date-update"}`);
                        let ref = { ...data };
                        let date = new Date(check ? self.value + " " + other.value : other.value + " " +self.value);
                        if (String(date) === "Invalid Date") {
                            ref[key] = null;
                        } else {
                            ref[key] = date.toJSON();
                        }
                        setData(ref)
                    }
                    let input = <div style={{ display: "flex" }}>
                        <input className='create-form-input' style={{ width: "150px", height: "30px" }} type="date" id="date-update" onChange={event => { dateChange(event) }} ></input>
                        <input className='create-form-input' style={{ width: "150px", height: "30px" }} type="time" id="time-update" onChange={event => { dateChange(event) }} ></input>
                    </div>
                    return ["Start time", input]
                case "duration":
                    return ["Exam duration", regularInput(key, "Number of students", "number")];

                default:
                    let cap_key = [...key]
                    cap_key[0] = cap_key[0].toUpperCase();

                    return [cap_key.join(""), regularInput(key, cap_key.join(""), "text")]
            }





        }
        let comp = []
        for (let i in props.exam) {
            if (i === "id" | i === "date_stamp" | i === "exam_code") {

            } else {
                comp.push(
                    <div>
                        <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0px", borderBottom: "rgba(255, 248, 220, 0.474) 2px solid" }}>
                            <div>
                                <h3 style={{ margin: "4px 0px" }}>{arrangeData(i)[0]}</h3>
                                <h5 style={{ margin: "0px" }}>{props.exam[i] === null ? "not specified" : ["start", "end-time"].includes(i) ? `${new Date(props.exam[i]).toLocaleDateString() + " " + new Date(props.exam[i]).toLocaleTimeString()}` :
                                    ["duration", "personal_time"].includes(i) ? `${props.exam[i][0]} hours ${props.exam[i][1]}minutes ${props.exam[i][2]} seconds` : props.exam[i]}</h5>
                            </div>

                            <button className='exam-create-but' onClick={() => {
                                let div = document.getElementById("field-" + i)
                                if (div.style.height === "0px") {
                                    div.style.height = "70px"
                                } else {
                                    div.style.height = "0px"
                                }

                            }}>change</button>
                        </div>
                        <div style={{
                            height: "0px",
                            overflow: "hidden",
                            transition: "0.8s ease all",
                            display: "flex",
                            justifyContent: "center"
                        }} id={"field-" + i}>

                            {arrangeData(i)[1]}
                        </div>
                    </div>
                )
            }
        }

        return comp
    }
    return (
        <div className='exam-create-div' id="edit-div">
            <div style={{ display: "flex", position: "sticky" }}>
                <h2 className='back-button grow' onClick={
                    () => {
                        document.getElementsByClassName("exam-action-page")[0].style.display = "none";
                    }
                }>&#8630; </h2>
                <h2 id="edit-header" style={{ margin: "5px" }}> Edit exam fields...</h2>

            </div>
            <h3 style={{ color: "rgba(255, 248, 220, 0.474)" }}>Exam code: {props.exam["exam code"]}</h3>
            {generatePage()}
            <div style={{ display: "flex", justifyContent: "center", margin: "20px" }}>
                <button className="exam-create-but grow shadow-5" onClick={() => {

                    {
                        props.load();
                        console.log(data)
                        let dest = {}
                        apiFetch("PUT", `exam/${props.token}/${props.id}`, { changes: data }, dest)
                            .then(
                                () => {
                                    if (dest.status === 200) {
                                        props.load();
                                        props.reload();
                                    } else {
                                        displayError("update not sucessfull...")
                                    }
                                }
                            )
                    }
                }}>save changes</button>
            </div>

        </div>
    )

}


function QuestionEdit(props) {
    let [quest, setQuest] = useState("obj");

    let [page, setPage] = useState("create");
    let [objnum, setObj] = useState(4);


    function displayError(message) {
        let header = document.getElementById('create-header'), container = document.getElementsByClassName("exam-action-page")[0];
        header.innerHTML = message;
        container.scrollTop = 0;
        setTimeout(() => {
            header.innerHTML = "Set the exam questions..."
        }, 1500);
    }

    function generatePage(page) {
        function UpdateQuestion(props) {
            let [field, setField] = useState("mark");
            let [mode, setMode] = useState(props.mode)

            function getField() {
                switch (field) {
                    case "others":
                        let comp = []
                        if (mode === 'o') {
                            for (let i = 0; i < props.option.length; i++) {
                                comp.push(
                                    <input type="text" className="create-form-input" name={`option${i + 1}`} placeholder={`option ${i + 1}`}></input>
                                )
                            }
                            comp.push(<input type="number" className="create-form-input" name="correct" placeholder='the number of the correct option'></input>)
                        } else {
                            comp = <textarea className='create-form-input' placeholder={'enter the answer here\n' + (mode === 'g' ? 'enter the answer for each gap on a new line' : '')} name="options"></textarea>
                        }
                        return (
                            <div>
                                <select className='create-form-input' onChange={
                                    event => {
                                        setMode(event.target.value)
                                    }
                                } name="mode" value={mode}>
                                    <option style={{ color: "black" }} value='o'> Obj</option>
                                    <option style={{ color: "black" }} value='g'>German</option>
                                    <option style={{ color: "black" }} value='t'>Theory</option>
                                </select>
                                <textarea className='create-form-input' placeholder={'enter the new question' + (mode === 'g' ? '\n replace empty gaps with {dash}' : "")} name="question"></textarea>
                                {comp}
                            </div>
                        )
                    case "mark":
                        return (
                            <input type="number" name="mark" className="create-form-input" placeholder="exam mark"></input>
                        )
                }
            }

            let setOptions = quest => {
                try {
                    let options = props.option
                    let answer = props.answer

                    function change(num) {
                        return ['a', 'b', 'c', 'd', 'e', 'f'][num - 1]
                    }
                    if (quest === 'o') {
                        let comp = [], count = 1;
                        for (let i of options) {
                            comp.push(
                                <div> <h4 style={{ margin: "10px" }}>{change(count)}. {i} {i === answer ? '(correct)' : ""}</h4></div>
                            )
                            count++;
                        }
                        return comp;
                    } else if (quest === 'g') {
                        return <div> <h4 style={{ margin: "10px" }}>{options}</h4></div>

                    } else {
                        return <div> <h4 style={{ margin: "10px" }}>{options}</h4></div>

                    }
                } catch {
                    return <div></div>
                }
            }


            useEffect(() => {
                let handleQuestionUpdate = function (event) {
                    event.preventDefault();
                    try {


                        let displayError = message => {
                            let header = document.getElementById('edit-header' + props.num);
                            let div = document.getElementById(`question${props.num}`)
                            div.scrollTop = "0px"
                            header.innerHTML = message;
                            setTimeout(
                                () => {
                                    header.innerHTML = 'Edit Questions...'
                                }, 3000
                            )
                        }
                        let form = event.target;
                        let formData = new FormData(form);

                        if (formData.get("field") === "mark") {
                            if (formData.get("mark") === null) {

                            } else {
                                props.load();
                                let dest = {};
                                apiFetch("PUT", `question/${props.token}/${props.id}`, {
                                    number: props.num,
                                    changes: {
                                        mark: formData.get("mark")
                                    }
                                }, dest).then(
                                    () => {
                                        if (dest.status === 200) {
                                            props.load()
                                            props.reload()
                                        } else {

                                        }
                                    }
                                )
                            }
                        } else {
                            if (mode === 'o') {
                                if ((
                                    function () {
                                        let check = false
                                        for (let i = 0; i < props.option.length; i++) {
                                            if (formData.get(`option${i + 1}`) === null) {
                                                check = true
                                            }
                                        }
                                        return formData.get("correct") === null ? true : check;
                                    }
                                )()) formData.append("options", '')

                                else formData.append("options", [formData.get("correct"),
                                ...(
                                    function () {
                                        let list = [];
                                        for (let i = 0; i < props.option.length; i++) {
                                            list.push(formData.get(`option${i + 1}`))
                                        }
                                        return list
                                    }
                                )()
                                ])
                            }

                            if (formData.get("mode") !== props.mode) {
                                console.log(typeof formData.get("question"))
                                if (formData.get("question") === '' || formData.get("options") === null) {
                                    displayError("Once the mode is changed, no field can be left empty");
                                    return
                                }
                            }
                            let dest = {};
                            props.load();
                            apiFetch("PUT", `question/${props.token}/${props.id}`, {
                                number: props.num,
                                changes: {
                                    question: formData.get("question"),
                                    options: formData.get("options")
                                }
                            }, dest).then(
                                () => {
                                    if (dest.status === 200) {
                                        props.load();
                                        props.reload();
                                    } else {

                                    }
                                }
                            )

                        }
                    } catch (error) {
                        console.log(error)
                    }
                }
                let form = document.getElementById("question-update" + props.num)
                form.addEventListener("submit", handleQuestionUpdate);

            }, [])


            return (
                <div style={{ height: "0px", transition: "1.0s ease all", overflow: "hidden" }} id={`question${props.num}`}>
                    <h3>answers</h3>
                    {setOptions(props.mode)}

                    <h3 id={"edit-header" + props.num}>Edit Questions..</h3>
                    <form id={"question-update" + props.num} style={{ padding: "10px" }} >
                        <select className='create-form-input' name="field" onChange={event => {
                            setField(event.target.value)
                        }}>
                            <option style={{ color: "black" }} value="mark">Mark</option>
                            <option style={{ color: "black" }} value="others">Others</option>
                        </select>
                        {getField()}
                        <div style={{ display: "flex", justifyContent: "center" }}> <button className='exam-create-but shadow-5 grow'>make changes</button></div>
                    </form>
                </div>
            )
        }
        function questionList(list) {

            function arrange(str, mode) {
                if (mode === 'g') {
                    while (str.includes("{dash}")) {
                        str = str.replace("{dash}", "______")
                    }
                    return str;
                } else {
                    return str;
                }
            }
            let comp = []
            for (let i of list) {
                comp.push(
                    <div>
                        <button className='exam-list-button grow shadow-5' onClick={() => {
                            let div = document.getElementById(`question${i.number}`);
                            if (div.style.height === "300px") {
                                div.style.height = "0px";
                                div.style.overflowY = "hidden";
                            } else {
                                div.style.height = "300px";
                                div.style.overflowY = "scroll";
                            }
                        }}>
                            <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                                <h4 style={{ margin: "0px" }}>{i.number} {arrange(i.question, i.mode)}</h4> <h4 style={{ margin: "0px" }}>mode :{i.mode}</h4>
                            </div>
                            <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
                                <h4 style={{ margin: "10px", color: "rgba(255, 248, 220, 0.474)" }}>{i.mark} mark</h4>
                            </div>
                        </button>
                        <UpdateQuestion answer={i.answer} option={i.options} mode={i.mode} num={i.number} load={props.load} reload={props.reload} token={props.token} id={props.id} />
                    </div>
                )
            }

            return comp;
        }
        switch (page) {
            case "create":
                return (
                    <div>
                        <div className='question-div'>
                            <select className='create-form-input' value={quest} style={{ width: "fit-content" }} onChange={event => {
                                setQuest(event.target.value)
                            }}>
                                <option value="obj" style={{ color: "black" }}>Obj</option>
                                <option value="theory" style={{ color: "black" }}>Theory</option>
                                <option value="german" style={{ color: "black" }}> German</option>
                            </select>

                            {quest === "obj" ? <input className='create-form-input' style={{ width: "150px" }} type="number" placeholder="no of options" onChange={event => {
                                let value = event.target.value;
                                if (value < 2 || value > 6) {
                                    displayError("number must be between 2 and 6..")
                                    event.target.value = value < 2 ? 2 : 6;
                                    setObj(event.target.value)
                                } else {
                                    setObj(event.target.value)
                                }
                            }}></input> : ""}

                            <input className="create-form-input" style={{ width: "100px" }} type="number" min="0" placeholder='mark' id="mark"></input>
                        </div>

                        <form id="questions-form" style={{ height: "fit-content" }}>
                            <textarea className='create-form-input' name="question" style={{ height: "100px", marginBottom: "20px" }} required placeholder={'enter the question here...\n' + (quest === 'german' ? "replace every gap to be filed with {dash} " : '')}></textarea>
                            {optionGenerate(quest)}

                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <button className='exam-create-but shadow-5 grow'>add question</button>
                            </div>

                        </form>
                    </div>
                )
            case "view":
                return (
                    <div>
                        {questionList(props.questions)}
                    </div>
                )
        }
    }
    function handleQuestionCreate(event) {
        props.load();
        event.preventDefault();
        let formData = new FormData(event.target);
        let mark = document.getElementById("mark");
        let data, dest = {};
        if (quest === "obj") {
            let options = []
            for (let i = 0; i < objnum; i++) {
                options.push(formData.get(`option${i + 1}`))
            }
            options = [formData.get(`option${formData.get("correct")}`), ...options]
            data = {
                question: formData.get("question"),
                option: options.join("--"),
                mode: quest === "obj" ? 'o' : quest === "theory" ? 't' : 'g',
                mark: mark.value === '' ? 1 : mark.value
            }
        } else {
            data = {
                question: formData.get("question"),
                option: formData.get("option"),
                mode: quest === "obj" ? 'o' : quest === "theory" ? 't' : 'g',
                mark: mark.value === '' ? 1 : mark.value
            }
        }

        console.log(data)
        apiFetch("POST", `question/${props.token}/${props.id}`, data, dest)
            .then(
                () => {
                    props.load();
                    if (dest.status === 200) {
                        displayError("Question added successfully");
                        props.reload();

                        for (let i of document.getElementsByClassName("create-form-input")) i.value = null;
                    } else if (dest.status === 300) {
                        displayError("Questions required are already complete")
                    } else {
                        displayError("could not create exam")
                    }
                }
            )
    }

    useEffect(() => {
        try {
            let form = document.getElementById("questions-form");
            form.addEventListener("submit", handleQuestionCreate)
        } catch {

        }
    }, [page])

    function optionGenerate(quest) {
        switch (quest) {
            case "obj":
                let comp = [];
                for (let i = 0; i < objnum; i++) {
                    comp.push(
                        <input type="text" className="create-form-input" placeholder={`option ${i + 1}`} required name={`option${i + 1}`}></input>
                    )
                }
                comp.push(<input type="number" style={{ marginTop: "20px" }} className='create-form-input' placeholder='correct option number..' required name="correct"></input>)
                return comp;
            case "german":
                return (
                    <textarea type="text" className="create-form-input" placeholder='enter the answer for each gap with a newline.' style={{ height: "100px" }} required name="option"></textarea>
                )
            default:
                return (
                    <textarea type="text" className="create-form-input" placeholder='enter the answer of the question' style={{ height: "100px" }} required name="option"></textarea>
                )

        }
    }
    return (
        <div className='exam-create-div'>
            <div className='exam-view-actions' style={{ height: 'fit-content' }}>
                <div className={'exam-view-group grow' + (page === "create" ? ' bottom-border' : '')} onClick={() => { setPage("create") }}>
                    <h4 style={{ display: "flex", margin: "5px" }}> create </h4>
                </div>
                <div className={'exam-view-group grow' + (page === "view" ? ' bottom-border' : '')} onClick={() => { setPage("view") }}>
                    <h4 style={{ display: "flex", margin: "5px" }}> view </h4>
                </div>

            </div>
            <div style={{ display: "flex", position: "sticky" }}>
                <h2 className='back-button grow' onClick={
                    () => {
                        document.getElementsByClassName("exam-action-page")[0].style.display = "none";
                    }
                }>&#8630; </h2>
                <h2 id="create-header" style={{ margin: "5px" }}>{page === "create" ? "Set" : "View"} the exam questions..</h2>
            </div>
            {generatePage(page)}

        </div>
    )
}


function ExamDetail(props) {
    let [page, setPage] = useState("question");

    let [examData, setExam] = useState(
        {
            loading: true,
            data: {
                exam: {
                    exam: {

                    }
                },

                questions: {
                    questions: []
                }
            }
        }
    )


    function getData() {
        props.load()
        let destination1 = {}, destination2 = {};
        Promise.all([apiFetch("GET", `exam/${props.token}/${props.exam_id}`, {}, destination1),
        apiFetch("GET", `question/${props.token}/${props.exam_id}`, {}, destination2)])
            .then(
                () => {
                    props.load();
                    if (destination1.status === 200 && destination2.status === 200) {
                        console.log('yeah')
                        setExam({ ...examData, loading: true, data: { exam: destination1.data, questions: destination2.data } })
                    }
                }
            )

    }

    useEffect(() => {
        getData();
    }, [])

    function calcPercentage(number, total) {
        try {
            if (total !== null) {
                let ratio = number / total;
                return [Math.round(ratio * 100), Math.round(ratio * 360)]
            } else {
                if (number === 0) return [0, 0]
                else return [100, 360]
            }
        } catch {
            return [null, null]
        }
    }

    function selectPage(page) {

        {
            switch (page) {
                case "question":
                    return <QuestionEdit load={props.load} token={props.token} id={props.exam_id} reload={getData}
                        questions={examData.data.questions.questions} />
                case "delete":
                    return (
                        <div style={{
                            height: "100%",
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <h3 style={{ margin: "5px" }}> are you sure you want to delete </h3>
                            <h3 style={{ margin: "5px" }}>"{examData.data.exam.exam.name}"</h3>
                            <div style={{
                                width: "100%",
                                padding: "0px 10px",
                                display: "flex",
                                justifyContent: "center"
                            }}>
                                <button className='exam-create-but shadow-5 grow' onClick={() => {
                                    let dest = {};
                                    props.load();
                                    apiFetch("DELETE", `exam/${props.token}/${props.exam_id}`, {}, dest)
                                        .then(
                                            () => {
                                                if (dest.status === 200) {
                                                    props.load();
                                                    window.location.reload();
                                                }
                                            }
                                        )
                                }}>Yes</button>
                                <button className='exam-create-but shadow-5 grow' onClick={() => {
                                    setPage("question")
                                }}>No</button>

                            </div>

                        </div>
                    )
                case "edit":
                    return (
                        <ExamEdit exam={examData.data.exam.exam} load={props.load} reload={getData} token={props.token} id={props.exam_id} />
                    )

                case "logs":
                    return (
                        <ExamLogs exam={examData.data.exam.exam} token={props.token} load={props.load} />
                    )

            }
        }
    }
    return examData.loading === true ? (
        <div className='exam-main'>

            <div className='exam-action'>
                <div className='section-header'>
                    <h2 style={{ margin: "0px" }}></h2>
                </div>
                <div className='exam-details shadow-5'>
                    <h2 style={{ margin: "0px" }}><span><img style={{
                        margin: "0px 10px 0px 10px"
                    }} onClick={() => {
                        props.view({
                            exam: false,
                            id: null
                        })
                    }} src={back} height="30" width="30"></img></span>{examData.data.exam.exam.name} </h2>

                    <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>

                        <div style={{
                            margin: "5px",
                            width: "60px",
                            height: "60px",
                            borderRadius: "30px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundImage: `conic-gradient(cornsilk 0deg, cornsilk ${calcPercentage(examData.data.questions.questions.length, examData.data.exam.exam.number)[1]}deg, rgba(137, 199, 255 ,0.4) ${calcPercentage(examData.data.questions.questions.length, examData.data.exam.exam.number)[1]}deg)`
                        }}>
                            <div style={{
                                width: "50px",
                                height: "50px",
                                borderRadius: "30px",
                                backgroundColor: "rgb(6, 72, 133)",
                                textAlign: "center",
                                paddingTop: "15px"
                            }}>
                                {calcPercentage(examData.data.questions.questions.length, examData.data.exam.exam.number)[0]}%

                            </div>



                        </div>
                        {
                            calcPercentage(examData.data.questions.questions.length, examData.data.exam.exam.number)[0] === 100 ?
                                <div>
                                    <h4 style={{ margin: "0px" }}>Questions complete..</h4>
                                    <h5 style={{ margin: "4px 0px" }}>exam link <a href={`https:www.${home_url}.com/#/hall/${examData.data.exam.exam["exam code"]}`}>{`https:www.${home_url}.com/#/hall/${examData.data.exam.exam["exam code"]}`}</a></h5>
                                </div> :
                                <h4 style={{ margin: "0px" }}>complete.... Set questions to get exam ready</h4>
                        }
                    </div>

                </div>

                <div className='exam-action-group'>
                    <button className={`exam-action-butt grow`}
                        onClick={() => {
                            setPage("question")
                            document.getElementsByClassName("exam-action-page")[0].style.display = "flex";
                        }}>
                        <div>
                            <h3 className={`${page === "question" ? "active" : ""}`} style={{ margin: "0px", textAlign: "start" }}> Questions</h3>
                            <h5 style={{ margin: "0px", marginTop: "10px" }}> set and edit exam questions </h5>
                        </div>

                    </button>
                    <button className={`exam-action-butt grow`}
                        onClick={() => {
                            setPage("edit")
                            document.getElementsByClassName("exam-action-page")[0].style.display = "flex";
                        }}>
                        <div>
                            <h3 className={`${page === "edit" ? "active" : ""}`} style={{ margin: "0px", textAlign: "start" }}> Edit</h3>
                            <h5 style={{ margin: "0px", marginTop: "10px" }}> edit the exam configurations  </h5>
                        </div>

                    </button>
                    <button className={`exam-action-butt grow`}
                        onClick={() => {
                            setPage("logs")
                            document.getElementsByClassName("exam-action-page")[0].style.display = "flex";
                        }}>
                        <div>
                            <h3 className={`${page === "logs" ? "active" : ""}`} style={{ margin: "0px", textAlign: "start" }}>Logs</h3>
                            <h5 style={{ margin: "0px", marginTop: "10px" }}> view exam status as the exam is ongoing </h5>
                        </div>

                    </button>
                    <button className={`exam-action-butt grow`}
                        onClick={() => {
                            setPage("delete")
                            document.getElementsByClassName("exam-action-page")[0].style.display = "flex";
                        }}>
                        <div>
                            <h3 className={`${page === "create" ? "active" : ""}`} style={{ margin: "0px", textAlign: "start", color: "red" }}> Delete </h3>
                            <h5 style={{ margin: "0px", marginTop: "10px", color: "red" }}> delete exam.. </h5>
                        </div>

                    </button>
                </div>
            </div>
            <div className='exam-action-page'>
                {selectPage(page)}
            </div>

        </div>
    ) : <div>loading....</div>
}

function ViewPage(props) {
    let [sorted, setSort] = useState([[], [], []]);
    let [page, setPage] = useState("all");

    function buttonFunc(id) {
        props.view({
            exam: true,
            id: id
        })
    }

    let generateExamList = (page) => {
        let content = [];
        switch (page) {
            case "all":
                for (let i of props.data.data.exams) {
                    content.push(<button className='exam-list-button grow shadow-5' onClick={() => { buttonFunc(i.id) }}>
                        <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                            <h4 style={{ margin: "0px" }}>{i.name}</h4> <h4 style={{ margin: "0px" }}>{new Date(i.date_stamp).toLocaleDateString()}</h4>
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
                            <h4 style={{ margin: "0px" }}>{i.name}</h4> <h4 style={{ margin: "0px" }}>{new Date(i.date_stamp).toLocaleDateString()}</h4>
                        </div>
                        <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
                            <h4 style={{ margin: "10px", color: "rgba(255, 248, 220, 0.474)" }}>Status : {i.status}</h4>
                        </div>
                    </button>)
                }
                break;
            case "ongo":
                for (let i of sorted[1]) {
                    content.push(<button className='exam-list-button grow shadow-5' onClick={() => { buttonFunc(i.id) }}>
                        <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                            <h4 style={{ margin: "0px" }}>{i.name}</h4> <h4 style={{ margin: "0px" }}>{new Date(i.date_stamp).toLocaleDateString()}</h4>
                        </div>
                        <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
                            <h4 style={{ margin: "10px", color: "rgba(255, 248, 220, 0.474)" }}>Status : {i.status}</h4>
                        </div>
                    </button>)
                }
                break;
            case "com":
                for (let i of sorted[2]) {
                    content.push(<button className='exam-list-button grow shadow-5' onClick={() => { buttonFunc(i.id) }}>
                        <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                            <h4 style={{ margin: "0px" }}>{i.name}</h4> <h4 style={{ margin: "0px" }}>{new Date(i.date_stamp).toLocaleDateString()}</h4>
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

    useEffect(() => {

        if (!props.loading) {
            let start = [], ongoing = [], complete = [];

            for (let i of props.data.data.exams) {
                if ((i.status === "created") || (i.status === "starting")) start.push(i);
                else if (i.status === "during") ongoing.push(i);
                else complete.push(i);
            }
            setSort([start, ongoing, complete]);
        }

    }, [props])
    return (
        <div className='exam-view'>
            <div className='exam-view-actions'>
                <div className={'exam-view-group grow' + (page === "all" ? ' bottom-border' : '')} onClick={() => { setPage("all") }}>
                    <h4 style={{ display: "flex" }}>all <div className='exam-num'>{props.num}</div></h4>
                </div>
                <div className={'exam-view-group grow' + (page === "start" ? ' bottom-border' : '')} onClick={() => { setPage("start") }}>
                    <h4 style={{ display: "flex" }}>yet-to-start <div className='exam-num'>{sorted[0].length}</div></h4>
                </div>
                <div className={'exam-view-group grow' + (page === "ongo" ? ' bottom-border' : '')} onClick={() => { setPage("ongo") }}>
                    <h4 style={{ display: "flex" }}>ongoing <div className='exam-num'>{sorted[1].length}</div></h4>
                </div>
                <div className={'exam-view-group grow' + (page === "com" ? ' bottom-border' : '')} onClick={() => { setPage("com") }}>
                    <h4 style={{ display: "flex" }}>completed <div className='exam-num'>{sorted[2].length}</div></h4>
                </div>

            </div>
            {generateExamList(page)}
        </div>
    )

}

function CreateExam(props) {

    function disableValue(e, value) {
        let valued = e.target.checked;

        if (value === "veri") {
            value = "spec";
            valued = valued && document.getElementById("spec-check").checked;
        }

        let header = document.getElementById(`${value}-header`);
        let input = document.getElementById(`${value}`);

        if (value === "start") {
            let input2 = document.getElementById("start-time");
            valued ? input2.removeAttribute("disabled") : input2.setAttribute("disabled", "disabled");
            input2.style.border = valued ? "cornsilk 3px solid" : "rgba(255, 248, 220, 0.474) 3px solid";

            if (!valued) input2.value = null;
        }

        header.style.color = valued ? "cornsilk" : "rgba(255, 248, 220, 0.474)";
        valued ? input.removeAttribute("disabled") : input.setAttribute("disabled", "disabled");
        input.style.border = valued ? "cornsilk 3px solid" : "rgba(255, 248, 220, 0.474) 3px solid";

        if (!valued) {
            input.value = null
        }

    }

    useEffect(() => {
        let handleExamCreate = e => {
            e.preventDefault();
            let formData = new FormData(e.target);

            function displayError(message) {
                let header = document.getElementById('create-header'), container = document.getElementsByClassName("exam-action-page")[0];
                header.innerHTML = message;
                container.scrollTop = 0;
                setTimeout(() => {
                    header.innerHTML = "Fill form to create exam.."
                }, 1500);
            }

            if (formData.get("name").length < 6 || formData.get("name").length > 20) displayError("The exam title must be between 6 to 20 characters..")

            else if (new Date() > new Date(formData.get("start-date") + " " + formData.get("start-time"))) {
                displayError("The start time must be ahead of the current time by at least 30 minutes")
            }

            else {
                let data = {
                    name: formData.get("name"),
                    total: formData.get("total"),
                    number: formData.get("questions"),
                    num_of_students: formData.get("students"),
                    start: formData.get("start-date") === null ? null : new Date(formData.get("start-date") + " " + formData.get("start-time")).toJSON(),
                    verification: formData.get("veri-check") === "on",
                    specific: formData.get("specific") === "" ? null : formData.get("specific"),
                    personal: formData.get("personal"),
                    duration: formData.get("duration") === null ? null : formData.get("duration") * 60,
                    exam_code: Number(new Date())
                }

                var destination = {};

                props.load();
                apiFetch("POST", `exam/${props.token}/aall`, data, destination).then(
                    () => {
                        props.load();
                        if (destination.status === 200) {
                            displayError("the exam has been created...");
                            window.location.reload();
                            props.change("view")
                        } else {
                            displayError("the exam could not be created")
                        }
                    }
                )
            }
        }
        let form = document.getElementById("exam-create-form");
        form.addEventListener("submit", handleExamCreate);

        return function cleanup() {
            form.removeEventListener("submit", handleExamCreate)
        }

    }, [])

    return (
        <div className='exam-create-div'>
            <div style={{ display: "flex", position: "sticky" }}>
                <h2 className='back-button grow' style={{marginTop : "8px"}}  onClick={
                    () => {
                        document.getElementsByClassName("exam-action-page")[0].style.display = "none";
                    }
                }>&#8630; </h2>
                <h2 id="create-header">Fill form to create exam..</h2>
            </div>
            <form id="exam-create-form">
                <input className='create-form-input' style={{ border: "cornsilk 3px solid", textAlign: "center" }} type="text" name="name" placeholder="The Exam Title" required></input>
                <div style={{ display: "flex", width: "100%", justifyContent: "space-between", marginTop: "40px" }} >
                    <div>
                        <div style={{ display: "flex" }}>
                            <input type="checkbox" name="students-check" onChange={event => { disableValue(event, "students") }}></input>
                            <h4 style={{ margin: "0px", color: "rgba(255, 248, 220, 0.474)" }} id="students-header">number of students </h4>
                        </div>
                        <input className='create-form-input' type="number" min="0" max="200" name="students" id="students" disabled></input>
                    </div>

                    <div>
                        <div style={{ display: "flex" }}>
                            <input type="checkbox" name="questions-check" onChange={event => { disableValue(event, "questions") }}></input>
                            <h4 style={{ margin: "0px", color: "rgba(255, 248, 220, 0.474)" }} id="questions-header">number of questions</h4>
                        </div>
                        <input className='create-form-input' type="number" min="0" max="200" name="questions" id="questions" disabled></input>
                    </div>
                </div>
                <div style={{ display: "flex", width: "100%", justifyContent: "space-between", marginTop: "40px" }} >
                    <div>
                        <div style={{ display: "flex" }}>
                            <input type="checkbox" name="total-check" onChange={event => { disableValue(event, "total") }}></input>
                            <h4 style={{ margin: "0px", color: "rgba(255, 248, 220, 0.474)" }} id="total-header"> total marks </h4>
                        </div>
                        <input className='create-form-input' type="number" name="total" id="total" disabled></input>
                    </div>

                    <div style={{ marginLeft: "20px" }}>
                        <div style={{ display: "flex" }}>
                            <input type="checkbox" name="start-check" onChange={event => { disableValue(event, "start") }}></input>
                            <h4 style={{ margin: "0px", color: "rgba(255, 248, 220, 0.474)" }} id="start-header">start time</h4>
                        </div>
                        <div style={{ display: "flex" }}>
                            <input className='create-form-input' type="date" name="start-date" id="start" disabled></input>
                            <input className='create-form-input' type='time' name="start-time" id="start-time" disabled></input>
                        </div>
                    </div>
                </div>
                <div style={{ display: "flex", width: "100%", justifyContent: "space-between", marginTop: "40px" }} >
                    <div>
                        <div style={{ display: "flex" }}>
                            <input type="checkbox" name="duration-check" onChange={event => { disableValue(event, "duration") }}></input>
                            <h4 style={{ margin: "0px", color: "rgba(255, 248, 220, 0.474)" }} id="duration-header"> exam duration(mins)</h4>
                        </div>
                        <input className='create-form-input' type="number" name="duration" id="duration" min="5" max="300" disabled></input>
                    </div>

                    <div style={{ marginLeft: "20px" }}>
                        <div style={{ display: "flex" }}>
                            <input type="checkbox" name="personal-check" onChange={event => { disableValue(event, "personal") }}></input>
                            <h4 style={{ margin: "0px", color: "rgba(255, 248, 220, 0.474)" }} id="personal-header">student time(mins)</h4>
                        </div>
                        <div style={{ display: "flex" }}>
                            <input className='create-form-input' type="number" name="personal" id="personal" min="5" max="300" disabled></input>
                        </div>
                    </div>
                </div>

                <div style={{ display: "flex", width: "100%", justifyContent: "space-between", marginTop: "40px" }} >
                    <div>
                        <div style={{ display: "flex" }}>
                            <input type="checkbox" name="veri-check" onChange={event => { disableValue(event, "veri") }}></input>
                            <h4 style={{ margin: "0px", color: "cornsilk" }} id="total-header"> student verification </h4>
                        </div>
                    </div>

                    <div style={{ marginLeft: "20px" }}>
                        <div style={{ display: "flex" }}>
                            <input type="checkbox" name="spec-check" id="spec-check" onChange={event => { disableValue(event, "spec") }}></input>
                            <h4 style={{ margin: "0px", color: "rgba(255, 248, 220, 0.474)" }} id="spec-header">specific students</h4>
                        </div>
                        <div style={{ display: "flex" }}>
                            <textarea className='create-form-input' name="spec" id="spec"></textarea>
                        </div>
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <button type='submit' className='exam-create-but shadow-5 grow'> Create exam</button>
                </div>
            </form>
        </div>
    )

}

function Exam(props) {
    let [exam_data, setExam] = useState({
        loading: true,
        data: null
    })

    let [exam_page, setExamPage] = useState({
        exam: false,
        id: null
    })

    let [page, setPage] = useState('view');

    function fetchExamDetails() {
        var examData = {};
        props.load();
        apiFetch("GET", `exam/${props.token}/all`, {}, examData).then(
            () => {
                props.load();
                if (examData.status === 200) {
                    setExam({
                        loading: false,
                        data: examData.data
                    })
                } else {

                }
            }
        )
    }

    function selectPage(page) {
        if (!exam_data.loading) {
            switch (page) {
                case "view":
                    return <ViewPage data={exam_data} num={props.user.exam} view={setExamPage} />
                case "create":
                    return <CreateExam load={props.load} change={setPage} token={props.token} />
            }
        } else {
            return <div></div>
        }
    }
    useEffect(() => {
        fetchExamDetails();
    }, [])
    return !exam_page.exam ? (
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
                            <h3 className={`${page === "create" ? "active" : ""}`} style={{ margin: "0px", textAlign: "start" }}> Create..</h3>
                            <h5 style={{ margin: "0px", marginTop: "10px" }}> make new exams </h5>
                        </div>

                    </button>
                    <button className={`exam-action-butt grow`}
                        onClick={() => {
                            setPage("view")
                            document.getElementsByClassName("exam-action-page")[0].style.display = "flex";
                        }}>
                        <div>
                            <h3 className={`${page === "view" ? "active" : ""}`} style={{ margin: "0px", textAlign: "start" }}> View..</h3>
                            <h5 style={{ margin: "0px", marginTop: "10px" }}> list of exams with exam actions </h5>
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
    ) : (
        <ExamDetail token={props.token} exam_id={exam_page.id} load={props.load} view={setExamPage} />
    )

}

export default Exam;