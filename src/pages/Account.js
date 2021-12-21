import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { apiFetch } from '../functions/function';
import Exam from '../components/Exam';
import examio from '../assets/examio.png';
import profile from '../assets/profile.png';
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
                        <button className='side-but' style={{backgroundColor: "white"}}>{i}</button>
                    </div>
                )
            } else {
                butCompList.push(
                    <div className={`side-but-cont ${(butList.indexOf(i) - butList.indexOf(butt)) === -1  ? '' : 'bottom-border'}`}>
                        <button className='side-but' onClick={() => (
                            function(butt) {
                                setButt(butt);
                                props.url_push( butt.toLowerCase())
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
                <img src={examio} height="25" width="100"></img>
            </div>
            <div className='side-profile'>
                <div className='profile-pic'>
                    <img src={profile}></img>
                </div>

                <div className='profile-name'>
                    <h3 style={{ margin: "3px" }}>fiyin Owati</h3>
                    <h5 style={{ margin: "3px" }} className='leylow'>fiasdasyin@gmail.com</h5>
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

    useEffect(() => {
        let returnData = {}
        if (props.user.name !== null) {
            apiFetch("GET", `info/${props.user.token}`, {
                token: props.user.token,
                returnData
            })

            if (returnData.status === 200) {
                setInfo(returnData.data)
            } else {

            }
        }

    }, [])



    function selectPage() {
        let page = props.match.params.page
        switch (page) {
            case "exams":
                return (
                    <Exam />
                )
            default:
                return <h1>404.. page not found</h1>
        }
    }

    return (
        <div className='account-main'>
            <Sidebar url_push={history.push} />
            <div className='account-cont'>
                {selectPage()}
            </div>



        </div>
    )
}


export default Account;