

function Alert(props) {
    return(
        <div style={{
            position: 'fixed',
            width: '100%',
            height: '0px',
            display: 'flex',
            top: 'calc(100vh / 17)',
            justifyContent: 'center',
            transition: '1s all ease',
            overflow: 'hidden'
        }} id="alert">
            <div style={{
                width: '330px',
                height: '100px',
                backgroundColor: 'rgb(114,123, 165)',
                color: 'cornsilk'
            }}>
                <p style={
                    {
                        textAlign: 'center',
                        fontWeight: 'bolder'
                    }
                }>
                    {props.message}
                </p>

            </div>

        </div>
    )

}

export default Alert;