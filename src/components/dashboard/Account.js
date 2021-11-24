import { API_URL } from "../../functions/functions";
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from "react";
import profile from '../../assets/profile.png';
import '../../css/dashboard.css';

function Account(props) {
    const history = useHistory()
    let [user, setUser] = useState({
        name: 'no one',
        email: 'polsd',
        role: true
    });
    async function getInfo() {
        try {
            let response = await fetch(API_URL + `info/${props.token}`)
            let res = await response.json()

            if (res.error !== null) history.push('/');
            else {
                setUser(res.info);
            }


            props.load();
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        props.load();
        getInfo();
    }, [])



    return (
        <div className="info-div">
            <div style={{
                backgroundColor: 'white',
                width: '100px',
                height: '100px',
                border: '5px black solid',
                borderRadius: '50px',
                overflow: 'hidden'
            }
            }>
                <img src={profile} height='100' width="100"></img>
            </div>
            <h2 style={{ margin: '0px 0px' }}>{user.name}</h2>
            <p style={{ margin: '0px 0px', fontSize: '15px' }}>{user.email}</p>
            <h3 style={{ margin: '0px 0px' }}>Current Role: {user.role ? '                        examiner' : 'examinee'}</h3>
            <div className="stats-div">
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    margin: '10px 40px'
                }}>
                    <h3>no of created exams: </h3>
                    <h3>{user.exam}</h3>
                </div>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    margin: '10px 40px'
                }}>
                    <h3>no of completed exams</h3>
                    <h3>0</h3>
                </div>
                <div>
                    <button onClick={() => {
                        if (user.exam == 0) history.push('exam_create')
                        else history.push('exam_view')
                    }}>
                        {user.exam == 0 ? 'create exam' : 'view exams'}
                    </button>
                </div>

            </div>
        </div>
    )

}

export default Account;