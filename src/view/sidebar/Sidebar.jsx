import React from 'react';
import firebase from 'firebase/app'
import { Link } from "react-router-dom";
import Routes from '../../routes';
import {Grid, Card} from '@material-ui/core'

function Sidebar() {
    const logout = () => {
        firebase.auth().signOut().then(function () {
            console.log('logged out')
            // navigate('/login')
        
          }).catch(function (error) {
            console.log('error logging out')
          });
          console.log('logged out')
    }
    return (
        <Grid container>
            <Grid list>
            <Card style={{
                height: 150,
                width: 120
            }}>
            <ul>
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li >
                    <button onClick={logout}>
                        Logout
                    </button>
                </li>
            </ul>
            </Card>
            </Grid>
            <Grid list>
                <Routes />
            </Grid>
        </Grid>
    )
}

export default Sidebar;

