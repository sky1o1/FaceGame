import React, {  useEffect } from 'react';
import firebase from 'firebase';
import {auth} from '../../services/firebase/config';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import { makeStyles, Card} from '@material-ui/core';
import logo from '../../assets/image/logo.png';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Login = () => {
  const classes = useStyles();


  var uiConfig = {
    signInSuccessUrl: '/home',
    signInOptions: [ firebase.auth.EmailAuthProvider.PROVIDER_ID ]
  };

  useEffect(() => {
    if (firebaseui.auth.AuthUI.getInstance()) {
      const ui = firebaseui.auth.AuthUI.getInstance()
      ui.start('#firebaseui-auth-container', uiConfig)
    } 
    else {
      const ui = new firebaseui.auth.AuthUI(auth)
      ui.start('#firebaseui-auth-container', uiConfig)
    }
  }, [])


  return (
<div className="App HomeBody">


<div class='box'>
  <div class='wave -one'></div>
  <div class='wave -two'></div>
  <div class='wave -three'></div>
  <div class='title'>
  <img src={logo} style={{width:250,height:'auto'}}/>
  </div>
  <div class="login_box">
  <div id="firebaseui-auth-container" >
      </div>
  </div>


</div>
      
</div>


  );
};

export default Login;
