import '../css/centerform.css';

function CenterForm(props){
    return(
        <div className="back">
            <div className={`center ${props.load ? '' : 'form'}`}>
                {props.children}
                {props.load ? '' : <div className="close grow" onClick={props.close}>&times;</div>}
            </div>
        </div>
    )
    
}
export default CenterForm;