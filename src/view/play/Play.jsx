import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import useSound from 'use-sound';
import footer from '../../assets/Top & Bottom Bars/BottomBar.png';
import LinearProgress from '@material-ui/core/LinearProgress';
import ReactAudioPlayer from 'react-audio-player';
import { withStyles } from '@material-ui/core/styles';
import topbar from '../../assets/Top & Bottom Bars/TopBarOg.png'
import happy from '../../assets/Emojis/HappyEmoji.png';
import angry from '../../assets/Emojis/AngryEmoji.png';
import surprise from '../../assets/Emojis/SurprisedEmoji.png';
import score0 from '../../assets/Scores/ScoreZero.png';
import score1 from '../../assets/Scores/ScoreOkay+1.png';
import score2 from '../../assets/Scores/ScoreGreat+2.png';
import score3 from '../../assets/Scores/ScorePerfect+3.png';
import score0Sound from '../../assets/sound/score0.mp3';
import score1Sound from '../../assets/sound/score1.mp3';
import score2Sound from '../../assets/sound/score2.mp3';
import score3Sound from '../../assets/sound/score3.mp3';
import gamesong from '../../assets/sound/gamesong.mp3'
import { motion } from 'framer-motion';
import { setHighScore, setScores } from '../../store/profile';
import * as faceapi from "face-api.js"
import '../../assets/css/style.css'
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
	const [play] = useSound(gamesong)
	const emoji = useSelector(state => state.emoji)
	const [scoreImgZero, setScoreImgZero] = useState(false)
	const [progress, setProgress] = useState(0);
	const [scoreImg, setScoreImg] = useState([happy])
	const [scoreImg1, setScoreImg1] = useState([angry])
	const [scoreImg2, setScoreImg2] = useState([surprise])

	const [img, setImg] = useState({
		happyImg30: false,
		surprisedImg30: false,
		angryImg30: false,
		happyImg50: false,
		surprisedImg50: false,
		angryImg50: false,
		happyImg70: false,
		surprisedImg70: false,
		angryImg70: false
	})
	const timerAnimation = 10
	const [emojis, setEmojis] = useState({
		happyEmoji: 0,
		surprisedEmoji: 0,
		sadEmoji: 0,
		angryEmoji: 0,
	})
	const loop = [1]
	const randomData = [happy, angry, surprise]
	const randomData1 = [happy, angry, surprise]
	const randomData2 = [happy, angry, surprise]


	const [percentage, setPercentage] = useState({
		happy30: false,
		angry30: false,
		surprised30: false,
		happy50: false,
		angry50: false,
		surprised50: false,
		happy70: false,
		angry70: false,
		surprised70: false,
	})

	const [score0audio] = useSound(score0Sound);
	const [score1audio] = useSound(score1Sound);
	const [score2audio] = useSound(score2Sound);
	const [score3audio] = useSound(score3Sound);

	const video1 = document.getElementById('video1')

	useEffect(() => {

		const interval = setInterval(() => {
			const randomArray = Math.floor(Math.random() * randomData.length);
			const randomArray1 = Math.floor(Math.random() * randomData1.length);
			const randomArray2 = Math.floor(Math.random() * randomData2.length);
			setScoreImg(randomData[randomArray])
			setScoreImg1(randomData1[randomArray1])
			setScoreImg2(randomData2[randomArray2])
		}, 10000);

		return () => clearInterval(interval);
	}, [])

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

		localStorage.setItem('score', 0)

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

		startVideo()

		const timer = setInterval(() => {

			setProgress((oldProgress) => {
				if (oldProgress === 100) {
					gameOver()
					return 0;
				}
				const diff = Math.random() * 1;
				return Math.min(oldProgress + diff, 100);
			});
		}, 500);
		return () => {
			clearInterval(timer);
		};

	}, []);

	const scoreAudio0 = () => {
		score0audio()
		return
	}


	const stopVideo = () => {
		let video = document.getElementsByClassName('app__videoFeed')[0];
		video.srcObject.getTracks().forEach((track) => track.stop());
	};

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

		dispatch(setScores(score4))
		stopVideo()
		history.push('/gameover')
	}

	function faceFxn() {
		if (emojis.surprisedEmoji == 0 || emojis.happyEmoji == 0 || emojis.angryEmoji == 0) {
			if (video1) {
				// const canvas = faceapi.createCanvasFromMedia(video1)
				// document.body.append(canvas)
				// const displaySize = { width: video1.width, height: video1.height }
				// faceapi.matchDimensions(canvas, displaySize)

				const faceApi = async () => {
					try {
						const detections = await faceapi.detectAllFaces(video1, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
						if (detections[0].expressions.happy >= 0.3 && detections[0].expressions.happy <= 0.5) {
							// dispatch(setHappyFace(true))
							setPercentage((prevState) => ({
								...prevState, happy30: true
							}))
						} else if (detections[0].expressions.angry >= 0.3 && detections[0].expressions.angry <= 0.5) {
							// dispatch(setAngryFace(true))
							setPercentage((prevState) => ({
								...prevState, angry30: true
							}))
						} else if (detections[0].expressions.surpised >= 0.3 && detections[0].expressions.surpised <= 0.5) {
							// dispatch(setSurprisedFace(true))
							setPercentage((prevState) => ({
								...prevState, surprised0: true
							}))
						} else if (detections[0].expressions.happy >= 0.5 && detections[0].expressions.happy <= 0.7) {
							// dispatch(setHappyFace(true))
							setPercentage((prevState) => ({
								...prevState, happy50: true
							}))
						} else if (detections[0].expressions.angry >= 0.5 && detections[0].expressions.angry <= 0.7) {
							// dispatch(setAngryFace(true))
							setPercentage((prevState) => ({
								...prevState, angry50: true
							}))
						} else if (detections[0].expressions.surpised >= 0.5 && detections[0].expressions.surpised <= 0.7) {
							// dispatch(setSurprisedFace(true))
							setPercentage((prevState) => ({
								...prevState, surprised50: true
							}))
						} else if (detections[0].expressions.happy >= 0.7) {
							// dispatch(setHappyFace(true))
							setPercentage((prevState) => ({
								...prevState, happy70: true
							}))
						} else if (detections[0].expressions.angry >= 0.7) {
							// dispatch(setAngryFace(true))
							setPercentage((prevState) => ({
								...prevState, angry70: true
							}))
						} else if (detections[0].expressions.surpised >= 0.7) {
							// dispatch(setSurprisedFace(true))
							setPercentage((prevState) => ({
								...prevState, surprised70: true
							}))
						} else {
							setScoreImgZero(false)
						}
						//  else if (detections[0].expressions.sad >= 0.8) {
						// 	console.log('sad face')
						// 	dispatch(setSadFace(true))
						// }

					} catch (err) {
					}
					// canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
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

		//starting div

		if (((sleft < e1right) && (sright > e1left) && (sbottom > e1top) && (stop < e1bottom)) ||
			((sleft < e2right) && (sright > e2left) && (sbottom > e2top) && (stop < e2bottom)) ||
			((sleft < e3right) && (sright > e3left) && (sbottom > e3top) && (stop < e3bottom)) ||
			((sleft < e4right) && (sright > e4left) && (sbottom > e4top) && (stop < e4bottom)) ||
			((sleft < e5right) && (sright > e5left) && (sbottom > e5top) && (stop < e5bottom))
		) {
			dispatch(setSurprisedFace(false))
			dispatch(setHappyFace(false))
			dispatch(setAngryFace(false))
			dispatch(setSadFace(false))
			setImg(prevData => ({
				...prevData,
				happyImg30: false,
				surprisedImg30: false,
				angryImg30: false,
				happyImg50: false,
				surprisedImg50: false,
				angryImg50: false,
				happyImg70: false,
				surprisedImg70: false,
				angryImg70: false
			}))
			setEmojis(prevState => ({
				...prevState,
				happyEmoji: 0,
				surprisedEmoji: 0,
				angryEmoji: 0
			}))

			setPercentage((prevState) => ({
				...prevState,
				happy30: false,
				angry30: false,
				surprised30: false,
				happy50: false,
				angry50: false,
				surprised50: false,
				happy70: false,
				angry70: false,
				surprised70: false,
			}))

			// setScoreZero(true)
			setScoreImgZero(false)
			// }
		}

		// emoji1
		if (((pleft < e1right) && (pright > e1left) && (pbottom > e1top) && (ptop < e1bottom))) {
			faceFxn()
			//FOR SCORE PERCENTAGE 30 
			if (scoreImg === happy) {
				if (percentage.happy30) {
					if (emojis.happyEmoji == 0) {

						var score = parseInt(localStorage.getItem('score'))
						var updatedScore = score + 1
						localStorage.setItem("score", updatedScore);
						setEmojis(prevState => ({
							...prevState, happyEmoji: 1
						}))

						setImg(prevData => ({
							...prevData,
							happyImg30: true,
						}))
					}
				} else {
					setScoreImgZero(true)
				}
			}

			if (scoreImg === surprise) {
				if (percentage.surprised30) {
					if (emojis.surprisedEmoji == 0) {

						var score2 = parseInt(localStorage.getItem('score'))
						var updatedScore2 = score2 + 1
						localStorage.setItem("score", updatedScore2);

						setEmojis(prevState => ({
							...prevState, surprisedEmoji: 1
						}))
						setImg(prevData => ({
							...prevData,
							surprisedImg30: true,
						}))
					}

				} else {
					setScoreImgZero(true)
				}
			}

			if (scoreImg === angry) {
				if (percentage.angry30) {
					if (emojis.angryEmoji == 0) {

						var score3 = parseInt(localStorage.getItem('score'))
						var updatedScore3 = score3 + 1
						localStorage.setItem("score", updatedScore3);
						setEmojis(prevState => ({
							...prevState, angryEmoji: 1
						}))
						setImg(prevData => ({
							...prevData,
							angryImg30: true
						}))
					}

				} else {
					setScoreImgZero(true)
				}
			}

			// FOR SCORE PERCENTAGE 50

			if (scoreImg === happy) {
				if (percentage.happy50) {
					if (emojis.happyEmoji == 0) {

						var score = parseInt(localStorage.getItem('score'))
						var updatedScore = score + 2
						localStorage.setItem("score", updatedScore);
						setEmojis(prevState => ({
							...prevState, happyEmoji: 1
						}))

						setImg(prevData => ({
							...prevData,
							happyImg50: true,
						}))
					}
				} else {
					setScoreImgZero(true)
				}
			}

			if (scoreImg === surprise) {
				if (percentage.surprised50) {
					if (emojis.surprisedEmoji == 0) {

						var score2 = parseInt(localStorage.getItem('score'))
						var updatedScore2 = score2 + 2
						localStorage.setItem("score", updatedScore2);

						setEmojis(prevState => ({
							...prevState, surprisedEmoji: 1
						}))
						setImg(prevData => ({
							...prevData,
							surprisedImg50: true,
						}))
					}

				} else {
					setScoreImgZero(true)
				}
			}

			if (scoreImg === angry) {
				if (percentage.angry50) {
					if (emojis.angryEmoji == 0) {

						var score3 = parseInt(localStorage.getItem('score'))
						var updatedScore3 = score3 + 2
						localStorage.setItem("score", updatedScore3);
						setEmojis(prevState => ({
							...prevState, angryEmoji: 1
						}))
						setImg(prevData => ({
							...prevData,
							angryImg50: true
						}))
					}

				} else {
					setScoreImgZero(true)
				}
			}

			//FOR SCORE PERCENTAGE 70

			if (scoreImg === happy) {
				if (percentage.happy70) {
					if (emojis.happyEmoji == 0) {

						var score = parseInt(localStorage.getItem('score'))
						var updatedScore = score + 3
						localStorage.setItem("score", updatedScore);
						setEmojis(prevState => ({
							...prevState, happyEmoji: 1
						}))

						setImg(prevData => ({
							...prevData,
							happyImg70: true,
						}))
					}
				} else {
					setScoreImgZero(true)
				}
			}

			if (scoreImg === surprise) {
				if (percentage.surprised70) {
					if (emojis.surprisedEmoji == 0) {

						var score2 = parseInt(localStorage.getItem('score'))
						var updatedScore2 = score2 + 3
						localStorage.setItem("score", updatedScore2);

						setEmojis(prevState => ({
							...prevState, surprisedEmoji: 1
						}))
						setImg(prevData => ({
							...prevData,
							surprisedImg70: true,
						}))
					}

				} else {
					setScoreImgZero(true)
				}
			}

			if (scoreImg === angry) {
				if (percentage.angry70) {
					if (emojis.angryEmoji == 0) {

						var score3 = parseInt(localStorage.getItem('score'))
						var updatedScore3 = score3 + 3
						localStorage.setItem("score", updatedScore3);
						setEmojis(prevState => ({
							...prevState, angryEmoji: 1
						}))
						setImg(prevData => ({
							...prevData,
							angryImg70: true
						}))
					}

				}
			} else {
				setScoreImgZero(true)
			}

		} else {
			setScoreImgZero(false)

		}

		if (((pleft < e2right) && (pright > e2left) && (pbottom > e2top) && (ptop < e2bottom))) {

			faceFxn()
			//FOR SCORE PERCENTAGE 30 
			if (scoreImg === happy) {
				if (percentage.happy30) {
					if (emojis.happyEmoji == 0) {

						var score = parseInt(localStorage.getItem('score'))
						var updatedScore = score + 1
						localStorage.setItem("score", updatedScore);
						setEmojis(prevState => ({
							...prevState, happyEmoji: 1
						}))

						setImg(prevData => ({
							...prevData,
							happyImg30: true,
						}))
					}
				} else {
					setScoreImgZero(true)
				}
			}

			if (scoreImg === surprise) {
				if (percentage.surprised30) {
					if (emojis.surprisedEmoji == 0) {

						var score2 = parseInt(localStorage.getItem('score'))
						var updatedScore2 = score2 + 1
						localStorage.setItem("score", updatedScore2);

						setEmojis(prevState => ({
							...prevState, surprisedEmoji: 1
						}))
						setImg(prevData => ({
							...prevData,
							surprisedImg30: true,
						}))
					}

				} else {
					setScoreImgZero(true)
				}
			}

			if (scoreImg === angry) {
				if (percentage.angry30) {
					if (emojis.angryEmoji == 0) {

						var score3 = parseInt(localStorage.getItem('score'))
						var updatedScore3 = score3 + 1
						localStorage.setItem("score", updatedScore3);
						setEmojis(prevState => ({
							...prevState, angryEmoji: 1
						}))
						setImg(prevData => ({
							...prevData,
							angryImg30: true
						}))
					}

				} else {
					setScoreImgZero(true)
				}
			}

			// FOR SCORE PERCENTAGE 50

			if (scoreImg === happy) {
				if (percentage.happy50) {
					if (emojis.happyEmoji == 0) {

						var score = parseInt(localStorage.getItem('score'))
						var updatedScore = score + 2
						localStorage.setItem("score", updatedScore);
						setEmojis(prevState => ({
							...prevState, happyEmoji: 1
						}))

						setImg(prevData => ({
							...prevData,
							happyImg50: true,
						}))
					}
				} else {
					setScoreImgZero(true)
				}
			}

			if (scoreImg === surprise) {
				if (percentage.surprised50) {
					if (emojis.surprisedEmoji == 0) {
						var score2 = parseInt(localStorage.getItem('score'))
						var updatedScore2 = score2 + 2
						localStorage.setItem("score", updatedScore2);

						setEmojis(prevState => ({
							...prevState, surprisedEmoji: 1
						}))
						setImg(prevData => ({
							...prevData,
							surprisedImg50: true,
						}))
					}

				} else {
					setScoreImgZero(true)
				}
			}

			if (scoreImg === angry) {
				if (percentage.angry50) {
					if (emojis.angryEmoji == 0) {

						var score3 = parseInt(localStorage.getItem('score'))
						var updatedScore3 = score3 + 2
						localStorage.setItem("score", updatedScore3);
						setEmojis(prevState => ({
							...prevState, angryEmoji: 1
						}))
						setImg(prevData => ({
							...prevData,
							angryImg50: true
						}))
					}

				} else {
					setScoreImgZero(true)
				}
			}

			//FOR SCORE PERCENTAGE 70

			if (scoreImg === happy) {
				if (percentage.happy70) {
					if (emojis.happyEmoji == 0) {

						var score = parseInt(localStorage.getItem('score'))
						var updatedScore = score + 3
						localStorage.setItem("score", updatedScore);
						setEmojis(prevState => ({
							...prevState, happyEmoji: 1
						}))

						setImg(prevData => ({
							...prevData,
							happyImg70: true,
						}))
					}
				} else {
					setScoreImgZero(true)
				}
			}

			if (scoreImg === surprise) {
				if (percentage.surprised70) {
					if (emojis.surprisedEmoji == 0) {

						var score2 = parseInt(localStorage.getItem('score'))
						var updatedScore2 = score2 + 3
						localStorage.setItem("score", updatedScore2);

						setEmojis(prevState => ({
							...prevState, surprisedEmoji: 1
						}))
						setImg(prevData => ({
							...prevData,
							surprisedImg70: true,
						}))
					}

				} else {
					setScoreImgZero(true)
				}
			}

			if (scoreImg === angry) {
				if (percentage.angry70) {
					if (emojis.angryEmoji == 0) {

						var score3 = parseInt(localStorage.getItem('score'))
						var updatedScore3 = score3 + 3
						localStorage.setItem("score", updatedScore3);
						setEmojis(prevState => ({
							...prevState, angryEmoji: 1
						}))
						setImg(prevData => ({
							...prevData,
							angryImg70: true
						}))
					}

				}
			} else {
				setScoreImgZero(true)
			}
		}

		//FOR SCORE IMAGE 2
		if (((pleft < e3right) && (pright > e3left) && (pbottom > e3top) && (ptop < e3bottom))) {

			faceFxn()
			//FOR SCORE PERCENTAGE 30 
			if (scoreImg === happy) {
				if (percentage.happy30) {
					if (emojis.happyEmoji == 0) {

						var score = parseInt(localStorage.getItem('score'))
						var updatedScore = score + 1
						localStorage.setItem("score", updatedScore);
						setEmojis(prevState => ({
							...prevState, happyEmoji: 1
						}))

						setImg(prevData => ({
							...prevData,
							happyImg30: true,
						}))
					}
				} else {
					setScoreImgZero(true)
				}
			}

			if (scoreImg === surprise) {
				if (percentage.surprised30) {
					if (emojis.surprisedEmoji == 0) {

						var score2 = parseInt(localStorage.getItem('score'))
						var updatedScore2 = score2 + 1
						localStorage.setItem("score", updatedScore2);

						setEmojis(prevState => ({
							...prevState, surprisedEmoji: 1
						}))
						setImg(prevData => ({
							...prevData,
							surprisedImg30: true,
						}))
					}

				} else {
					setScoreImgZero(true)
				}
			}

			if (scoreImg === angry) {
				if (percentage.angry30) {
					if (emojis.angryEmoji == 0) {

						var score3 = parseInt(localStorage.getItem('score'))
						var updatedScore3 = score3 + 1
						localStorage.setItem("score", updatedScore3);
						setEmojis(prevState => ({
							...prevState, angryEmoji: 1
						}))
						setImg(prevData => ({
							...prevData,
							angryImg30: true
						}))
					}

				} else {
					setScoreImgZero(true)
				}
			}

			// FOR SCORE PERCENTAGE 50

			if (scoreImg === happy) {
				if (percentage.happy50) {
					if (emojis.happyEmoji == 0) {

						var score = parseInt(localStorage.getItem('score'))
						var updatedScore = score + 2
						localStorage.setItem("score", updatedScore);
						setEmojis(prevState => ({
							...prevState, happyEmoji: 1
						}))

						setImg(prevData => ({
							...prevData,
							happyImg50: true,
						}))
					}
				} else {
					setScoreImgZero(true)
				}
			}

			if (scoreImg === surprise) {
				if (percentage.surprised50) {
					if (emojis.surprisedEmoji == 0) {

						var score2 = parseInt(localStorage.getItem('score'))
						var updatedScore2 = score2 + 2
						localStorage.setItem("score", updatedScore2);

						setEmojis(prevState => ({
							...prevState, surprisedEmoji: 1
						}))
						setImg(prevData => ({
							...prevData,
							surprisedImg50: true,
						}))
					}

				} else {
					setScoreImgZero(true)
				}
			}

			if (scoreImg === angry) {
				if (percentage.angry50) {
					if (emojis.angryEmoji == 0) {

						var score3 = parseInt(localStorage.getItem('score'))
						var updatedScore3 = score3 + 2
						localStorage.setItem("score", updatedScore3);
						setEmojis(prevState => ({
							...prevState, angryEmoji: 1
						}))
						setImg(prevData => ({
							...prevData,
							angryImg50: true
						}))
					}

				} else {
					setScoreImgZero(true)
				}
			}

			//FOR SCORE PERCENTAGE 70

			if (scoreImg === happy) {
				if (percentage.happy70) {
					if (emojis.happyEmoji == 0) {

						var score = parseInt(localStorage.getItem('score'))
						var updatedScore = score + 3
						localStorage.setItem("score", updatedScore);
						setEmojis(prevState => ({
							...prevState, happyEmoji: 1
						}))

						setImg(prevData => ({
							...prevData,
							happyImg70: true,
						}))
					}
				} else {
					setScoreImgZero(true)
				}
			}

			if (scoreImg === surprise) {
				if (percentage.surprised70) {
					if (emojis.surprisedEmoji == 0) {

						var score2 = parseInt(localStorage.getItem('score'))
						var updatedScore2 = score2 + 3
						localStorage.setItem("score", updatedScore2);

						setEmojis(prevState => ({
							...prevState, surprisedEmoji: 1
						}))
						setImg(prevData => ({
							...prevData,
							surprisedImg70: true,
						}))
					}

				} else {
					setScoreImgZero(true)
				}
			}

			if (scoreImg === angry) {
				if (percentage.angry70) {
					if (emojis.angryEmoji == 0) {

						var score3 = parseInt(localStorage.getItem('score'))
						var updatedScore3 = score3 + 3
						localStorage.setItem("score", updatedScore3);
						setEmojis(prevState => ({
							...prevState, angryEmoji: 1
						}))
						setImg(prevData => ({
							...prevData,
							angryImg70: true
						}))
					}

				}
			} else {
				setScoreImgZero(true)
			}

		}

		if (((pleft < e4right) && (pright > e4left) && (pbottom > e4top) && (ptop < e4bottom))) {

			faceFxn()
			//FOR SCORE PERCENTAGE 30 
			if (scoreImg === happy) {
				if (percentage.happy30) {
					if (emojis.happyEmoji == 0) {

						var score = parseInt(localStorage.getItem('score'))
						var updatedScore = score + 1
						localStorage.setItem("score", updatedScore);
						setEmojis(prevState => ({
							...prevState, happyEmoji: 1
						}))

						setImg(prevData => ({
							...prevData,
							happyImg30: true,
						}))
					}
				} else {
					setScoreImgZero(true)
				}
			}

			if (scoreImg === surprise) {
				if (percentage.surprised30) {
					if (emojis.surprisedEmoji == 0) {

						var score2 = parseInt(localStorage.getItem('score'))
						var updatedScore2 = score2 + 1
						localStorage.setItem("score", updatedScore2);

						setEmojis(prevState => ({
							...prevState, surprisedEmoji: 1
						}))
						setImg(prevData => ({
							...prevData,
							surprisedImg30: true,
						}))
					}

				} else {
					setScoreImgZero(true)
				}
			}

			if (scoreImg === angry) {
				if (percentage.angry30) {
					if (emojis.angryEmoji == 0) {

						var score3 = parseInt(localStorage.getItem('score'))
						var updatedScore3 = score3 + 1
						localStorage.setItem("score", updatedScore3);
						setEmojis(prevState => ({
							...prevState, angryEmoji: 1
						}))
						setImg(prevData => ({
							...prevData,
							angryImg30: true
						}))
					}

				} else {
					setScoreImgZero(true)
				}
			}

			// FOR SCORE PERCENTAGE 50

			if (scoreImg === happy) {
				if (percentage.happy50) {
					if (emojis.happyEmoji == 0) {

						var score = parseInt(localStorage.getItem('score'))
						var updatedScore = score + 2
						localStorage.setItem("score", updatedScore);
						setEmojis(prevState => ({
							...prevState, happyEmoji: 1
						}))

						setImg(prevData => ({
							...prevData,
							happyImg50: true,
						}))
					}
				} else {
					setScoreImgZero(true)
				}
			}

			if (scoreImg === surprise) {
				if (percentage.surprised50) {
					if (emojis.surprisedEmoji == 0) {

						var score2 = parseInt(localStorage.getItem('score'))
						var updatedScore2 = score2 + 2
						localStorage.setItem("score", updatedScore2);

						setEmojis(prevState => ({
							...prevState, surprisedEmoji: 1
						}))
						setImg(prevData => ({
							...prevData,
							surprisedImg50: true,
						}))
					}

				} else {
					setScoreImgZero(true)
				}
			}

			if (scoreImg === angry) {
				if (percentage.angry50) {
					if (emojis.angryEmoji == 0) {
						var score3 = parseInt(localStorage.getItem('score'))
						var updatedScore3 = score3 + 2
						localStorage.setItem("score", updatedScore3);
						setEmojis(prevState => ({
							...prevState, angryEmoji: 1
						}))
						setImg(prevData => ({
							...prevData,
							angryImg50: true
						}))
					}

				} else {
					setScoreImgZero(true)
				}
			}

			//FOR SCORE PERCENTAGE 70

			if (scoreImg === happy) {
				if (percentage.happy70) {
					if (emojis.happyEmoji == 0) {

						var score = parseInt(localStorage.getItem('score'))
						var updatedScore = score + 3
						localStorage.setItem("score", updatedScore);
						setEmojis(prevState => ({
							...prevState, happyEmoji: 1
						}))

						setImg(prevData => ({
							...prevData,
							happyImg70: true,
						}))
					}
				} else {
					setScoreImgZero(true)
				}
			}

			if (scoreImg === surprise) {
				if (percentage.surprised70) {
					if (emojis.surprisedEmoji == 0) {

						var score2 = parseInt(localStorage.getItem('score'))
						var updatedScore2 = score2 + 3
						localStorage.setItem("score", updatedScore2);

						setEmojis(prevState => ({
							...prevState, surprisedEmoji: 1
						}))
						setImg(prevData => ({
							...prevData,
							surprisedImg70: true,
						}))
					}

				} else {
					setScoreImgZero(true)
				}
			}

			if (scoreImg === angry) {
				if (percentage.angry70) {
					if (emojis.angryEmoji == 0) {

						var score3 = parseInt(localStorage.getItem('score'))
						var updatedScore3 = score3 + 3
						localStorage.setItem("score", updatedScore3);
						setEmojis(prevState => ({
							...prevState, angryEmoji: 1
						}))
						setImg(prevData => ({
							...prevData,
							angryImg70: true
						}))
					}

				}
			} else {
				setScoreImgZero(true)
			}
		}


		if (((pleft < e5right) && (pright > e5left) && (pbottom > e5top) && (ptop < e5bottom))) {

			faceFxn()
			//FOR SCORE PERCENTAGE 30 
			if (scoreImg === happy) {
				if (percentage.happy30) {
					if (emojis.happyEmoji == 0) {

						var score = parseInt(localStorage.getItem('score'))
						var updatedScore = score + 1
						localStorage.setItem("score", updatedScore);
						setEmojis(prevState => ({
							...prevState, happyEmoji: 1
						}))

						setImg(prevData => ({
							...prevData,
							happyImg30: true,
						}))
					}
				} else {
					setScoreImgZero(true)
				}
			}

			if (scoreImg === surprise) {
				if (percentage.surprised30) {
					if (emojis.surprisedEmoji == 0) {

						var score2 = parseInt(localStorage.getItem('score'))
						var updatedScore2 = score2 + 1
						localStorage.setItem("score", updatedScore2);

						setEmojis(prevState => ({
							...prevState, surprisedEmoji: 1
						}))
						setImg(prevData => ({
							...prevData,
							surprisedImg30: true,
						}))
					}

				} else {
					setScoreImgZero(true)
				}
			}

			if (scoreImg === angry) {
				if (percentage.angry30) {
					if (emojis.angryEmoji == 0) {

						var score3 = parseInt(localStorage.getItem('score'))
						var updatedScore3 = score3 + 1
						localStorage.setItem("score", updatedScore3);
						setEmojis(prevState => ({
							...prevState, angryEmoji: 1
						}))
						setImg(prevData => ({
							...prevData,
							angryImg30: true
						}))
					}

				} else {
					setScoreImgZero(true)
				}
			}

			// FOR SCORE PERCENTAGE 50

			if (scoreImg === happy) {
				if (percentage.happy50) {
					if (emojis.happyEmoji == 0) {

						var score = parseInt(localStorage.getItem('score'))
						var updatedScore = score + 2
						localStorage.setItem("score", updatedScore);
						setEmojis(prevState => ({
							...prevState, happyEmoji: 1
						}))

						setImg(prevData => ({
							...prevData,
							happyImg50: true,
						}))
					}
				} else {
					setScoreImgZero(true)
				}
			}

			if (scoreImg === surprise) {
				if (percentage.surprised50) {
					if (emojis.surprisedEmoji == 0) {

						var score2 = parseInt(localStorage.getItem('score'))
						var updatedScore2 = score2 + 2
						localStorage.setItem("score", updatedScore2);

						setEmojis(prevState => ({
							...prevState, surprisedEmoji: 1
						}))
						setImg(prevData => ({
							...prevData,
							surprisedImg50: true,
						}))
					}

				} else {
					setScoreImgZero(true)
				}
			}

			if (scoreImg === angry) {
				if (percentage.angry50) {
					if (emojis.angryEmoji == 0) {

						var score3 = parseInt(localStorage.getItem('score'))
						var updatedScore3 = score3 + 2
						localStorage.setItem("score", updatedScore3);
						setEmojis(prevState => ({
							...prevState, angryEmoji: 1
						}))
						setImg(prevData => ({
							...prevData,
							angryImg50: true
						}))
					}

				} else {
					setScoreImgZero(true)
				}
			}

			//FOR SCORE PERCENTAGE 70

			if (scoreImg === happy) {
				if (percentage.happy70) {
					if (emojis.happyEmoji == 0) {

						var score = parseInt(localStorage.getItem('score'))
						var updatedScore = score + 3
						localStorage.setItem("score", updatedScore);
						setEmojis(prevState => ({
							...prevState, happyEmoji: 1
						}))

						setImg(prevData => ({
							...prevData,
							happyImg70: true,
						}))
					}
				} else {
					setScoreImgZero(true)
				}
			}

			if (scoreImg === surprise) {
				if (percentage.surprised70) {
					if (emojis.surprisedEmoji == 0) {

						var score2 = parseInt(localStorage.getItem('score'))
						var updatedScore2 = score2 + 3
						localStorage.setItem("score", updatedScore2);

						setEmojis(prevState => ({
							...prevState, surprisedEmoji: 1
						}))
						setImg(prevData => ({
							...prevData,
							surprisedImg70: true,
						}))
					}

				} else {
					setScoreImgZero(true)
				}
			}

			if (scoreImg === angry) {
				if (percentage.angry70) {
					if (emojis.angryEmoji == 0) {

						var score3 = parseInt(localStorage.getItem('score'))
						var updatedScore3 = score3 + 3
						localStorage.setItem("score", updatedScore3);
						setEmojis(prevState => ({
							...prevState, angryEmoji: 1
						}))
						setImg(prevData => ({
							...prevData,
							angryImg70: true
						}))
					}

				} else {
					setScoreImgZero(true)
				}
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
					(scoreImgZero) ?
						<>
							<img className='scoreImg' src={score0} />
							{/* {score0audio()} */}
							<ReactAudioPlayer
								src={score0Sound}
								autoPlay
							/>
						</>
						:
						(img.happyImg30 || img.surprisedImg30 || img.angryImg30) ?
							<>
								<img className='scoreImg' src={score1} />
								<ReactAudioPlayer
								src={score1Sound}
								autoPlay
							/>
							</>
							:
							null
				}

				{
					(scoreImgZero) ?
						<>
							<img className='scoreImg' src={score0} />
							<ReactAudioPlayer
								src={score0Sound}
								autoPlay
							/>
						</>
						:
						(img.happyImg50 || img.surprisedImg50 || img.angryImg50) ?
							<>
								<img className='scoreImg' src={score2} />
								<ReactAudioPlayer
								src={score2Sound}
								autoPlay
							/>
							</>
							:
							null
				}

				{
					(scoreImgZero) ?
						<>
							<img className='scoreImg' src={score0} />
							<ReactAudioPlayer
								src={score0Sound}
								autoPlay
							/>
						</>
						:
						(img.happyImg70 || img.surprisedImg70 || img.angryImg70) ?
							<>
								<img className='scoreImg' src={score3} />
								<ReactAudioPlayer
								src={score3Sound}
								autoPlay
							/>
							</>
							:

							null
				}


				<div style={{
					display: 'flex'
				}}>
					<h2 style={{
						position: 'absolute',
						zIndex: 1001,
						left: 10,
						fontSize: 26,
						color: '#fff',
						marginTop: 15,
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
							SCORE <br />
							<h2 style={{
								marginTop: 0,
								color: '#fff',
								fontSize: 45
							}}>{localStorage.getItem('score')}</h2>

						</h2>
					</div>
				</div>
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
						<div id='startDiv' className="emoji2" />
						<div className='motionDiv'>
							<motion.div
								initial={{ x: 500 }}
								animate={{ x: -1500 }}
								transition={{ ease: "linear", duration: timerAnimation, repeat: Infinity }}
							>

								{
									loop && loop.map((l) => (
										<>
											<img id='div2' src={scoreImg} className="emoji" style={{ marginRight: 80 }} />
											<img id='div2' src={scoreImg} className="emoji" style={{ marginRight: 80 }} />
											<img id='div3' src={scoreImg1} className="emoji" style={{ marginRight: 80 }} />
											<img id='div4' src={scoreImg2} className="emoji" style={{ marginRight: 80 }} />
											<img id='div5' src={scoreImg2} className="emoji" style={{ marginRight: 80 }} />
											<img id='div6' src={scoreImg1} className="emoji" style={{ marginRight: 80 }} />
										</>
									)
									)
								}
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