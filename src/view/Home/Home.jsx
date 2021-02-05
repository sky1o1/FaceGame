import React from 'react';
import firebase from 'firebase/app'
import { Link, useHistory } from "react-router-dom";
import Sidebar from '../sidebar/Sidebar';
import Profile from '../profile/Profile';
import { makeStyles, Grid, Card, Button } from '@material-ui/core';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import footer from '../../assets/image/GIF.png';
import logo from '../../assets/image/logo.png';

import '../../assets/css/style.css'
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
            history.push('/')
        
          }).catch(function (error) {
            console.log('error logging out')
          });
    }

    return (
        <div className="App HomeBody">


          <div class='box'>
            <div class='wave -one'></div>
            <div class='wave -two'></div>
            <div class='wave -three'></div>
            <div class='title'>
            <img src={logo} style={{width:250,height:'auto'}}/>
            </div>
            <div className="container4">
                    <div className="inner_container">
                    
                      <Link to='/play' className="game_font">
                          <a class="fancy-button bg-gradient1 green"><span class="game_font"><i class="fa fa-wheelchair-alt"></i>
                            Play
                          </span></a>
                        </Link>

                        <Link to='/profile' className="game_font">
                          <a class="fancy-button bg-gradient1 green"><span class="game_font"><i class="fa fa-wheelchair-alt"></i>
                            Profile
                          </span></a>
                        </Link>

                        <Link onClick={logout} className="game_font">
                          <a class="fancy-button bg-gradient1 green"><span class="game_font"><i class="fa fa-wheelchair-alt"></i>
                            Leave
                          </span></a>
                        </Link>
                      </div>
                    
                    <img className="footer" src={footer}/>
                </div> 
          </div>


      
      </div>
      
    )
}

export default Home;