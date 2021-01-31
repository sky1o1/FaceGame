import React, {  useEffect } from 'react';
import firebase from 'firebase';
import {auth} from '../../services/firebase/config';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import { makeStyles, Card} from '@material-ui/core';

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
    <Card
      className={classes.root}
      title="Login"
    >
        <h1 style={{paddingLeft: '500px'}}>login</h1>
      <div id="firebaseui-auth-container"></div>
    </Card >
  );
};

export default Login;
