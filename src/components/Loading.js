
import CenterForm from "./CenterForm";
import logo from '../assets/logo.png';
import '../css/signup.css'



function Loading(props){


    return props.load ? (
        <CenterForm load={true}>
            <img className="rotate" src={logo} height="50" width="50"></img>
        </CenterForm>

    ) : ''
}

export default Loading;