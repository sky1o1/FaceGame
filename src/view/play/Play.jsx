import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'

function Play() {

	const startVideo = () => {
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
		<div className="app">
			<div className='container'>
				<video
					playsInline
					muted
					autoPlay
					resize
					stopVideo={true}
					className="app__videoFeed"
				/>
				<view className='viewText'>
					<button onClick={stopVideo}>
						<Link to='/home'>
							Stop
						</Link>
						</button>
				</view>
			</div>
		</div>
	);
}

export default Play;