import {HashRouter as Router, Switch, Route} from 'react-router-dom';
import {useState, useEffect} from 'react'
import Cookie from 'js-cookie';
import 'tachyons';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Home from './pages/Home'
import Account  from './pages/Account';
import Login from './pages/Login';

function App() {
  AOS.init()

  let [user, setUser] = useState({         // the user state
    name: null,
    token: null
  })

  let login = data => {                    // logs the user and save the data as a cookie
    if(data.name !== undefined && data.token !== undefined) {
      Cookie.set("name", data.name);
      Cookie.set("token", data.token)

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
  useEffect(() => {                          // relogs the user every time the site is opened
    let name = Cookie.get("name");
    let token = Cookie.get("token");

    if ((name === null) || (token === null)){
      
    } else {
      setUser({
        name: name,
        token : token
      })
    }
  }, [])


  return(
    <Router basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route path='/home' exact component={(props) => <Home {...props} user={user} />}/>
        <Route path='/account/:page' exact component={ (props) => <Account user={user} 
                                  loginFunc={login} logoutFunc={logout} {...props}/>}/>
        <Route path='/login' exact component={() => <Login loginFunc={login}/>}/>
      </Switch>
    </Router>
  );
}

export default App;
