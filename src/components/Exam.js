import {useState, useEffect} from 'react';

function Exam(props) {
    console.log(props)
    useEffect(() => {
        
    })
    return (
        <div className='exam-main'>
            <div className='exam-action'>
                <div className='section-header'>
                    <h2 style={{margin:"0px"}}>Manage Exams</h2>
                </div>
                <div className='exam-details'>
                    <h2 style={{margin: "0px"}}>Total exams: {props.user.exam}</h2>

                    <div></div>

                </div>


            </div>
            <div className='exam-action-page'>

                
            </div>

        </div>
    )

}

export default Exam;