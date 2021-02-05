import React, { useState, useEffect } from 'react';
import {useSelector} from 'react-redux';
import footer from '../../assets/gif/gif.gif';
import { Link } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import emoji1 from '../../assets/emoji/emoji1-01.png';
import emoji2 from '../../assets/emoji/emoji2-01.png';
import emoji3 from '../../assets/emoji/emoji3-01.png';
import emoji4 from '../../assets/emoji/emoji4-01.png';
import emoji5 from '../../assets/emoji/emoji5-01.png';
import emoji6 from '../../assets/emoji/emoji6-01.png';
import audio from '../../assets/sound/sad.mp3';
import {motion} from 'framer-motion';
import Script from '../emojiDetection/Script';
import { setHighScore } from '../../store/profile';


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

function Play() {
	const emoji = useSelector(state => state.emoji)
	const profile = useSelector(state => state.profile)
	const [progress, setProgress] = useState(0);
	const [points, setPoints] = useState({
		initialPoints: 0,
		finalPoints: 0
	})
	const [timerAnimation, setTimerAnimation] = useState(5)
	const [happyEmoji, setHappyEmoji] = useState(0)
	const [score, setScore] = useState(0)

	useEffect(() => {
		// const audioEl = document.getElementsByClassName("audio-element")[0]
		// audioEl.play()

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

	const gameOver = () => {
		console.log('GAME OVER')
		if(score > profile.highScore){
			dispatchEvent(setHighScore(score))
		}
	}



	const collision = () => {
		var sbottom = document.getElementById('startDiv').getBoundingClientRect().bottom
		var sright = document.getElementById('startDiv').getBoundingClientRect().right
		var stop = document.getElementById('startDiv').getBoundingClientRect().top
		var sleft = document.getElementById('startDiv').getBoundingClientRect().left

		var pbottom = document.getElementById('endDiv').getBoundingClientRect().bottom
		var pright = document.getElementById('endDiv').getBoundingClientRect().right
		var ptop = document.getElementById('endDiv').getBoundingClientRect().top
		var pleft = document.getElementById('endDiv').getBoundingClientRect().left

		var e1bottom = document.getElementById('div2').getBoundingClientRect().bottom
		var e1right = document.getElementById('div2').getBoundingClientRect().right
		var e1top = document.getElementById('div2').getBoundingClientRect().top
		var e1left = document.getElementById('div2').getBoundingClientRect().left


		var e2bottom = document.getElementById('div3').getBoundingClientRect().bottom
		var e2right = document.getElementById('div3').getBoundingClientRect().right
		var e2top = document.getElementById('div3').getBoundingClientRect().top
		var e2left = document.getElementById('div3').getBoundingClientRect().left

		var e3bottom = document.getElementById('div4').getBoundingClientRect().bottom
		var e3right = document.getElementById('div4').getBoundingClientRect().right
		var e3top = document.getElementById('div4').getBoundingClientRect().top
		var e3left = document.getElementById('div4').getBoundingClientRect().left


// emoji1
		if(((pleft < e1right) && (pright > e1left) && (pbottom > e1top) && (ptop < e1bottom)) && emoji.happyFace)
		 {      
			console.log(' end collision')
			if(happyEmoji == 0 ){
				setScore(score+5)
				console.log('ssssss', score)
				setPoints(prevState => ({
					...prevState, finalPoints: score
				}))
				setHappyEmoji(1)
				
				
				if((points.finalPoints - points.initialPoints) == 10){
					console.log(points.finalPoints , points.initialPoints)
					setPoints(prevState => ({
						...prevState, initialPoints: score
					}))
					setTimerAnimation(timerAnimation - 3)
				}
			}
		  }else{
			   gameOver();
		  }

		  if(((sleft < e1right) && (sright > e1left) && (sbottom > e1top) && (stop < e1bottom)))
		 {      
			console.log(' start collision')
			// setTimerAnimation( timerAnimation - 1)
			// console.log(timerAnimation)
			if(happyEmoji == 1){
				setHappyEmoji(0)
			}
		  }


// emoji2


		//   if(((pleft < e2right) && (pright > e2left) && (pbottom > e2top) && (ptop < e2bottom)))
		//  {      
		// 	console.log(' collision')
		// 	// setTimerAnimation( timerAnimation - 1)
		// 	// console.log(timerAnimation)
		// 	if(happyEmoji == 0){
		// 		score = score+5;
		// 		setHappyEmoji(1)
		// 		console.log(happyEmoji, score)
		// 	}
		//   }

		//   if(((sleft < e2right) && (sright > e2left) && (sbottom > e2top) && (stop < e2bottom)))
		//  {      
		// 	console.log(' collision')
		// 	// setTimerAnimation( timerAnimation - 1)
		// 	// console.log(timerAnimation)
		// 	if(happyEmoji == 1){
		// 		score = score+5;
		// 		setHappyEmoji(0)
		// 		console.log(happyEmoji, score)
		// 	}
		//   }


		  //emoji3


		//   if(((pleft < e3right) && (pright > e3left) && (pbottom > e3top) && (ptop < e3bottom)))
		//  {      
		// 	console.log(' collision')
		// 	// setTimerAnimation( timerAnimation - 1)
		// 	// console.log(timerAnimation)
		// 	if(happyEmoji == 0){
		// 		score = score+5;
		// 		setHappyEmoji(1)
		// 		console.log(happyEmoji, score)
		// 	}
		//   }

		//   if(((sleft < e3right) && (sright > e3left) && (sbottom > e3top) && (stop < e3bottom)))
		//  {      
		// 	console.log(' collision')
		// 	// setTimerAnimation( timerAnimation - 1)
		// 	// console.log(timerAnimation)
		// 	if(happyEmoji == 1){
		// 		score = score+5;
		// 		setHappyEmoji(0)
		// 		console.log(happyEmoji, score)
		// 	}
		//   }

	}
	useEffect(() => {
		collision();
	})

	// collision()
	
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

						<div id='endDiv' className="emoji1" />
						<div id='startDiv' className="emoji2" />
						<motion.div
							initial={{x:500}}
							animate= {{x:-500}}
							transition={{ ease: "linear", duration: timerAnimation, repeat: Infinity }}
						>
							<img id='div2' src={emoji1} className="emoji" />
							<img id='div3' src={emoji2} className="emoji" />
							<img id='div4' src={emoji3} className="emoji" />
						</motion.div>
						

					</div>
				<h2>Score: {score}</h2>
				<h2>Timer: {timerAnimation}</h2>
				</div>
				<img className="footer" src={footer} />

			</div>



		</div>
	);
}

export default Play;