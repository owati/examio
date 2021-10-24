import Sidenav from '../components/dashboard/Sidenav';
import '../css/dashboard.css';
import Main from '../components/dashboard/Main';
import Alert from '../components/dashboard/Alert';
import { useState } from 'react';
import Loading from '../components/Loading';

function Dash_nav(props){


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
            <Dash_nav name={props.user[0]}/>
            <div className="body">
                <Sidenav/>
                <Main alert={openAlert} load={shouldLoad} token={props.user[1]}/>
            </div>
            <Alert message={alertMess}/>
            <Loading load={load}/>
        </div>
    )

}

export default Dashboard;