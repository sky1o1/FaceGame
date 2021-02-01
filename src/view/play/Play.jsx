// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom'

// function Play() {

// 	const startVideo = () => {
// 		async function getMedia() {
// 			let stream = null;
// 			const constraints = {
// 				audio: true,
// 				video: {
// 					frameRate: { ideal: 15, max: 20 },
// 					mirrored: false,
// 					width: 1280,
// 					height: 720,
// 				},
// 				facingMode: "user"
// 			}
// 			try {
// 				stream = await navigator.mediaDevices.getUserMedia(constraints);
// 				let video = document.getElementsByClassName('app__videoFeed')[0];
// 				if (video) {
// 					video.srcObject = stream;
// 					console.log('video available')
// 				}
// 			} catch (err) {
// 				console.log(err)
// 			}
// 		}
// 		getMedia()
// 	};

// 	const stopVideo = () => {
// 		console.log('video unAvailable')
// 		let video = document.getElementsByClassName('app__videoFeed')[0];
// 		video.srcObject.getTracks().forEach((track) => track.stop());
// 	};

	// useEffect(() => {
		// const audioEl = document.getElementsByClassName("audio-element")[0]
		// audioEl.play()
	// 	startVideo();
	// }, [])

// 	return (
// 		<div className="app">
// 			<div className='container'>
// 				<video
// 					playsInline
// 					muted
// 					autoPlay
// 					resize
// 					className="app__videoFeed"
// 				/>
// 				<view className='viewText'>
// 					<button onClick={stopVideo}>
// 						<Link to='/home'>
// 							Stop
// 						</Link>
// 					</button>
// 				</view>
				// <audio className="audio-element">
				// 	<source src="https://assets.coderrocketfuel.com/pomodoro-times-up.mp3"></source>
				// </audio>
// 			</div>
// 		</div>
// 	);
// }

// export default Play;

import React, { useState, useEffect } from 'react';
import logo from '../../assets/image/logo.png';
import footer from '../../assets/gif/gif.gif';
import { Link, useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import emoji1 from '../../assets/emoji/emoji1-01.png';
import emoji2 from '../../assets/emoji/emoji2-01.png';
import emoji3 from '../../assets/emoji/emoji3-01.png';
import emoji4 from '../../assets/emoji/emoji4-01.png';
import emoji5 from '../../assets/emoji/emoji5-01.png';
import emoji6 from '../../assets/emoji/emoji6-01.png';
import audio from '../../assets/sound/sad.mp3';


const BorderLinearProgress = withStyles((theme) => ({
	root: {
	  height: 10,
	  borderRadius: 5,
	},
	colorPrimary: {
	  backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
	},
	bar: {
	  borderRadius: 5,
	  backgroundColor: '#e65c00',
		borderWidth:5
	},
  }))(LinearProgress);

function Play() {
	const [playing, setPlaying] = useState(false);
	const [progress, setProgress] = React.useState(0);

	React.useEffect(() => {
		const audioEl = document.getElementsByClassName("audio-element")[0]
		audioEl.play()
		const timer = setInterval(() => {
		  setProgress((oldProgress) => {
			if (oldProgress === 100) {
			  return 0;
			}
			const diff = Math.random() * 10;
			return Math.min(oldProgress + diff, 100);
		  });
		}, 500);
	
		return () => {
		  clearInterval(timer);
		};
	  }, []);
	const startVideo = () => {
		setPlaying(true);
		async function getMedia() {
			let stream = null;
			const constraints = {
				audio: true, 
				video: {
						frameRate: { ideal: 15, max: 20 },
						mirrored: false, 
						width: 1280, 
						height: 720 ,
					}, 
				facingMode: "user"
			}
			try {
			  stream = await navigator.mediaDevices.getUserMedia(constraints);
			  let video = document.getElementsByClassName('app__videoFeed')[0];
				if (video) {
					video.srcObject = stream;
					console.log('video available')
				}
			} catch(err) {
			  console.log(err)
			}
		  }
		  getMedia()
	};

	const stopVideo = () => {
		console.log('video unAvailable')
		let video = document.getElementsByClassName('app__videoFeed')[0];
		video.srcObject.getTracks().forEach((track) => track.stop());
	};



	useEffect(() => {
		startVideo();
	}, [])

	return (
	
		<div className="App HomeBody">
		
        <div class='box'>
	 
			<Link to='/home' className="back_btn" onClick={stopVideo}>
								<IconButton aria-label="delete" >
									<ArrowBackIosRoundedIcon fontSize="small" style={{color:"#fff"}}/>
								</IconButton>
								</Link>
			
				<BorderLinearProgress className="right"  variant="determinate" value={progress} />
			
				<audio className="audio-element">
					<source src={audio}></source>
				</audio>
	
		<div className='container'>
			
			<video
					playsInline
					muted
					autoPlay
					resize
					className="app__videoFeed"
				/>
				<div className='emoji_bar'>
					{/* <div class="emoji " id="slide"> 
						<img src={emoji} style={{width:'100%'}} className="emoji_img"/>
						
					</div> */}
				<div class="slider ">
						<img src={emoji1} className="emoji" />
						<img src={emoji2} className="emoji" />
						<img src={emoji3} className="emoji" />
						<img src={emoji4} className="emoji" />
						<img src={emoji5} className="emoji" />
						<img src={emoji6} className="emoji" />
					
				</div>
				
			
				</div>
			</div>
			

			
		
				  <img className="footer" src={footer}/>
            
        </div>


    
    </div>
	);
}

export default Play;