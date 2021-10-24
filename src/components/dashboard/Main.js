import '../../css/dashboard.css';
import Examcreate from './Examcreate';


function Main(props) {
    let exam_create = <Examcreate alert={props.alert} 
    load={props.load} token={props.token}/>
    return (
        <div className="main-body">
            {exam_create}

        </div>
    )

}

export default Main;