import '../css/footer.css';

function Footer(){
    return(
        <div className="foot">
            <div className="foot-cont">
                <ul>
                    <li className="cont2">Documentation</li>
                    <li className="cont2">About</li>
                    <li className="cont2">Login</li>
                    <li className="cont2">Signup</li>
                </ul>
                <ul>
                    <p> Contact us</p>
                    <li className="cont"><a href="mailto:mofiyinfoluwaowati@gmail.com">mofiyinfoluwaowati@gmail.com</a></li>
                    <li className="cont">about</li>
                    <li className="cont">login</li>
                    <li className="cont">signup</li>
                </ul>

            </div>
            <div className="footer">
                <h5> All rights reserved, Owati&copy; {new Date().getFullYear()}</h5>
            </div>

        </div>
    )

}

export default Footer;