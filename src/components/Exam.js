import { useState, useEffect } from 'react';
import { apiFetch } from '../functions/function';

function ViewPage(props) {
    let [sorted, setSort] = useState([[], [], []]);
    let [page, setPage] = useState("all");

    let generateExamList = (page) => {
        let content = [];
        switch (page) {
            case "all":
                for (let i of props.data.data.exams) {
                    content.push(<button className='exam-list-button grow shadow-5'>
                       <div style={{width : "100%", display : "flex", justifyContent: "space-between"}}>
                            <h4 style={{margin : "0px"}}>{i.name}</h4> <h4 style={{margin: "0px"}}>{new Date(i.date_stamp).toLocaleDateString()}</h4> 
                                </div>
                        <div style={{width : "100%", display: "flex", justifyContent: "flex-end"}}>
                            <h4 style={{margin : "10px", color: "rgba(255, 248, 220, 0.474)"}}>Status : {i.status}</h4>
                        </div>
                    </button>)
                }
                break;
            case "start":
                for (let i of sorted[0]) {
                    content.push(<button className='exam-list-button grow shadow-5'>
                    <div style={{width : "100%", display : "flex", justifyContent: "space-between"}}>
                         <h4 style={{margin : "0px"}}>{i.name}</h4> <h4 style={{margin: "0px"}}>{new Date(i.date_stamp).toLocaleDateString()}</h4> 
                             </div>
                     <div style={{width : "100%", display: "flex", justifyContent: "flex-end"}}>
                         <h4 style={{margin : "10px", color: "rgba(255, 248, 220, 0.474)"}}>Status : {i.status}</h4>
                     </div>
                 </button>)
                }
                break;
            case "ongo":
                for (let i of sorted[1]) {
                    content.push(<button className='exam-list-button grow shadow-5'>
                    <div style={{width : "100%", display : "flex", justifyContent: "space-between"}}>
                         <h4 style={{margin : "0px"}}>{i.name}</h4> <h4 style={{margin: "0px"}}>{new Date(i.date_stamp).toLocaleDateString()}</h4> 
                             </div>
                     <div style={{width : "100%", display: "flex", justifyContent: "flex-end"}}>
                         <h4 style={{margin : "10px", color: "rgba(255, 248, 220, 0.474)"}}>Status : {i.status}</h4>
                     </div>
                 </button>)
                }
                break;
            case "com":
                for (let i of sorted[2]) {
                    content.push(<button className='exam-list-button grow shadow-5'>
                    <div style={{width : "100%", display : "flex", justifyContent: "space-between"}}>
                         <h4 style={{margin : "0px"}}>{i.name}</h4> <h4 style={{margin: "0px"}}>{new Date(i.date_stamp).toLocaleDateString()}</h4> 
                             </div>
                     <div style={{width : "100%", display: "flex", justifyContent: "flex-end"}}>
                         <h4 style={{margin : "10px", color: "rgba(255, 248, 220, 0.474)"}}>Status : {i.status}</h4>
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
    return (
        <div className='exam-create-div'>
            <form id="exam-create-form">
                <div>
                    <div>
                        <input type="checkbox" name="students-check"></input>
                        
                    </div>
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

    let [page, setPage] = useState('view');

    function fetchExamDetails() {
        var examData = {};
        props.load();
        apiFetch("GET", `exam/${props.token}`, {}, examData).then(
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
                    return <ViewPage data={exam_data} num={props.user.exam} />
                case "create":
                    return <CreateExam token={props.token}/>
            }
        } else {
            return <div></div>
        }
    }
    useEffect(() => {
        fetchExamDetails();
    }, [])
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
                        }}>
                        <div>
                            <h3 className={`${page === "create" ? "active" : ""}`} style={{ margin: "0px", textAlign: "start" }}> Create..</h3>
                            <h5 style={{ margin: "0px", marginTop: "10px" }}> make new exams </h5>
                        </div>

                    </button>
                    <button className={`exam-action-butt grow`}
                        onClick={() => {
                            setPage("view")
                        }}>
                        <div>
                            <h3 className={`${page === "view" ? "active" : ""}`} style={{ margin: "0px", textAlign: "start" }}> View..</h3>
                            <h5 style={{ margin: "0px", marginTop: "10px" }}> list of exams with exam actions </h5>
                        </div>

                    </button>
                    <button className={`exam-action-butt grow`}
                        onClick={() => {
                            setPage("create")
                        }}>
                        <div>
                            <h3 className={`${page === "create" ? "active" : ""}`} style={{ margin: "0px", textAlign: "start" }}> Create exam</h3>
                            <h5 style={{ margin: "0px", marginTop: "10px" }}> make new exams </h5>
                        </div>

                    </button>
                    <button className={`exam-action-butt grow`}
                        onClick={() => {
                            setPage("create")
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

export default Exam;