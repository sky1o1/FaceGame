import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import footer from '../../assets/gif/gif.gif';
import { Link } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';
import happy from '../../assets/emoji/happy.png';
import angry from '../../assets/emoji/angry.png';
import surprise from '../../assets/emoji/surprise1.png';
import audio from '../../assets/sound/sad.mp3';
import { motion } from 'framer-motion';
import Script from '../emojiDetection/Script';
import { setHighScore, setScores } from '../../store/profile';
import * as faceapi from "face-api.js"
import { setHappyFace, setSadFace, setAngryFace, setSurprisedFace } from '../../store/emoji';


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

	const dispatch = useDispatch()
	const history = useHistory()
	const emoji = useSelector(state => state.emoji)
	const profile = useSelector(state => state.profile)
	const [progress, setProgress] = useState(0);
	const [points, setPoints] = useState({
		initialPoints: 0,
		finalPoints: 0
	})
	const [timerAnimation, setTimerAnimation] = useState(8)
	const [emojis, setEmojis] = useState({
		happyEmoji: 0,
		surprisedEmoji: 0,
		sadEmoji: 0,
		angryEmoji: 0,
	})
	// const [score, setScore] = useState(0)
	

	const video1 = document.getElementById('video1')

	useEffect(() => {
		const audioEl = document.getElementsByClassName("audio-element")[0]
		audioEl.play()

		localStorage.setItem('score', 0)

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
		var score4 = localStorage.getItem('score')
		if (score4 > profile.highScore) {
			dispatch(setHighScore(score4))
		}

		if(score4 >= 20){
			dispatch(setScores(score4))
			stopVideo()
			history.push('/gameover')
		}
	}

	useEffect(() => {
		async function loadModels() {
			await Promise.all([
				faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
				faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
				faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
				faceapi.nets.faceExpressionNet.loadFromUri('/models')
				]).catch(error => {
				console.error(error)
			})
		}
		loadModels()
	}, [])
	

	function startVideo() {
		async function getMedia() {
			let stream = null;
			const constraints = {
				audio: true,
				video: {
					frameRate: { ideal: 20, max: 30 },
					mirrored: false,
					width: 1280,
					height: 720,
				},
				facingMode: "user"
			}
			try {
				stream = await navigator.mediaDevices.getUserMedia(constraints);
				let video = document.getElementsByClassName('app__videoFeed')[0];
				if (video) {
					video.srcObject = stream;
				}
			} catch (err) {
				console.log(err)
			}
		}
		getMedia()
	};

	useEffect(() => {
		startVideo()
	},[])

	const stopVideo = () => {
		let video = document.getElementsByClassName('app__videoFeed')[0];
		video.srcObject.getTracks().forEach((track) => track.stop());
	};
	
	function faceFxn(){
		if(emojis.happyEmoji == 0 || emojis.surprisedEmoji == 0 || emojis.angryEmoji == 0)
		{
			if (video1) {
			// video1.addEventListener('play', () => {				

				const canvas = faceapi.createCanvasFromMedia(video1)
				document.body.append(canvas)
				const displaySize = { width: video1.width, height: video1.height }
				faceapi.matchDimensions(canvas, displaySize)
					
				const faceApi = async () => {
						try {
								const detections = await faceapi.detectAllFaces(video1, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
								console.log('entered')
							if (detections[0].expressions.happy >= 0.7) {
								console.log('happy face')
								dispatch(setHappyFace(true))
							} else if (detections[0].expressions.angry >= 0.7) {
								console.log('angry face')
								dispatch(setAngryFace(true))
							} else if (detections[0].expressions.surprised >= 0.7) {
								console.log('surprise face')
								dispatch(setSurprisedFace(true))
							}
							//  else if (detections[0].expressions.sad >= 0.8) {
							// 	console.log('sad face')
							// 	dispatch(setSadFace(true))
							// }
							
						} catch (err) {
							// console.log(err)
						}
						canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
					}
					faceApi()
		}
		else {
			// console.log('error loading vdo')
		}

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


	
			//starting div

			if (((sleft < e1right) && (sright > e1left) && (sbottom > e1top) && (stop < e1bottom) 

		  )) {
			//   console.log('entered nin starting div')
			dispatch(setSurprisedFace(false))
			dispatch(setHappyFace(false))
			dispatch(setAngryFace(false))
			dispatch(setSadFace(false))
			// setTimerAnimation( timerAnimation - 1)
			// console.log(timerAnimation)
			if (emojis.happyEmoji == 1) {
				setEmojis(prevState => ({
					...prevState,
					 happyEmoji: 0,
					surprisedEmoji: 0,
					angryEmoji: 0
				}))
			}
		}

		// emoji1
		if (((pleft < e1right) && (pright > e1left) && (pbottom > e1top) && (ptop < e1bottom)) ) {
					
			
			faceFxn()
			// console.log('happy face emoji',emoji.happyFace)


			if(emoji.happyFace){
				if (emojis.happyEmoji == 0) 
				{
					// setScore(score + 5)
					var score = parseInt(localStorage.getItem('score'))
					var updatedScore = score+5
					localStorage.setItem("score",updatedScore);

					// setPoints(prevState => ({
					// 	...prevState, finalPoints: score
					// }))
					setEmojis(prevState => ({
						...prevState, happyEmoji: 1
					}))
	
					// if ((points.finalPoints - points.initialPoints) == 10) {
					// 	console.log(points.finalPoints, points.initialPoints)
					// 	setPoints(prevState => ({
					// 		...prevState, initialPoints: score
					// 	})).then()
					// 	setTimerAnimation(timerAnimation - 3)
					// }
				}

			}else{
				gameOver()
			}
		}

		// emoji2

		if (((pleft < e2right) && (pright > e2left) && (pbottom > e2top) && (ptop < e2bottom)) ) {
			
			faceFxn()
			// console.log('surprised face emoji',emoji.surprisedFace)
			if(emoji.surprisedFace){
				if (emojis.surprisedEmoji == 0) 
				{
					// setScore(score + 5)
					var score2 = parseInt(localStorage.getItem('score'))
					var updatedScore2 = score2+5
					localStorage.setItem("score",updatedScore2);

					setEmojis(prevState => ({
						...prevState, surprisedEmoji: 1
					}))
				}

			}else{
				gameOver()
			}	
		}


		// emoji3

		if (((pleft < e3right) && (pright > e3left) && (pbottom > e3top) && (ptop < e3bottom)) ) {
			
			faceFxn()
			// console.log('angry face emoji',emoji.angryFace)
			if(emoji.angryFace){
				if (emojis.angryEmoji == 0) 
				{
					// setScore(score + 5)
					var score3 = parseInt(localStorage.getItem('score'))
					var updatedScore3 = score3+5
					localStorage.setItem("score",updatedScore3);
					setEmojis(prevState => ({
						...prevState, angryEmoji: 1
					}))
				}

			}else{
				gameOver()
			}

		}

	}

	useEffect(() => {
		collision();
	})

	return (

		<div className="App HomeBody">

			<div class='box'>

				<Link to='/home' className="back_btn"
				 onClick={stopVideo}
				>
					<IconButton aria-label="delete" >
						<ArrowBackIosRoundedIcon fontSize="small" style={{ color: "#fff" }} />
					</IconButton>
				</Link>

				{/* <BorderLinearProgress className="right" variant="determinate" value={progress} /> */}
				
				<h2>Score: {localStorage.getItem('score')}</h2>
				<audio className="audio-element">
					<source src={audio}></source>
				</audio>
					<video
						id='video1'
						playsInline
						muted
						autoPlay
						className="app__videoFeed"
					/>
				<div className='container'>
					<div className='emoji_bar'>
						<div id='endDivConatainer'>
						<div id='endDiv' className="emoji1" />

						</div>
						<div id='startDiv' className="emoji2" />
						<motion.div
							initial={{ x: 500 }}
							animate={{ x: -500 }}
							transition={{ ease: "linear", duration: timerAnimation, repeat: Infinity }}
						>
							<img id='div2' src={happy} className="emoji"  style={{marginRight:30}} />
							<img id='div3' src={surprise} className="emoji"  style={{marginRight:30}}/>
							<img id='div4' src={angry} className="emoji" style={{marginRight:30}} />
						</motion.div>
					</div>
					<h2>Score: {localStorage.getItem('score')}</h2>
				</div>
				<img className="footer" src={footer} />
			</div>
		</div>
	);
}

export default Play;