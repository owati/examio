import '../../css/dashboard.css';
import Examcreate from './Examcreate';
import Account from './Account';
import Examview from './Examview';


function Main(props) {

    let urls = {
        user: <Account alert={props.alert} load={props.load} token={props.token}/>,
        exam_create: <Examcreate alert={props.alert} load={props.load} token={props.token}/>,
        exam_view: <Examview alert={props.alert} load={props.load} token={props.token}/>
    }
    return (
        <div className="main-body">
            {urls[props.which]}
        </div>
    )

}

export default Main;