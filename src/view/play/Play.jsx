import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import footer from '../../assets/Top & Bottom Bars/BottomBar.png';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';
import topbar from '../../assets/Top & Bottom Bars/TopBarOg.png'
import happy from '../../assets/Emojis/HappyEmoji.png';
import angry from '../../assets/Emojis/AngryEmoji.png';
import surprise from '../../assets/Emojis/SurprisedEmoji.png';
import audio from '../../assets/sound/sad.mp3';
import score1 from '../../assets/Scores/ScoreOkay+1.png';
import score2 from '../../assets/Scores/ScoreGreat+2.png';
import score3 from '../../assets/Scores/ScorePerfect+3.png';
import { motion } from 'framer-motion';
import { setHighScore, setScores } from '../../store/profile';
import * as faceapi from "face-api.js"
import { setHappyFace, setSadFace, setAngryFace, setSurprisedFace } from '../../store/emoji';


const BorderLinearProgress = withStyles((theme) => ({
	root: {
		height: 10,
		borderRadius: 50,
	},
	colorPrimary: {
		backgroundColor: '#EF527C'
	},
	bar: {
		borderRadius: 5,
		backgroundColor: '#FF8C00',
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
	const [img, setImg] = useState({
		happyImg: false,
		surprisedImg: false,
		angryImg: false
	})
	const [timerAnimation, setTimerAnimation] = useState(10)
	const [emojis, setEmojis] = useState({
		happyEmoji: 0,
		surprisedEmoji: 0,
		sadEmoji: 0,
		angryEmoji: 0,
	})

	const video1 = document.getElementById('video1')

	useEffect(() => {
		// const audioEl = document.getElementsByClassName("audio-element")[0]
		// audioEl.play()
		localStorage.setItem('score',0)

		const timer = setInterval(() => {
			
			setProgress((oldProgress) => {
				if (oldProgress === 100) {
					gameOver()
					return 0;
				}
				const diff = Math.random() * 3;
				return Math.min(oldProgress + diff, 100);
			});
		}, 500);
		return () => {
			clearInterval(timer);
		};
	}, []);

	const gameOver = () => {
		var score4 = parseInt(localStorage.getItem('score'))
		// if (score4 > profile.highScore) {
		// 	dispatch(setHighScore(score4))
		// }

		// if(score4 >= 50){
		// 	dispatch(setScores(score4))
		// 	stopVideo()
		// 	history.push('/gameover')
		// }
		if(progress == 0){
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
		if(emojis.surprisedEmoji == 0 || emojis.happyEmoji == 0 || emojis.angryEmoji == 0)
		{
			if (video1) {
				const canvas = faceapi.createCanvasFromMedia(video1)
				document.body.append(canvas)
				const displaySize = { width: video1.width, height: video1.height }
				faceapi.matchDimensions(canvas, displaySize)
					
				const faceApi = async () => {
						try {
								const detections = await faceapi.detectAllFaces(video1, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
							if (detections[0].expressions.happy >= 0.7) {
								dispatch(setHappyFace(true))
							} else if (detections[0].expressions.angry >= 0.7) {
								dispatch(setAngryFace(true))
							} else if (detections[0].expressions.surprised >= 0.7) {
								dispatch(setSurprisedFace(true))
							}
							//  else if (detections[0].expressions.sad >= 0.8) {
							// 	console.log('sad face')
							// 	dispatch(setSadFace(true))
							// }
							
						} catch (err) {
						}
						canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
					}
					faceApi()
		}
		else {
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

		var e4bottom = document.getElementById('div5').getBoundingClientRect().bottom
		var e4right = document.getElementById('div5').getBoundingClientRect().right
		var e4top = document.getElementById('div5').getBoundingClientRect().top
		var e4left = document.getElementById('div5').getBoundingClientRect().left

		var e5bottom = document.getElementById('div6').getBoundingClientRect().bottom
		var e5right = document.getElementById('div6').getBoundingClientRect().right
		var e5top = document.getElementById('div6').getBoundingClientRect().top
		var e5left = document.getElementById('div6').getBoundingClientRect().left

		var e6bottom = document.getElementById('div7').getBoundingClientRect().bottom
		var e6right = document.getElementById('div7').getBoundingClientRect().right
		var e6top = document.getElementById('div7').getBoundingClientRect().top
		var e6left = document.getElementById('div7').getBoundingClientRect().left

		var e7bottom = document.getElementById('div8').getBoundingClientRect().bottom
		var e7right = document.getElementById('div8').getBoundingClientRect().right
		var e7top = document.getElementById('div8').getBoundingClientRect().top
		var e7left = document.getElementById('div8').getBoundingClientRect().left


	
			//starting div

			if (((sleft < e1right) && (sright > e1left) && (sbottom > e1top) && (stop < e1bottom)) ||
			((sleft < e2right) && (sright > e2left) && (sbottom > e2top) && (stop < e2bottom)) ||
			((sleft < e3right) && (sright > e3left) && (sbottom > e3top) && (stop < e3bottom)) ||
			((sleft < e4right) && (sright > e4left) && (sbottom > e4top) && (stop < e4bottom)) ||
			((sleft < e5right) && (sright > e5left) && (sbottom > e5top) && (stop < e5bottom)) ||
			((sleft < e6right) && (sright > e6left) && (sbottom > e6top) && (stop < e6bottom)) ||
			((sleft < e7right) && (sright > e7left) && (sbottom > e7top) && (stop < e7bottom))
		  ) {
			dispatch(setSurprisedFace(false))
			dispatch(setHappyFace(false))
			dispatch(setAngryFace(false))
			dispatch(setSadFace(false))
			setImg(prevData => ({
				...prevData, 
				happyImg: false,
				surprisedImg: false,
				angryImg: false
			}))
			// setTimerAnimation( timerAnimation - 1)
			// console.log(timerAnimation)
			// if (emojis.happyEmoji == 1 || emojis.surprisedEmoji == 1 || emojis.angryEmoji == 1) {
				setEmojis(prevState => ({
					...prevState,
					 happyEmoji: 0,
					surprisedEmoji: 0,
					angryEmoji: 0
				}))
			// }
		}

		// emoji1
		if (((pleft < e1right) && (pright > e1left) && (pbottom > e1top) && (ptop < e1bottom)) ) {
					
			faceFxn()
			if(emoji.happyFace){
				if (emojis.happyEmoji == 0) 
				{
					var score = parseInt(localStorage.getItem('score'))
					var updatedScore = score+3
					localStorage.setItem("score",updatedScore);

					// setPoints(prevState => ({
					// 	...prevState, finalPoints: score
					// }))
					setEmojis(prevState => ({
						...prevState, happyEmoji: 1
					}))

					setImg(prevData => ({
						...prevData, 
						happyImg: true,
						surprisedImg: false,
						angryImg: false
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

			// emoji5
			if (((pleft < e4right) && (pright > e4left) && (pbottom > e4top) && (ptop < e4bottom)) ) {
				
				faceFxn()
				if(emoji.happyFace){
					if (emojis.happyEmoji == 0) 
					{
						var score = parseInt(localStorage.getItem('score'))
						var updatedScore = score+3
						localStorage.setItem("score",updatedScore);
						setEmojis(prevState => ({
							...prevState, happyEmoji: 1
						}))
						setImg(prevData => ({
							...prevData, 
							happyImg: true,
							surprisedImg: false,
							angryImg: false
						}))
					}
					}else{
					gameOver()
				}
			}

		// emoji2

		if (((pleft < e2right) && (pright > e2left) && (pbottom > e2top) && (ptop < e2bottom)) ) {
			
			faceFxn()
			if(emoji.surprisedFace){
				if (emojis.surprisedEmoji == 0) 
				{
					var score2 = parseInt(localStorage.getItem('score'))
					var updatedScore2 = score2+3
					localStorage.setItem("score",updatedScore2);

					setEmojis(prevState => ({
						...prevState, surprisedEmoji: 1
					}))
					setImg(prevData => ({
						...prevData, 
						happyImg: false,
						surprisedImg: true,
						angryImg: false
					}))
				}

			}else{
				gameOver()
			}	
		}

		if (((pleft < e5right) && (pright > e5left) && (pbottom > e5top) && (ptop < e5bottom)) ) {
			
			faceFxn()
			if(emoji.surprisedFace){
				if (emojis.surprisedEmoji == 0) 
				{
					var score2 = parseInt(localStorage.getItem('score'))
					var updatedScore2 = score2+3
					localStorage.setItem("score",updatedScore2);

					setEmojis(prevState => ({
						...prevState, surprisedEmoji: 1
					}))
					setImg(prevData => ({
						...prevData, 
						happyImg: false,
						surprisedImg: true,
						angryImg: false
					}))
				}

			}else{
				gameOver()
			}	
		}

		
	if (((pleft < e6right) && (pright > e6left) && (pbottom > e6top) && (ptop < e6bottom)) ) {
					
				faceFxn()
				if(emoji.happyFace){
					if (emojis.happyEmoji == 0) 
					{
						var score = parseInt(localStorage.getItem('score'))
						var updatedScore = score+3
						localStorage.setItem("score",updatedScore);
						setEmojis(prevState => ({
							...prevState, happyEmoji: 1
						}))
						setImg(prevData => ({
							...prevData, 
							happyImg: true,
							surprisedImg: false,
							angryImg: false
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

		// emoji3

		if (((pleft < e3right) && (pright > e3left) && (pbottom > e3top) && (ptop < e3bottom)) ) {
			
			faceFxn()
			if(emoji.angryFace){
				if (emojis.angryEmoji == 0) 
				{
					var score3 = parseInt(localStorage.getItem('score'))
					var updatedScore3 = score3+3
					localStorage.setItem("score",updatedScore3);
					setEmojis(prevState => ({
						...prevState, angryEmoji: 1
					}))
					setImg(prevData => ({
						...prevData, 
						happyImg: false,
						surprisedImg: false,
						angryImg: true
					}))
				}

			}else{
				gameOver()
			}

		}

		if (((pleft < e7right) && (pright > e7left) && (pbottom > e7top) && (ptop < e7bottom)) ) {
			
			faceFxn()
			if(emoji.angryFace){
				if (emojis.angryEmoji == 0) 
				{
					var score3 = parseInt(localStorage.getItem('score'))
					var updatedScore3 = score3+3
					localStorage.setItem("score",updatedScore3);
					setEmojis(prevState => ({
						...prevState, angryEmoji: 1
					}))
					setImg(prevData => ({
						...prevData, 
						happyImg: false,
						surprisedImg: false,
						angryImg: true
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

					<img 
					style={{
						height: 'auto',
						width: '100%',
						position: 'absolute',
						display: 'flex',
						zIndex: 1000,
					}} 
					src={topbar} />

					{
						(img.happyImg || img.surprisedImg || img.angryImg)?
						<img className='scoreImg' src={score3}/>
						:
						null
					}


{/* {
						(img.surprisedImg)?
						<img className='scoreImg' src={score2}/>
						:
						null
					}

{
						(img.angryImg)?
						<img className='scoreImg'src={score3} />
						:
						null
					} */}
					
				
				{/* <Link to='/home' className="back_btn"
				 onClick={stopVideo}
				>
					<IconButton style={{position: 'relative'}} aria-label="delete" >
						<ArrowBackIosRoundedIcon fontSize="small" style={{ color: "#fff" }} />
					</IconButton>
				</Link> */}
				<div style={{
					display: 'flex'
				}}>
		<h2  style={{
					position: 'absolute',
					zIndex: 1001, 
					left: 10,
					fontSize: 26,
					color: '#fff',
					marginTop : 15,
					marginLeft: 15
					}} >
						TIME
						</h2>
				<BorderLinearProgress className="right" style={{
					width: 200,
					marginLeft: 15,
					marginTop: 10
				}} 
				variant="determinate" value={progress} />
				
				 <div style={{
					 textAlign: 'end'
				 }}>

			
				<h2 style={{
					position: 'absolute',
					zIndex: 1001, 
					right: 10,
					fontSize: 26,
					color: '#fff',
					marginRight: 15
					}} 
					 >
					 SCORE <br/> 
					 <h2 style={{
						 		 marginTop : 0,
						 color: '#fff',
						 fontSize: 45
					 }}>{localStorage.getItem('score')}</h2>
					 
					</h2>
					</div>
					</div>
				<audio className="audio-element">
					<source src={audio} />
				</audio>
					<video
						id='video1'
						playsInline
						muted
						autoPlay
						className="app__videoFeed"
						style={{
							position: 'absolute'
						}}
					/>
				<div className='container'>
					<div className='emoji_bar'>
						<div id='endDivConatainer'>
						<div id='endDiv' className="emoji1" />
						</div>
						<div id='startDiv' className="emoji2"/>
						<div className='motionDiv'>
						<motion.div
							initial={{ x: 500 }}
							animate={{ x: -1500 }}
							transition={{ ease: "linear", duration: timerAnimation, repeat: Infinity }}
						>
							<img id='div2' src={happy} className="emoji"  style={{marginRight:80}} />
							<img id='div3' src={surprise} className="emoji"  style={{marginRight:80}}/>
							<img id='div5' src={happy} className="emoji"  style={{marginRight:100}} />
							<img id='div4' src={angry} className="emoji" style={{marginRight:180}} />
							<img id='div6' src={surprise} className="emoji"  style={{marginRight:80}}/>
							<img id='div7' src={happy} className="emoji"  style={{marginRight:110}} />
							<img id='div8' src={angry} className="emoji" style={{marginRight:170}} />
						</motion.div>
						</div>
					</div>
			
				</div>
				<img className="footer" src={footer} />
			</div>
		</div>
	);
}

export default Play;