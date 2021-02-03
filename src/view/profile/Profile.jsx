import React from 'react';
import {useSelector} from 'react-redux';
import { Card, CardContent } from '@material-ui/core';
import logo from '../../assets/image/logo.png';
import footer from '../../assets/image/GIF.png';
import { Link, useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';

function Profile(){
const profile = useSelector(state => state.profile)
    return(
        // <Card>
        //     <CardContent>
        //         <h1>Username: {profile.username} </h1>
        //         <h1>Email: {profile.email} </h1>
        //         <h1>Points: 20</h1>
        //     </CardContent>
        // </Card>
        <div className="App HomeBody">

        <Link to='/home' className="back_btn">
          <IconButton aria-label="delete" >
            <ArrowBackIosRoundedIcon fontSize="small" style={{color:"#fff"}}/>
          </IconButton>
        </Link>
        <div class='box'>

          <div class='wave -one'></div>
          <div class='wave -two'></div>
          <div class='wave -three'></div>
          
          <div class='title'>
            <img src={logo} style={{width:250,height:'auto'}}/>
          </div>
            {/* <h2 class="score_title">highest score</h2> */}
              <div class="HighestScore">
            <div class="high_score">High score</div>
            <div class="high_score_points">7000</div>
            <div class="separator"></div>
            <div class="username_player">
              Player {profile.username}
            </div>
              </div> 
               
                  <img className="footer" src={footer}/>
            
        </div>


    
    </div>
    )
}

export default Profile;