import Sidenav from '../components/dashboard/Sidenav';
import '../css/dashboard.css';
import Main from '../components/dashboard/Main';
import Alert from '../components/dashboard/Alert';
import { useState } from 'react';
import { useHistory } from 'react-router';
import Loading from '../components/Loading';

function Dashnav(props){

    const history = useHistory()
    function openside(){
        let sideNav = document.getElementsByClassName('sideNav')[0];
        let but = document.getElementById('openside')
        if(sideNav.style.width === '0px'){
            sideNav.style.width = '300px'
            but.innerHTML = '&times;'
        } else {
            sideNav.style.width = '0px'
            but.innerHTML = '&#9776;'
       return }
    }
    return(
        <div className="navig">
            <div className ="dash-tit"><span id="openside" onClick={openside}>&#9776;</span> Welcome {props.name}</div>
            <button onClick= {() => {
                history.push('exam_create')
            }}>new-exam</button>
        </div>
    )
}

function Footer(){
    const history = useHistory()
    return(
        <div className="dash-footer">
            <div style={
                {
                    textAlign: 'center',
                    cursor: 'pointer',
                }
            } onClick={
                () => {
                    history.push('/')
                }
            }>
                <h4>All rights Reserved, &copy; Examio {new Date().getFullYear()}</h4>

            </div>
        </div>
    )
}

function Dashboard(props){

    let [alertMess, setAlert] = useState('this is an alert..')
    function openAlert(message) {
        setAlert(message)
        let alertDiv =  document.getElementById('alert');
        alertDiv.style.height = '50px';

        setTimeout(() => {
            alertDiv.style.height = '0px';
        }, 3000)

    }

    let loader = false;
    let [load, setLoad] = useState(false);
  
    function shouldLoad(){
      loader = !loader
      setLoad(loader)
      console.log(load)
    }


    return(
        <div className="dash-back">
            <Dashnav name={props.user[0]}/>
            <div className="body">
                <Sidenav/>
                <Main which={props.match.params.which} alert={openAlert} load={shouldLoad} token={props.user[1]}/>
            </div>
            <Alert message={alertMess}/>
            <Loading load={load}/>
            <Footer/>
        </div>
    )

}

export default Dashboard;