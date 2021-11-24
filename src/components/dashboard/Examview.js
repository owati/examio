import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../../css/dashboard.css';
import { API_URL } from '../../functions/functions';

function Examview(props) {
    const history = useHistory();
    let [exams, setExams] = useState([]);

    function sortView() {
        let [dated, undated] = [[], []]
        for(let i of exams) {
            if(i.start === null) {
                dated.push(<h2>i.exzm_code</h2>)
            } else {
                //undated.push(<h1>i.exam</h1>)
                
            }

        }
    }

    async function getExams() {
        try{
            let response = await fetch(API_URL + `exam/${props.token}`);
            let data = await response.json();
            console.log(data)
            if (data.error !== null) {
                history.push('/')
            } else {
                setExams(data.exams);

            }
            props.load();
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        props.load();
        getExams();
    }, [])
    return(exams.length !== 0 ? 
        <div className="info-div">
            <div><h4>Un-dated exams</h4></div>
            <div><h4>Dated exams</h4></div>
            
        </div> : <div className='info-div'>
            <h4> Seems like you do not have any exam created</h4>
        </div>
    )

}
export default Examview;