import React from 'react';
import * as faceapi from "face-api.js"
import {useDispatch} from 'react-redux';
import {setHappyFace, setSadFace, setAngryFace, setSurprisedFace} from '../../store/emoji';

function Script() {
	const dispatch = useDispatch()
	const video1 = document.getElementById('video1')
	async function face() {

		await Promise.all([
			faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
			faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
			faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
			faceapi.nets.faceExpressionNet.loadFromUri('/models')
		]).then(startVideo).catch(error => {
			console.error(error)
		})
	}

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

	face();


	if (video1) {
		video1.addEventListener('play', () => {
			const canvas = faceapi.createCanvasFromMedia(video1)
			// document.body.append(canvas)
			const displaySize = { width: video1.width, height: video1.height }
			faceapi.matchDimensions(canvas, displaySize)
			setInterval(async () => {
				try {
					const detections = await faceapi.detectAllFaces(video1, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions()
					if (detections[0].expressions.happy >= 0.5) {
						console.log('happy face')
						// dispatch(setHappyFace(true))
					} else if (detections[0].expressions.angry >= 0.5) {
						console.log('angry face')
						// dispatch(setAngryFace(true))
					} else if (detections[0].expressions.surprised >= 0.5) {
						console.log('surprise face')
						// dispatch(setSurprisedFace(true))
					} else if (detections[0].expressions.sad >= 0.5) {
						console.log('sad face')
						// dispatch(setSadFace(true))
					} 
				} catch (err) {
					console.log(err)
				}



				// canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
			}, 100)
		})
	}
	else {
		console.log('error loading vdo')
	}

	return (
		<>
			<video
				id='video1'
				playsInline
				muted
				autoPlay
				className="app__videoFeed"
			/>
		</>
	);
}

export default Script;