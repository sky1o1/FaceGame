import React from 'react';
import { useHistory } from 'react-router-dom';
import {useSelector} from 'react-redux';
import { Card, CardContent } from '@material-ui/core';
import logo from '../../assets/image/logo.png';
import footer from '../../assets/Top & Bottom Bars/BottomBar.png';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import ReplayIcon from '@material-ui/icons/Replay';

function GameOver(){
const profile = useSelector(state => state.profile)
const history = useHistory();

function handleClick() {
  history.push('/')
}
    return(
        // <Card>
        //     <CardContent>
        //         <h1>Username: {profile.username} </h1>
        //         <h1>Email: {profile.email} </h1>
        //         <h1>Points: 20</h1>
        //     </CardContent>
        // </Card>
        <div className="App HomeBody">
 
        {/* <Link to='/' className="back_btn">
          <IconButton aria-label="delete" >
            <ReplayIcon fontSize="small" style={{color:"#fff"}}/>
          </IconButton>
        </Link> */}
        <div class='box' style={{
          backgroundColor: 'pink'
        }}>

          <div class='wave -one'></div>
          <div class='wave -two'></div>
          <div class='wave -three'></div>
          
          <div class='title'>
            <img src={logo} style={{width:250,height:'auto'}}/>
          </div>
            {/* <h2 class="score_title">highest score</h2> */}
              <div class="HighestScore">
            <div class="high_score">GAME OVER!!!</div>
            <div class="high_score">CURRENT SCORE</div>
            <div class="high_score_points">{profile.score}</div>
            <div class="separator"></div>
            <div class="username_player">
            <Button onClick={handleClick} variant="contained" color="primary">
            Play Again
          </Button>
            </div>
              </div> 
             
                  <img className="footer" src={footer}/>
            
        </div>


    
    </div>
    )
}

export default GameOver;