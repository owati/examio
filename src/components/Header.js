import "../css/header.css";
import Navbar from './Navbar'
import logo from '../assets/logo.png'
import back1 from '../assets/back1.jpg';
import back2 from '../assets/back2.jpg';
import back3 from '../assets/back3.jpg';
import back4 from '../assets/back4.jpg';
import back5 from '../assets/back5.jpg';
import back6 from '../assets/back6.jpg';
import back7 from '../assets/back7.jpg';
import { useEffect } from "react";


const image = [back1, back2, back3, back4, back5, back6, back7];
let count = 1;


function Header(props) {
    useEffect(() => {
        var timer = setInterval(() => {
            let back = document.getElementsByClassName('bger')[0];
            back.style.background = `url(${image[count]}) no-repeat center`;
            back.style.backgroundSize = 'cover';
            count = count === (image.length - 1) ? 0 : ++count;
        }, 10000)

        return function cleanup() {
            clearInterval(timer)
        }
    }, []);
    return (
        <div className="bger">
            <div className="main">
                <Navbar log={props.log} user={props.user} />
                <div className="hello">
                    <div className="greet">
                        <div>
                            <h1 className="large" data-aos="fade-up" data-aos-delay="200" data-aos-offset="200" data-aos-duration="900"> Hi,</h1>
                            <h1 className="pol" data-aos="fade-up" data-aos-delay="400" data-aos-offset="200" data-aos-duration="900"> welcome to examio</h1>
                            <h2 className="pol" data-aos="fade-up" data-aos-delay="800" data-aos-offset="200" data-aos-duration="900"> the best online exam platform..</h2>
                        </div>

                    </div>
                    <div className="logo">
                        <img src={logo} height="200" width="200"></img>
                    </div>

                </div>
                <div className="base">
                    <button className="base-btn grow shadow-5" onClick={() => { props.func('examiner') }}>Examiner</button>
                    <button className="base-btn grow shadow-5" onClick={() => { props.func('examinee') }}>Examinee</button>
                </div>

            </div>
        </div>
    )

}

export default Header;