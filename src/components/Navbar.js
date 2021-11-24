import { useHistory } from "react-router";
import { useEffect } from "react";
import '../css/navbar.css';




function Navbar(props) {
    const history = useHistory()
    let dropdown = () => {
        let drop = document.getElementsByClassName('drop')[0];
        if (drop.style.height === '0px') {
            drop.style.height = '90px';
        } else {
            drop.style.height = '0px';
        }
    }

    useEffect(() => {
        var handleScroll = (e) => {
            function calc(num) {
                let length = window.visualViewport.height
                return (num / length)
            }
            try {
                if (window.scrollY !== 0) {
                    document.getElementsByClassName('nav')[0].style.backgroundColor = `rgba(141, 141, 141, ${calc(window.scrollY)})`;
                } else {
                    document.getElementsByClassName('nav')[0].style.backgroundColor = 'transparent';
                }

            } catch (err) {
                console.log(err)
            }

        }
        window.addEventListener('scroll', handleScroll)

        return function cleanup() {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])
    return (
        <div>
            <div className="nav">
                <div className="tit">
                    <h3> Examio</h3>
                </div>
                <div className="menu">
                    <ul>
                        <li className="links">Home</li>
                        <li className="links">Documentations</li>
                        <li className="links">About</li>
                    </ul>
                </div>
                <div className="menu2">
                    <h1 onClick={dropdown}>&copy;</h1>
                </div>
                <div className="tit">
                    <h3 className='logn' onClick={
                        props.user[0] == '' ? props.log : () => {
                            history.push('/account/user')
                        }
                    }> {
                            props.user[0] == '' ? 'login' : props.user[0]
                        }</h3>
                </div>

            </div>

            <div className="drop">
                <div className="dropdown">
                    <div className="drops">Home</div>
                    <div className="drops">Documentations</div>
                    <div className="drops">About</div>
                </div>
            </div>
        </div>
    )
}

export default Navbar;