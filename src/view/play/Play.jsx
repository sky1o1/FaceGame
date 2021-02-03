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
	const [progress, setProgress] = useState(0);
	const [points, setPoints] = useState(0)
	
	React.useEffect(() => {
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

	const startVideo = () => {
		async function getMedia() {
			let stream = null;
			const constraints = {
				audio: true,
				video: {
					frameRate: { ideal: 15, max: 20 },
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

	const stopVideo = () => {
		let video = document.getElementsByClassName('app__videoFeed')[0];
		video.srcObject.getTracks().forEach((track) => track.stop());
	};


	

const collision = () => {
	var div1Height = document.getElementById('div1').getBoundingClientRect().height
	var div1Width = document.getElementById('div1').getBoundingClientRect().width
	var div1Top = document.getElementById('div1').getBoundingClientRect().top
	var div1Left = document.getElementById('div1').getBoundingClientRect().left

	var div2Height = document.getElementById('div2').getBoundingClientRect().height
	var div2Width = document.getElementById('div2').getBoundingClientRect().width
	var div2Top = document.getElementById('div2').getBoundingClientRect().top
	var div2Left = document.getElementById('div2').getBoundingClientRect().left

	// var div3Height = document.getElementById('div3').getBoundingClientRect().height
	// var div3Width = document.getElementById('div3').getBoundingClientRect().width
	// var div3Top = document.getElementById('div3').getBoundingClientRect().top
	// var div3Left = document.getElementById('div3').getBoundingClientRect().left

	// var div4Height = document.getElementById('div4').getBoundingClientRect().height
	// var div4Width = document.getElementById('div4').getBoundingClientRect().width
	// var div4Top = document.getElementById('div4').getBoundingClientRect().top
	// var div4Left = document.getElementById('div4').getBoundingClientRect().left

	// var div5Height = document.getElementById('div5').getBoundingClientRect().height
	// var div5Width = document.getElementById('div5').getBoundingClientRect().width
	// var div5Top = document.getElementById('div5').getBoundingClientRect().top
	// var div5Left = document.getElementById('div5').getBoundingClientRect().left

	// var div6Height = document.getElementById('div6').getBoundingClientRect().height
	// var div6Width = document.getElementById('div6').getBoundingClientRect().width
	// var div6Top = document.getElementById('div6').getBoundingClientRect().top
	// var div6Left = document.getElementById('div6').getBoundingClientRect().left

	// var div7Height = document.getElementById('div7').getBoundingClientRect().height
	// var div7Width = document.getElementById('div7').getBoundingClientRect().width
	// var div7Top = document.getElementById('div7').getBoundingClientRect().top
	// var div7Left = document.getElementById('div7').getBoundingClientRect().left


	  
	if (div1Left < (div2Left + div2Width)  && (div1Left + div1Width)  > div2Left &&
		div1Top < (div2Top + div2Height) && (div1Top + div1Height) > div2Top) {
			setPoints(points + 1)	
  }

//   if (div1Left < (div3Left + div3Width)  && (div1Left + div1Width)  > div3Left &&
// 	div1Top < (div3Top + div3Height) && (div1Top + div1Height) > div3Top) {
// 		setPoints(points + 2)
// }



// if (div1Left < (div4Left + div4Width ) && (div1Left + div1Width)  > div4Left &&
// 	div1Top < (div4Top + div4Height) && (div1Top + div1Height) > div4Top) {
// 		setPoints(points + 3)
		
// }


// if (div1Left < (div5Left + div5Width)  && (div1Left + div1Width)  > div5Left &&
// 	div1Top < (div5Top + div5Height) && (div1Top + div1Height) > div5Top) {
// 		setPoints(points + 4)
		
// }


// if (div1Left < (div6Left + div6Width)  && (div1Left + div1Width)  > div6Left &&
// 	div1Top < (div6Top + div6Height) && (div1Top + div1Height) > div6Top) {
// 		setPoints(points + 5)
		
// }


// if (div1Left < (div7Left + div7Width)  && (div1Left + div1Width)  > div7Left &&
// 	div1Top < (div7Top + div7Height) && (div1Top + div1Height) > div7Top) {
// 		setPoints(points + 6)
// }



	// var pbottom = document.getElementById('div1').getBoundingClientRect().bottom
	// var pright = document.getElementById('div1').getBoundingClientRect().right
	// var ptop = document.getElementById('div1').getBoundingClientRect().top
	// var pleft = document.getElementById('div1').getBoundingClientRect().left

	// var pcbottom = document.getElementById('div2').getBoundingClientRect().bottom
	// var pcright = document.getElementById('div2').getBoundingClientRect().right
	// var pctop = document.getElementById('div2').getBoundingClientRect().top
	// var pcleft = document.getElementById('div2').getBoundingClientRect().left

	// if(((pleft < pcright) && (pright > pcleft) && (pbottom > pctop) && (ptop < pcbottom)))
    //  {      
    //     console.log(' collision')
	//   }
	//   else{
	// 	console.log('no collision')
	//   }

}
	
useEffect(() => {
	startVideo();
}, [])

useEffect(() => {
	collision();
}, [])


console.log(points)


	return (

		<div className="App HomeBody">

			<div class='box'>

				<Link to='/home' className="back_btn" onClick={stopVideo}>
					<IconButton aria-label="delete" >
						<ArrowBackIosRoundedIcon fontSize="small" style={{ color: "#fff" }} />
					</IconButton>
				</Link>

				<BorderLinearProgress className="right" variant="determinate" value={progress} />

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

						<div id='div1' className="emoji1" />
						<div 
						//  ref={el => {
						// 	if (!el) return;
						// 		var height =el.getBoundingClientRect().height
						// 		console.log(div1.height);
						// 	}}
						 className="slider">
							<img id='div2' src={emoji1} className="emoji" />
							{/* <img id='div3' src={emoji2} className="emoji" />
							<img id='div4' src={emoji3} className="emoji" />
							<img id='div5' src={emoji4} className="emoji" />
							<img id='div6' src={emoji5} className="emoji" />
							<img id='div7' src={emoji6} className="emoji" /> */}
						</div>


					</div>
				</div>
				<img className="footer" src={footer} />

			</div>



		</div>
	);
}

export default Play;