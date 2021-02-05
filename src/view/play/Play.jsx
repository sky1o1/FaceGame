import React, { useState, useEffect, useRef, createRef } from 'react';
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
import { motion, animate } from 'framer-motion';
import Script from '../emojiDetection/Script';

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
		borderWidth: 5
	},
}))(LinearProgress);


const useStyles = makeStyles((theme) => ({
	slider: {
		position: 'relative',
		animation: 'myfirst 5s linear  infinite',
		width: '1000px'
	}
}))

function Play() {
	const [progress, setProgress] = useState(0)
	const [points, setPoints] = useState(0)
	const [timerAnimation, setTimerAnimation] = useState(5)
	const classes = useStyles()


	const collision = () => {
		var div1Height = document.getElementById('div1').getBoundingClientRect().height
		var div1Width = document.getElementById('div1').getBoundingClientRect().width
		var div1Top = document.getElementById('div1').getBoundingClientRect().top
		var div1Left = document.getElementById('div1').getBoundingClientRect().left

		var div2Height = document.getElementById('div2').getBoundingClientRect().height
		var div2Width = document.getElementById('div2').getBoundingClientRect().width
		var div2Top = document.getElementById('div2').getBoundingClientRect().top
		var div2Left = document.getElementById('div2').getBoundingClientRect().left

		var div3Height = document.getElementById('div3').getBoundingClientRect().height
		var div3Width = document.getElementById('div3').getBoundingClientRect().width
		var div3Top = document.getElementById('div3').getBoundingClientRect().top
		var div3Left = document.getElementById('div3').getBoundingClientRect().left

		var div4Height = document.getElementById('div4').getBoundingClientRect().height
		var div4Width = document.getElementById('div4').getBoundingClientRect().width
		var div4Top = document.getElementById('div4').getBoundingClientRect().top
		var div4Left = document.getElementById('div4').getBoundingClientRect().left
		// if (div1Left < (div2Left + div2Width) && (div1Left + div1Width) > div2Left &&
		// 	div1Top < (div2Top + div2Height) && (div1Top + div1Height) > div2Top) {
		// 	console.log(' collision 1')
		// }

		// if (div1Left < (div3Left + div3Width) && (div1Left + div1Width) > div3Left &&
		// 	div1Top < (div3Top + div3Height) && (div1Top + div1Height) > div3Top) {
		// 	console.log(' collision 2')
		// }

		// if (div1Left < (div4Left + div4Width) && (div1Left + div1Width) > div4Left &&
		// 	div1Top < (div4Top + div4Height) && (div1Top + div1Height) > div4Top) {
		// 	console.log(' collision 3')

		// }


		// if (div1Left < (div5Left + div5Width) && (div1Left + div1Width) > div5Left &&
		// 	div1Top < (div5Top + div5Height) && (div1Top + div1Height) > div5Top) {
		// 	console.log(' collision 4')

		// }


		// if (div1Left < (div6Left + div6Width) && (div1Left + div1Width) > div6Left &&
		// 	div1Top < (div6Top + div6Height) && (div1Top + div1Height) > div6Top) {
		// 	console.log(' collision 5')

		// }


		// if (div1Left < (div7Left + div7Width) && (div1Left + div1Width) > div7Left &&
		// 	div1Top < (div7Top + div7Height) && (div1Top + div1Height) > div7Top) {
		// 	console.log(' collision 6')
		// }




		var pbottom = document.getElementById('div1').getBoundingClientRect().bottom
		var pright = document.getElementById('div1').getBoundingClientRect().right
		var ptop = document.getElementById('div1').getBoundingClientRect().top
		var pleft = document.getElementById('div1').getBoundingClientRect().left

		var pcbottom = document.getElementById('div2').getBoundingClientRect().bottom
		var pcright = document.getElementById('div2').getBoundingClientRect().right
		var pctop = document.getElementById('div2').getBoundingClientRect().top
		var pcleft = document.getElementById('div2').getBoundingClientRect().left



	}

	// useEffect(() => {
	// 	startVideo();
	// }, [])


// useEffect(() => {
// 	function mymove(){
// 		var elem = document.getElementById('div2');
// 		var pos = 0 ; 
// 		var id = setInterval(frame,1);
// 		function frame(){
// 			if(pos == 350){
// 				clearInterval(id);
// 			}else{
// 				pos++; 
// 				elem.style.top = pos +'px';
// 				elem.style.left = pos +'px';
// 			}
// 		}
// 	}
// 	mymove()
	
// },[])


	return (

		<div className="App HomeBody">

			<div class='box'>

				<Link to='/home' className="back_btn"
				//  onClick={stopVideo}
				>
					<IconButton aria-label="delete" >
						<ArrowBackIosRoundedIcon fontSize="small" style={{ color: "#fff" }} />
					</IconButton>
				</Link>

				<BorderLinearProgress className="right" variant="determinate" value={progress} />
			
				<audio className="audio-element">
					<source src={audio}></source>
				</audio>

				<div className='container'>

				<Script />
					<div className='emoji_bar'>

						<div id='div1' className="emoji1" />
						<div
						className={classes.slider}
							// initial={{x:500}}
							// animate= {{x:-500}}
							// transition={{ ease: "linear", duration: '5' }}
						>
							<img id='div2'  src={emoji1} className="emoji" />
							<img id='div3' src={emoji2} className="emoji" />
							<img id='div4' src={emoji3} className="emoji" />
							<img id='div5' src={emoji4} className="emoji" />
						</div>

						{/* <marquee  width="100%" direction="left" height="100%" scrollamount='20'>
							<img id='div2' src={emoji1} className="emoji" />
							<img id='div3' src={emoji2} className="emoji" />
							<img id='div4' src={emoji3} className="emoji" />
							<img id='div5' src={emoji4} className="emoji" />
						</marquee> */}

					</div>
				</div>
				{/* <img className="footer" src={footer} /> */}

			</div>



		</div>
	);
}

export default Play;