import React from 'react';
import firebase from 'firebase/app'
import { Link, useHistory } from "react-router-dom";
import Sidebar from '../sidebar/Sidebar';
import Profile from '../profile/Profile';
import { makeStyles, Grid, Card, Button } from '@material-ui/core';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles((theme) => ({
    gridBtn: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    btn: {
        // textDecoration: 'none',
        textDecorationColor: 'none'
    }
}))

function Home() {
    const classes = useStyles()
    const history = useHistory()

    const logout = () => {
        firebase.auth().signOut().then(function () {
            console.log('logged out')
            history.push('/')
        
          }).catch(function (error) {
            console.log('error logging out')
          });
    }

    return (
        <Grid container className={classes.gridBtn}>
            {/* <Grid xs={2}>
               <Sidebar />
           </Grid> */}

            <Grid list xs={4}>
                <Button
                    variant="contained"
                    color="secondary"
                    // className='App-logo'
                    startIcon={<SportsEsportsIcon />}
                >
                    <Link to='/play'>
                    Play
                    </Link>
                    
                </Button>
            </Grid>

            <Grid list xs={4}>
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<PersonIcon />}
                >
                     <Link to='/profile'>
                    Profile
                    </Link>
                </Button>
            </Grid>

            <Grid list xs={4}>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={logout}
                    startIcon={<ExitToAppIcon />}
                >
                    Exit
                </Button>
            </Grid>
        </Grid>
    )
}

export default Home;