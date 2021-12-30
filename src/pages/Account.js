import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { apiFetch } from '../functions/function';
import Exam from '../components/Exam';
import examio from '../assets/examio2.png';
import profile from '../assets/profile.png';
import Loading from "../components/Loading";
import '../css/account.css';

function Sidebar(props) {
    let [butt, setButt] = useState('Dashboard');
    let [buttons, setButtons] = useState([]);

    let butList = [
        "Dashboard",
        "Exams",
        "Settings",
        "Profile"
    ];

    let butCompList = [];

    useEffect(() => {
        for (let i of butList) {
            if (i === butt) {

                butCompList.push(
                    <div className='side-but-cont border-left'>
                        <button className='side-but' style={{ backgroundColor: "rgb(46, 45, 45)" }}>{i}</button>
                    </div>
                )
            } else {
                butCompList.push(
                    <div className={`side-but-cont ${(butList.indexOf(i) - butList.indexOf(butt)) === -1 ? '' : 'bottom-border'}`}>
                        <button className='side-but' onClick={() => (
                            function (butt) {
                                setButt(butt);
                                props.url_push('/account/' + butt.toLowerCase())
                            }
                        )(i)}>{i}</button>
                    </div>
                )
            }
        }
        setButtons(butCompList)

    }, [butt])
    return (
        <div className="account-side">
            <div className='logo-div'>
                <img src={examio} height="20" width="80"></img>
            </div>
            <div className='side-profile'>
                <div className='profile-pic'>
                    <img src={profile}></img>
                </div>

                <div className='profile-name'>
                    <h3 style={{ margin: "3px" }}>{props.user.name}</h3>
                    <h5 style={{ margin: "3px" }} className='leylow'>{props.user.email}</h5>
                </div>

            </div>
            <div className='side-actions'>
                {buttons}
            </div>

        </div>
    )
}



function Account(props) {
    const history = useHistory()
    let [userInfo, setInfo] = useState({})
    let [show, setShow] = useState(false)
    var loader = false;

    let load = () => {
        loader = !loader;
        setShow(loader);
    }

    var data = {};

    function getUserInfo() {
        if (props.user.token !== null) {
            load();
            apiFetch("GET", `info/${props.user.token}`, {}, data)
                .then(() => {
                    load()
                    if (data.status === 200) {
                        setInfo(data.data.info);
                    } else {
                        history.push("/home");
                    }
                })
        } else {
            history.push('/home');
        }
    }

    useEffect(() => {
        getUserInfo();
    }, [])



    function selectPage(page) {
        switch (page) {
            case "exams":
                return (
                    <Exam user={userInfo} load={load} token={props.user.token}/>
                )
        
            default:
                return <h1>404.. page not found</h1>
        }
    }

    return (
        <div className='account-main'>
            <div className="mobile-nav">
            <img src={examio} height="20" width="80"></img>

            <h2 style={{cursor: "pointer"}} onClick={() => {
                document.getElementsByClassName("account-side")[0].style.width = "250px";

                setTimeout(() => {
                document.getElementsByClassName("mobile-div")[0].style.display = "block";
                }, 650)
            }}>&#9776;</h2>

            </div>
            <div className='mobile-div' onClick={() => {
                document.getElementsByClassName("account-side")[0].style.width = "0px"
                document.getElementsByClassName("mobile-div")[0].style.display = "none"
            }}>

            </div>
            <Loading show={show} />
            <Sidebar url_push={history.push} user={userInfo}/>
            <div className='account-cont'>
                {selectPage(props.match.params.page)}
            </div>
        </div>
    )
}


export default Account;