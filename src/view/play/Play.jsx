import React, { useState, useEffect } from 'react';

function Play() {
	const [playing, setPlaying] = useState(false);

	const startVideo = () => {
		setPlaying(true);
		navigator.getUserMedia(
			{
				video: true,
			},
			(stream) => {
				let video = document.getElementsByClassName('app__videoFeed')[0];
				if (video) {
					video.srcObject = stream;
				}
			},
			(err) => console.error(err)
		);
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
					<h1>Test</h1>
				</view>
		
			</div>
		</div>
	);
}

export default Play;