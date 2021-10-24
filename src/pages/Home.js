import {useState} from 'react';
import Bullets from '../components/Bullets';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Signup from '../components/Signup';
import '../css/home.css';
import Loading from '../components/Loading';
import Login from '../components/Login';



function Home(props) {
    let [user, setUser] = useState(props.user)

    function logUser(user) {
        setUser(user)
    }
    let [which, setWhich] = useState('examiner');

    let [login, setLogin] = useState(false);
    let [sign, setSign] = useState(false)

    let loader = false;
    let [load, setLoad] = useState(false);
  
    function shouldLoad(){
      loader = !loader
      setLoad(loader)
      console.log(load)
    }


    function handleSign(whi){
        setLogin(true);
        setWhich(whi);
    }

    function showLogin(){
        setSign(true)
    }

    function closeLogin(){
        setSign(false)
    }


    function closeSign(){
        setLogin(false)
    }
    return(
        <div>
            <Header func={handleSign} log={showLogin} user={user}/>
            <h1 className="why">why use examIO </h1>            
            <div className="rows">
                <Bullets value={0}/>
                <Bullets value={1}/>
            </div>
            <div className="rows">
                <Bullets value={2}/>
                <Bullets value={3}/>
            </div>
            <Signup show={login} which={which} load={shouldLoad} close={closeSign} login={showLogin}/>
            <Login show={sign} load={shouldLoad} close={closeLogin}  log={props.log} loguse={logUser}/>
            <Loading load={load}/>
            <Footer/>
        </div>
    )

}

export default Home;

