import {HashRouter as Router, Switch, Route} from 'react-router-dom';
import Cookie from 'js-cookie';
import 'tachyons';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Home from './pages/Home';
import { useState } from 'react';
import Dashboard from './pages/Dashboard';

function App() {
  let [user, setUser] = useState(() => {
    let name = Cookie.get("name");
    let token = Cookie.get("token");
    return[
      name ? name : '',
      token ? token: ''
    ]
  });

  function logUser(user) {
    setUser(user)
    console.log(user)
    Cookie.set("name", user[0], {expires: 7});
    Cookie.set("token", user[1], {expires: 7});
  }
  AOS.init();

  return(
    <div>
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route path="/" exact component={() => <Home log={logUser} user={user}/>}/>
          <Route path ="/account" exact component={() => <Dashboard user={user}/>}/>
        </Switch>
      </Router>

    </div>
  );
}

export default App;
