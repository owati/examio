import { useEffect } from 'react';
import { error_create_form, API_URL, fill_up } from '../../functions/functions';
import '../../css/dashboard.css'


function Examcreate(props) {
    var handleSubmit = (event) => {
        let data = {}
        event.preventDefault()

        let form_info = new FormData(event.target);
        for (let [i, j] of form_info.entries()) {
            data[i] = j
        }
        try {
            data.start = new Date(data.start_date + 'T' + data.start_time)
            data.duration = data.duration * (data.units === 'sec' ? 1 :
                data.units === 'min' ? 60 : 3600)
            data.exam_code = `${props.token}${Number(data.start)}`
        } catch (err) {
            console.log(err)
        }
        data = fill_up(data)
        let feed_back = error_create_form(data);

        if (feed_back.error !== 'good to go') {
            props.alert(feed_back.error);
        } else {
            props.load()
            send_data(data)
        }

    }
    async function send_data(data) {
        try {

            let response = await fetch(API_URL + `exam/${props.token}`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-type': 'application/json;charset-UTF-8',
                }
            })
            let res = await response.json()

            if (res.status === 'exam created') {
                props.load()
                console.log('pww')
            } else {
                console.log('pol no')
            }
        } catch (err) {
            ////////////////////
        }
    }
    function input_disp(val, type) {
        let input = document.getElementById(`${type}-in`);
        let info = document.getElementById(`no${type}-info`);
        if (val === 'yes') {
            input.style.display = 'flex';
            info.style.display = 'none';
            if (type === 'stud') document.getElementById('spec-div').style.display = 'flex';

        } else if (val === 'no') {
            input.style.display = 'none';
            info.style.display = 'block';
            if (type === 'stud') document.getElementById('spec-div').style.display = 'none';
        }
    }

    function select_input(e) {
        let value = e.target.value;
        let file = document.getElementById('file-in');
        let input = document.getElementById('type-in');
        if (value === 'inp') {
            file.style.display = 'none';
            input.style.display = 'block';
        } else {
            file.style.display = 'block';
            input.style.display = 'none';
        }
    }


    useEffect(() => {
        let form = document.getElementById('exam-create');
        form.addEventListener('submit', handleSubmit)

        return function cleanup() {
            form.removeEventListener('submit', handleSubmit);
        }

    }, [props])


    return (
        <form id="exam-create">


            <div className="create-form">
                <div className="header-form"> <h1>Initialize the exam..</h1></div>
                <div className="form-section" data-aos="fade-left">
                    <div className="form-pick">
                        <label>Indicate number of examinees </label>
                        <div className="mobile-radio">
                            <input type="radio" name="students" value="yes" onClick={() => { input_disp('yes', 'stud') }}></input>
                            <label>yes</label>
                            <input type="radio" name="students" value="no" onClick={() => { input_disp('no', 'stud') }}></input>
                            <label>no</label>
                        </div>
                    </div>
                    <div id="stud-in">

                        <input type="number" name="num_of_students" defaultValue="0" min="0" className="num-input" ></input>
                    </div>
                    <div id="nostud-info">
                        <p className="info-para">this means that the any number of students can take the test. in the mode, you cant allow specific students</p>
                    </div>
                </div>

                <div className="form-section" data-aos="fade-left">
                    <div className="form-pick">
                        <label>Indicate number of questions </label>
                        <div className="mobile-radio">
                            <input type="radio" name="questions" value="yes" onClick={() => { input_disp('yes', 'ques') }}></input>
                            <label>yes</label>
                            <input type="radio" name="questions" value="no" onClick={() => { input_disp('no', 'ques') }}></input>
                            <label>no</label>
                        </div>
                    </div>
                    <div id="ques-in">

                        <input type="number" name="number" defaultValue="0" min="0" className="num-input" ></input>
                    </div>
                    <div id="noques-info">
                        <p className="info-para">this means that the any number of students can take the test. in the mode, you cant allow specific students</p>
                    </div>
                </div>

                <div className="form-section" data-aos="fade-right">
                    <div className="form-pick">
                        <label> Indictae the total marks </label>
                        <div className="mobile-radio">
                            <input type="radio" name="marks" value="yes" onClick={() => { input_disp('yes', 'mark') }}></input>
                            <label>yes</label>
                            <input type="radio" name="marks" value="no" onClick={() => { input_disp('no', 'mark') }}></input>
                            <label>no</label>
                        </div>
                    </div>
                    <div id="mark-in">
                        <label>enter the total marks </label>
                        <input type="number" name="total" defaultValue="0" min="0" className="num-input" ></input>
                    </div>
                    <div id="nomark-info">
                        <p className="info-para">without a provided total marks, the exam mark will be calcutaed over 100%</p>
                    </div>
                </div>

                <div className="form-section" data-aos="fade-left">
                    <div className="form-pick">
                        <label>Indicate a start time </label>
                        <div className="mobile-radio">
                            <input type="radio" name="time" value="yes" onClick={() => { input_disp('yes', 'time') }}></input>
                            <label>yes</label>
                            <input type="radio" name="time" value="no" onClick={() => { input_disp('no', 'time') }}></input>
                            <label>no</label>
                        </div>
                    </div>
                    <div id="time-in">
                        <input type="date" name="start_date" className="time-input"></input>
                        <input type="time" name="start_time" className="time-input"></input>
                    </div>
                    <div id="notime-info">
                        <p className="info-para">this means that the any number of students can take the test. in the mode, you cant allow specific students</p>
                    </div>
                </div>


                <div className="form-section">

                    <div className="form-pick">
                        <label>indicate the duration </label>
                        <div className="mobile-radio">
                            <input type="radio" name="dura" value="yes" onClick={() => { input_disp('yes', 'dura') }}></input>
                            <label>yes</label>
                            <input type="radio" name="dura" value="no" onClick={() => { input_disp('no', 'dura') }}></input>
                            <label>no</label>
                        </div>
                    </div>
                    <div id="dura-in">


                        <input type="number" name="duration" className="num-input"></input>
                        <select name="units" className="num-input">
                            <option value="sec">sec</option>
                            <option value="min">min</option>
                            <option value="hours">hrs</option>
                        </select>
                    </div>
                    <div id="nodura-info">
                        <p className="info-para" className="danger">this means the exam will have to be ended manually by the you. This is not recommended..</p>
                    </div>
                </div>


                <div className="form-section" >
                    <div className="form-pick">
                        <label> should verification be reqiured </label>
                        <div className="mobile-radio">
                            <input type="radio" name="veri" value="yes" onClick={() => { input_disp('yes', 'veri') }}></input>
                            <label>yes</label>
                            <input type="radio" name="veri" value="no" onClick={() => { input_disp('no', 'veri') }}></input>
                            <label>no</label>
                        </div>
                    </div>
                    <div id="veri-in">
                        <p className="info-para"> only examinees that have account on exam can register </p>
                    </div>
                    <div id="noveri-info" className="danger">
                        <p className="info-para">this means the exam will have to be ended manually by the you. This is not recommended..</p>
                    </div>
                </div>

                <div className="form-section" id="spec-div">
                    <div className="form-pick">
                        <label> should specific people write this exam </label>
                        <div className="mobile-radio">
                            <input type="radio" name="spec" value="yes" onClick={() => { input_disp('yes', 'spec') }}></input>
                            <label>yes</label>
                            <input type="radio" name="spec" value="no" onClick={() => { input_disp('no', 'spec') }}></input>
                            <label>no</label>
                        </div>
                    </div>
                    <div id="spec-in">
                        <select name="how" onChange={select_input}>
                            <option value="file">by file</option>
                            <option value="inp">by input</option>
                        </select>

                        <div id="file-in">
                            <input type="file" name="specific"></input>
                        </div>
                        <div id="type-in">
                            <textarea id="specific" name="specific"></textarea>
                        </div>
                    </div>
                    <div id="nospec-info">
                        <p className="info-para">this means the exam will have to be ended manually by the you. This is not recommended..</p>
                    </div>
                </div>

                <div className="form-but"><button style={{
                    width: '200px',
                    height: '100%',
                    padding: '4px'
                }} type="submit" className="log-btn grow shadow-5"> create exam </button></div>


            </div>



        </form>
    )

}

export default Examcreate;