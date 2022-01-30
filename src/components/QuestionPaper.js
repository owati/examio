import { getByDisplayValue } from '@testing-library/react';
import { useEffect, useState } from 'react';
import examio from '../assets/examio2.png';

function ExamNav() {
    return (
        <div className='exam-nav'>
            <img src={examio} height="20" width="90"></img>
            <button className='hall-but shadow-5 grow' style={{ marginTop: "0px" }}>
                Submit
            </button>
            <button>
                settings
            </button>
        </div>
    )
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
            <Timer time={props.time} />
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
                        // some other function
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

    function Question(props) {
        let question = props.question

        let display = quest => {
            let what = <h2>
                {quest.number}. {quest.question}
            </h2>
            if (quest.mode === 'o') {
                let comp = [];

                function change(num) {
                    return ["a", "b", "c", "d", "e", "f"][num]
                }
                for(let i of quest.options) {
                    comp.push(
                        <div className='exam-option'>
                        <input className="exam-choice"  type="radio" name={'question-' + quest.number} value={i}></input>
                        <h3> {change(quest.options.indexOf(i))}. {i}</h3>
                        </div>
                    )
                }
                return [what, comp]
            } else {
                return [what,
                    <textarea name={'question-' + quest.number} className='exam-answer'></textarea>
                ]
            }
        }
        return (
            <div className='exam-div'>
                {display(question)}
            </div>
        )
    }

    function generate(questions) {
        let comp  = []
        for(let i of questions) comp.push(<Question question={i}/>)
        return comp
    }
    return (
        <div className='exam-paper shadow-5'>
            {generate(questions)}
        </div>
    )
}

function QuestionPaper(props) {
    var exam = props.exam
    return (
        <div className="exam-page">
            <ExamNav />
            <div className='exam-body'>
                <ExamTitle title={exam.details.name} time={exam.details.duration} />
                <ExamPaper question={exam.questions} />
            </div>
            <ExamFoot />
        </div>
    )

}

export default QuestionPaper;