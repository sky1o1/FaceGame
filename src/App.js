import {useEffect} from  'react';
import {useDispatch} from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import { auth } from '../src/services/firebase/config';
import {setEmail, setUsername} from '../src/store/profile'; 
import {setAuth} from '../src/store/auth';
import PrivateRoute from '../src/common/PrivateRoute';
import Home from '../src/view/Home/Home' ;
import Script from '../src/view/emojiDetection/Script';
import Profile from '../src/view/profile/Profile';
import Login from '../src/view/auth/Login';
import Play from './view/play/Play';

function App() {
const dispatch = useDispatch()
  useEffect(() => {
    auth.onAuthStateChanged(async user => {
      if(user){
      dispatch(setEmail(user.email))
      dispatch(setUsername(user.displayName))
      dispatch(setAuth(true))
      }
      else{
        dispatch(setAuth(false))
      }
    })
  })


  return (
   

    <Router>
    <Switch>
     
      <Route exact path="/">
        <Login />
      </Route> 
      <PrivateRoute path="/home" component={Home} />
      <PrivateRoute path="/play" component={Play} />
      <PrivateRoute path="/profile" component={Profile} />
      <PrivateRoute path="/script" component={Script} />
    </Switch>
  </Router>
  );
}

export default App;
