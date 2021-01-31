import React, { useState, useEffect } from 'react';

function Play() {
	const [playing, setPlaying] = useState(false);

	const startVideo = () => {
		setPlaying(true);
		// navigator.getUserMedia(
		// 	{
		// 		video: true,
		// 	},
		// 	(stream) => {
		// 		let video = document.getElementsByClassName('app__videoFeed')[0];
		// 		if (video) {
		// 			video.srcObject = stream;
		// 		}
		// 	},
		// 	(err) => console.error(err)
		// );
		var constraints = { audio: true, video: true }
		async function getMedia(constraints) {
			let stream = null;
		  
			try {
			  stream = await navigator.mediaDevices.getUserMedia({audio: true, video: true});
			  /* use the stream */
			  let video = document.getElementsByClassName('app__videoFeed')[0];
				if (video) {
					video.srcObject = stream;
					console.log('video available')
				}
			} catch(err) {
			  /* handle the error */
			  console.log(err)
			}
		  }
		  getMedia()
	};

	const stopVideo = () => {
		setPlaying(false);
		let video = document.getElementsByClassName('app__videoFeed')[0];
		video.srcObject.getTracks()[0].stop();
	};

	useEffect(() => {
		startVideo();
	}, [])

	return (
		<div className="app">
			<div className='container' style={{ 
				textAlign: 'center',
			 alignItems: 'center', 
			  boxSizing: 'border-box',
				height: '100%',
				overflow: 'hidden',
				width: '100%', }}>
				<video
					playsInline
					fluid={false}
					muted
					autoPlay
					
					style={{ 
						// aspectRatio: 1 / 2, 
						height: '100%',
						overflow: 'hidden',
						maxWidth: '100%'
					}}
					className="app__videoFeed"
				></video>
				<view
				style={{flex: 1}}
				>
					<button onClick={stopVideo}>Stop</button>
				</view>
		
			</div>
		</div>
	);
}

export default Play;