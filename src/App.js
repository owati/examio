import {HashRouter as Router, Switch, Route} from 'react-router-dom';
import {useState, useEffect} from 'react'
import Cookie from 'js-cookie';
import 'tachyons';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Loading from './components/Loading';
import Home from './pages/Home'
import Account  from './pages/Account';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Hall from './pages/Hall'

function App() {
  AOS.init()

  let [user, setUser] = useState({         // the user state
    name: Cookie.get("name"),
    token: Cookie.get("token")
  })

  let loader = false

  let [load, setLoad] = useState(false)

  function loadFunc () {
    loader = !loader
    setLoad(loader)
  }

  let login = data => {                    // logs the user and save the data as a cookie
    if(data.name !== undefined && data.token !== undefined) {
      Cookie.set("name", data.name, {expires : 7});
      Cookie.set("token", data.token, {expires : 7})

      setUser({
        name: data.name,
        token : data.token
      })
      return "the data is correct"
    } else {
      return "the data is not correct"
    }
  }

  let logout = () => {
    setUser({
      name : null,
      token : null
    })
    Cookie.remove("name");
    Cookie.remove("token");
  }

  return(
    <Router basename={process.env.PUBLIC_URL}>
      <Loading show={load}/>
      <Switch>
        <Route path='/' exact component={(props) => <Home {...props} user={user} />}/>
        <Route path='/home' exact component={(props) => <Home {...props} user={user} />}/>
        <Route path='/account/:page' exact component={ (props) => <Account user={user} 
                                  loginFunc={login} logoutFunc={logout} {...props} load={loadFunc}/>}/>
        <Route path='/login' exact component={() => <Login loginFunc={login} load={loadFunc}/>}/>
        <Route path='/login/:type' exact component={(props) => <Login loginFunc={login} load={loadFunc} {...props} />}/>
        <Route path='/signup' exact component={() => <Signup load={loadFunc}/>}/>
        <Route path='/hall/:token' exact component={(props) => <Hall {...props} user={user} load={loadFunc} />}/>
      </Switch>
    </Router>
  );
}

export default App;
