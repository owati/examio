import { apiFetch } from '../functions/function';
import { useEffect, useState } from 'react';
import examio from '../assets/examio2.png';
import Cookies from 'js-cookie';

function ExamNav({ submit }) {
    return (
        <div className='exam-nav'>
            <img src={examio} height="20" width="90"></img>
            <button className='hall-but shadow-5 grow' style={{ marginTop: "0px" }}
                onClick={() => {
                    submit();
                }}>
                Submit
            </button>
            <button onClick={
                () => {
                    let set_div = document.getElementById('settings-div');
                    set_div.style.height = set_div.style.height === "0px" ? "80px" : "0px"
                }
            }>
                settings
            </button>

        </div>
    )
}

function SettingsDiv({ change, settings }) {
    return <div id='settings-div'>
        <div className='sett'>
            <h4>view type : {settings.one_one ? "one one" : "scroll"} </h4>
            <button className='sett-but' onClick={() => {
                let one_one = settings.one_one;
                change({ ...settings, one_one: !one_one });
            }}>change</button>
        </div>
    </div>
}

function ExamFoot() {
    return (
        <div className='exam-foot'>
            <h3>Best of Luck  </h3>
        </div>
    )
}

function ExamTitle(props) {
    return (
        <div className='exam-title shadow-5'>
            <h2>{props.title}</h2>
            <Timer time={props.time} submit={props.submit} />
        </div>
    )
}

function Timer(props) {
    var timer;

    useEffect(
        () => {
            let duration = props.time;
            let timer_tag = document.getElementById("exam-timer");
            let split = time => {
                let hours = Math.floor(time / 3600);
                let minutes = Math.floor((time % 3600) / 60);
                let seconds = Math.floor((time % 3600) % 60)
                return [hours, minutes, seconds]
            }
            function beautify(num) {
                if (num < 10) {
                    return '0' + num;
                } else {
                    return num
                }
            }

            timer = setInterval(
                () => {
                    if (duration < 0) {
                        clearInterval(timer);
                        timer_tag.innerHTML = '00:00:00';
                        props.submit()
                    }
                    let [hour, min, sec] = split(duration)
                    timer_tag.innerHTML = `${hour === 0 ? "" : beautify(hour) + ":"}${beautify(min)}:${beautify(sec)}`

                    duration--;
                }, 1000
            )

            return function cleanup() {
                try {
                    clearInterval(timer)
                } catch {

                }
            }
        }
    )

    return (
        <h3 id='exam-timer'>00:00</h3>
    )
}

function ExamPaper(props) {
    let questions = props.question;

    let [curr, setCurr] = useState(1);
    let answers = Cookies.get("answers");


    let arrange = num => {
        if (num < 10) {
            return "00" + num
        } else if (num < 100) {
            return "0" + num
        } else {
            return `${num}`
        }
    }

    let QuestButton = ({ number }) => {
        let answered = Cookies.get("answers")
            .split('----')
            .filter(
                x => x.slice(0, 3)
            ) === [];

        let current = number === curr

        return <button className={'quest-but grow' + current ? "current" : answered ? "answered" : ""} onClick={() => {
            setCurr(number)
        }}>
            {number}
        </button>
    }

    function updateAnswer(e, quest) {
        console.log("change")
        let ans = e.target;
        let number = arrange(Number(ans.name.split('-')[1]));
        let check = [false, null];
        let answer = Cookies.get("answers").split("----")
        console.log(ans.checked)


        for (let i of answer) {
            if (i.slice(0, 3) === number) {
                check = [true, answer.indexOf(i)];
            }
        }
        if (!check[0]) {
            answer.push(number + ans.value)
        } else {
            answer[check[1]] = number + ans.value
        }


        Cookies.set("answers", answer.join('----'))
    }

    function Question(props) {
        let [option, setOption] = useState("")
        let question = props.question

        useEffect(
            () => {
                let answer = answers.split('----').filter(x => x.slice(0, 3) === arrange(question.number))[0]
                if (answer !== undefined) {
                    setOption(answer.slice(3))
                }

            }, []
        )

        try {

            let display = quest => {
                let what = <h2>
                    {quest.number}. {quest.question}
                </h2>

                if (quest.mode === 'o') {
                    let comp = [];

                    function change(num) {
                        return ["a", "b", "c", "d", "e", "f"][num]
                    }
                    for (let i of quest.options) {
                        let check = i === option
                        comp.push(
                            check ?
                                <div className='exam-option'>
                                    <input className="exam-choice" type="radio" name={'question-' + quest.number} checked value={i} onChange={event => { updateAnswer(event); setOption(i) }}></input>
                                    <h3> {change(quest.options.indexOf(i))}. {i}</h3>
                                </div> :
                                <div className='exam-option'>
                                    <input className="exam-choice" type="radio" name={'question-' + quest.number} value={i} onChange={event => { updateAnswer(event); setOption(i) }}></input>
                                    <h3> {change(quest.options.indexOf(i))}. {i}</h3>
                                </div>
                        )
                    }
                    return [what, comp]
                } else {
                    return [what,
                        <textarea name={'question-' + quest.number} className='exam-answer' value={option === "" ? "" : option} onChange={event => { updateAnswer(event) }}></textarea>
                    ]
                }
            }

            return (
                <div className='exam-div'>
                    {display(question)}
                </div>
            )
        } catch {
            return <div></div>
        }
    }

    function generate(questions) {
        if (!props.one_one) {  // handles the scroll down view..
            let comp = []
            for (let i of questions) comp.push(<Question question={i} />)
            return comp
        } else {
            return (
                <div>
                    <Question question={questions[curr - 1]} />
                    <div className='quest-change-div'>
                        <button className='hall-but no-top grow' onClick={
                            () => {
                                let num = curr - 1;

                                if (!(num < 1)) {
                                    setCurr(num);
                                }
                            }
                        }>Prev</button>
                        <div className='quest-change-butt-div'>
                            {
                                questions.map(x => <QuestButton number={x.number} />)
                            }
                        </div>
                        <button className='hall-but no-top grow' onClick={
                            () => {
                                let num = curr + 1;
                                if (!(num > questions.length)) {
                                    setCurr(num);
                                }
                            }
                        }>Next</button>
                    </div>
                </div>
            )
        }
    }


    return (
        <div className='exam-paper shadow-5'>
            {generate(questions)}
        </div>
    )
}

function QuestionPaper(props) {
    let [settings, setSettings] = useState({
        one_one: false
    })
    var exam = props.exam;
    console.log(exam)

    function submitExam() {
        props.load();
        let dest = {};
        apiFetch("PUT", `hall/${props.token}/${props.code}`, {
            answers: Cookies.get("answers")
        }, dest)
            .then(
                () => {
                    props.load()
                    if (dest.status === 200) {
                        let code = window.location.hash.slice(-1)[0];
                        Cookies.set("current-exam",["end",code].join("----"));
                        window.location.reload();
                    }
                }
            )
    }

    useEffect(
        () => {
            if (Cookies.get("answers") === undefined) {
                Cookies.set("answers", "")
                window.location.reload()
            }
        }, []
    )
    try {
        return (
            <div className="exam-page">
                <ExamNav submit={submitExam} />
                <SettingsDiv change={setSettings} settings={settings} />
                <div className='exam-body'>
                    <ExamTitle title={exam.details.name} time={exam.details.duration} submit={submitExam} />
                    <ExamPaper question={exam.questions} one_one={settings.one_one} />
                </div>
                <ExamFoot />
            </div>
        )
    } catch {
        return <div></div>
    }

}

export default QuestionPaper;