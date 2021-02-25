// import React, {forwardRef} from 'react';


// export default Collision = forwardRef((props, ref) => {
//     const collision = () => {
// 		var sbottom = document.getElementById('startDiv').getBoundingClientRect().bottom
// 		var sright = document.getElementById('startDiv').getBoundingClientRect().right
// 		var stop = document.getElementById('startDiv').getBoundingClientRect().top
// 		var sleft = document.getElementById('startDiv').getBoundingClientRect().left

// 		var pbottom = document.getElementById('endDiv').getBoundingClientRect().bottom
// 		var pright = document.getElementById('endDiv').getBoundingClientRect().right
// 		var ptop = document.getElementById('endDiv').getBoundingClientRect().top
// 		var pleft = document.getElementById('endDiv').getBoundingClientRect().left

// 		var e1bottom = document.getElementById('div2').getBoundingClientRect().bottom
// 		var e1right = document.getElementById('div2').getBoundingClientRect().right
// 		var e1top = document.getElementById('div2').getBoundingClientRect().top
// 		var e1left = document.getElementById('div2').getBoundingClientRect().left

// 		var e2bottom = document.getElementById('div3').getBoundingClientRect().bottom
// 		var e2right = document.getElementById('div3').getBoundingClientRect().right
// 		var e2top = document.getElementById('div3').getBoundingClientRect().top
// 		var e2left = document.getElementById('div3').getBoundingClientRect().left

// 		var e3bottom = document.getElementById('div4').getBoundingClientRect().bottom
// 		var e3right = document.getElementById('div4').getBoundingClientRect().right
// 		var e3top = document.getElementById('div4').getBoundingClientRect().top
// 		var e3left = document.getElementById('div4').getBoundingClientRect().left

// 		var e4bottom = document.getElementById('div5').getBoundingClientRect().bottom
// 		var e4right = document.getElementById('div5').getBoundingClientRect().right
// 		var e4top = document.getElementById('div5').getBoundingClientRect().top
// 		var e4left = document.getElementById('div5').getBoundingClientRect().left

// 		var e5bottom = document.getElementById('div6').getBoundingClientRect().bottom
// 		var e5right = document.getElementById('div6').getBoundingClientRect().right
// 		var e5top = document.getElementById('div6').getBoundingClientRect().top
// 		var e5left = document.getElementById('div6').getBoundingClientRect().left

// 		//starting div

// 		if (((sleft < e1right) && (sright > e1left) && (sbottom > e1top) && (stop < e1bottom)) ||
// 			((sleft < e2right) && (sright > e2left) && (sbottom > e2top) && (stop < e2bottom)) ||
// 			((sleft < e3right) && (sright > e3left) && (sbottom > e3top) && (stop < e3bottom)) ||
// 			((sleft < e4right) && (sright > e4left) && (sbottom > e4top) && (stop < e4bottom)) ||
// 			((sleft < e5right) && (sright > e5left) && (sbottom > e5top) && (stop < e5bottom))
// 		) {
// 			dispatch(setSurprisedFace(false))
// 			dispatch(setHappyFace(false))
// 			dispatch(setAngryFace(false))
// 			dispatch(setSadFace(false))
// 			setImg(prevData => ({
// 				...prevData,
// 				happyImg30: false,
// 				surprisedImg30: false,
// 				angryImg30: false,
// 				happyImg50: false,
// 				surprisedImg50: false,
// 				angryImg50: false,
// 				happyImg70: false,
// 				surprisedImg70: false,
// 				angryImg70: false
// 			}))
// 			setEmojis(prevState => ({
// 				...prevState,
// 				happyEmoji: 0,
// 				surprisedEmoji: 0,
// 				angryEmoji: 0
// 			}))

// 			setPercentage((prevState) => ({
// 				...prevState,
// 				happy30: false,
// 				angry30: false,
// 				surprised30: false,
// 				happy50: false,
// 				angry50: false,
// 				surprised50: false,
// 				happy70: false,
// 				angry70: false,
// 				surprised70: false,
// 			}))
// 			// }
// 		}

// 		// emoji1
// 		if (((pleft < e1right) && (pright > e1left) && (pbottom > e1top) && (ptop < e1bottom))) {
// 			faceFxn()
// 			//FOR SCORE PERCENTAGE 30 
// 			if (scoreImg === happy) {
// 				if (percentage.happy30) {
// 					if (emojis.happyEmoji == 0) {
// 						var score = parseInt(localStorage.getItem('score'))
// 						var updatedScore = score + 1
// 						localStorage.setItem("score", updatedScore);
// 						setEmojis(prevState => ({
// 							...prevState, happyEmoji: 1
// 						}))

// 						setImg(prevData => ({
// 							...prevData,
// 							happyImg30: true,
// 						}))
// 					}
// 				}
// 			}

// 			if (scoreImg === surprise) {
// 				if (percentage.surprised30) {
// 					if (emojis.surprisedEmoji == 0) {
// 						var score2 = parseInt(localStorage.getItem('score'))
// 						var updatedScore2 = score2 + 1
// 						localStorage.setItem("score", updatedScore2);

// 						setEmojis(prevState => ({
// 							...prevState, surprisedEmoji: 1
// 						}))
// 						setImg(prevData => ({
// 							...prevData,
// 							surprisedImg30: true,
// 						}))
// 					}

// 				}
// 			}

// 			if (scoreImg === angry) {
// 				if (percentage.angry30) {
// 					if (emojis.angryEmoji == 0) {
// 						var score3 = parseInt(localStorage.getItem('score'))
// 						var updatedScore3 = score3 + 1
// 						localStorage.setItem("score", updatedScore3);
// 						setEmojis(prevState => ({
// 							...prevState, angryEmoji: 1
// 						}))
// 						setImg(prevData => ({
// 							...prevData,
// 							angryImg30: true
// 						}))
// 					}

// 				}
// 			}

// 			// FOR SCORE PERCENTAGE 50

// 			if (scoreImg === happy) {
// 				if (percentage.happy50) {
// 					if (emojis.happyEmoji == 0) {
// 						var score = parseInt(localStorage.getItem('score'))
// 						var updatedScore = score + 2
// 						localStorage.setItem("score", updatedScore);
// 						setEmojis(prevState => ({
// 							...prevState, happyEmoji: 1
// 						}))

// 						setImg(prevData => ({
// 							...prevData,
// 							happyImg50: true,
// 						}))
// 					}
// 				}
// 			}

// 			if (scoreImg === surprise) {
// 				if (percentage.surprised50) {
// 					if (emojis.surprisedEmoji == 0) {
// 						var score2 = parseInt(localStorage.getItem('score'))
// 						var updatedScore2 = score2 + 2
// 						localStorage.setItem("score", updatedScore2);

// 						setEmojis(prevState => ({
// 							...prevState, surprisedEmoji: 1
// 						}))
// 						setImg(prevData => ({
// 							...prevData,
// 							surprisedImg50: true,
// 						}))
// 					}

// 				}
// 			}

// 			if (scoreImg === angry) {
// 				if (percentage.angry50) {
// 					if (emojis.angryEmoji == 0) {
// 						var score3 = parseInt(localStorage.getItem('score'))
// 						var updatedScore3 = score3 + 2
// 						localStorage.setItem("score", updatedScore3);
// 						setEmojis(prevState => ({
// 							...prevState, angryEmoji: 1
// 						}))
// 						setImg(prevData => ({
// 							...prevData,
// 							angryImg50: true
// 						}))
// 					}

// 				}
// 			}

// 			//FOR SCORE PERCENTAGE 70

// 			if (scoreImg === happy) {
// 				if (percentage.happy70) {
// 					if (emojis.happyEmoji == 0) {
// 						var score = parseInt(localStorage.getItem('score'))
// 						var updatedScore = score + 3
// 						localStorage.setItem("score", updatedScore);
// 						setEmojis(prevState => ({
// 							...prevState, happyEmoji: 1
// 						}))

// 						setImg(prevData => ({
// 							...prevData,
// 							happyImg70: true,
// 						}))
// 					}
// 				}
// 			}

// 			if (scoreImg === surprise) {
// 				if (percentage.surprised70) {
// 					if (emojis.surprisedEmoji == 0) {
// 						var score2 = parseInt(localStorage.getItem('score'))
// 						var updatedScore2 = score2 + 3
// 						localStorage.setItem("score", updatedScore2);

// 						setEmojis(prevState => ({
// 							...prevState, surprisedEmoji: 1
// 						}))
// 						setImg(prevData => ({
// 							...prevData,
// 							surprisedImg70: true,
// 						}))
// 					}

// 				}
// 			}

// 			if (scoreImg === angry) {
// 				if (percentage.angry70) {
// 					if (emojis.angryEmoji == 0) {
// 						var score3 = parseInt(localStorage.getItem('score'))
// 						var updatedScore3 = score3 + 3
// 						localStorage.setItem("score", updatedScore3);
// 						setEmojis(prevState => ({
// 							...prevState, angryEmoji: 1
// 						}))
// 						setImg(prevData => ({
// 							...prevData,
// 							angryImg70: true
// 						}))
// 					}

// 				}
// 			}

// 		}

// 		if (((pleft < e2right) && (pright > e2left) && (pbottom > e2top) && (ptop < e2bottom))) {

// 			faceFxn()
// 			//FOR SCORE PERCENTAGE 30 
// 			if (scoreImg === happy) {
// 				if (percentage.happy30) {
// 					if (emojis.happyEmoji == 0) {
// 						var score = parseInt(localStorage.getItem('score'))
// 						var updatedScore = score + 1
// 						localStorage.setItem("score", updatedScore);
// 						setEmojis(prevState => ({
// 							...prevState, happyEmoji: 1
// 						}))

// 						setImg(prevData => ({
// 							...prevData,
// 							happyImg30: true,
// 						}))
// 					}
// 				}
// 			}

// 			if (scoreImg === surprise) {
// 				if (percentage.surprised30) {
// 					if (emojis.surprisedEmoji == 0) {
// 						var score2 = parseInt(localStorage.getItem('score'))
// 						var updatedScore2 = score2 + 1
// 						localStorage.setItem("score", updatedScore2);

// 						setEmojis(prevState => ({
// 							...prevState, surprisedEmoji: 1
// 						}))
// 						setImg(prevData => ({
// 							...prevData,
// 							surprisedImg30: true,
// 						}))
// 					}

// 				}
// 			}

// 			if (scoreImg === angry) {
// 				if (percentage.angry30) {
// 					if (emojis.angryEmoji == 0) {
// 						var score3 = parseInt(localStorage.getItem('score'))
// 						var updatedScore3 = score3 + 1
// 						localStorage.setItem("score", updatedScore3);
// 						setEmojis(prevState => ({
// 							...prevState, angryEmoji: 1
// 						}))
// 						setImg(prevData => ({
// 							...prevData,
// 							angryImg30: true
// 						}))
// 					}

// 				}
// 			}

// 			// FOR SCORE PERCENTAGE 50

// 			if (scoreImg === happy) {
// 				if (percentage.happy50) {
// 					if (emojis.happyEmoji == 0) {
// 						var score = parseInt(localStorage.getItem('score'))
// 						var updatedScore = score + 2
// 						localStorage.setItem("score", updatedScore);
// 						setEmojis(prevState => ({
// 							...prevState, happyEmoji: 1
// 						}))

// 						setImg(prevData => ({
// 							...prevData,
// 							happyImg50: true,
// 						}))
// 					}
// 				}
// 			}

// 			if (scoreImg === surprise) {
// 				if (percentage.surprised50) {
// 					if (emojis.surprisedEmoji == 0) {
// 						var score2 = parseInt(localStorage.getItem('score'))
// 						var updatedScore2 = score2 + 2
// 						localStorage.setItem("score", updatedScore2);

// 						setEmojis(prevState => ({
// 							...prevState, surprisedEmoji: 1
// 						}))
// 						setImg(prevData => ({
// 							...prevData,
// 							surprisedImg50: true,
// 						}))
// 					}

// 				}
// 			}

// 			if (scoreImg === angry) {
// 				if (percentage.angry50) {
// 					if (emojis.angryEmoji == 0) {
// 						var score3 = parseInt(localStorage.getItem('score'))
// 						var updatedScore3 = score3 + 2
// 						localStorage.setItem("score", updatedScore3);
// 						setEmojis(prevState => ({
// 							...prevState, angryEmoji: 1
// 						}))
// 						setImg(prevData => ({
// 							...prevData,
// 							angryImg50: true
// 						}))
// 					}

// 				}
// 			}

// 			//FOR SCORE PERCENTAGE 70

// 			if (scoreImg === happy) {
// 				if (percentage.happy70) {
// 					if (emojis.happyEmoji == 0) {
// 						var score = parseInt(localStorage.getItem('score'))
// 						var updatedScore = score + 3
// 						localStorage.setItem("score", updatedScore);
// 						setEmojis(prevState => ({
// 							...prevState, happyEmoji: 1
// 						}))

// 						setImg(prevData => ({
// 							...prevData,
// 							happyImg70: true,
// 						}))
// 					}
// 				}
// 			}

// 			if (scoreImg === surprise) {
// 				if (percentage.surprised70) {
// 					if (emojis.surprisedEmoji == 0) {
// 						var score2 = parseInt(localStorage.getItem('score'))
// 						var updatedScore2 = score2 + 3
// 						localStorage.setItem("score", updatedScore2);

// 						setEmojis(prevState => ({
// 							...prevState, surprisedEmoji: 1
// 						}))
// 						setImg(prevData => ({
// 							...prevData,
// 							surprisedImg70: true,
// 						}))
// 					}

// 				}
// 			}

// 			if (scoreImg === angry) {
// 				if (percentage.angry70) {
// 					if (emojis.angryEmoji == 0) {
// 						var score3 = parseInt(localStorage.getItem('score'))
// 						var updatedScore3 = score3 + 3
// 						localStorage.setItem("score", updatedScore3);
// 						setEmojis(prevState => ({
// 							...prevState, angryEmoji: 1
// 						}))
// 						setImg(prevData => ({
// 							...prevData,
// 							angryImg70: true
// 						}))
// 					}

// 				}
// 			}
// 		}

// 		//FOR SCORE IMAGE 2
// 		if (((pleft < e3right) && (pright > e3left) && (pbottom > e3top) && (ptop < e3bottom))) {

// 			faceFxn()
// 			//FOR SCORE PERCENTAGE 30 
// 			if (scoreImg === happy) {
// 				if (percentage.happy30) {
// 					if (emojis.happyEmoji == 0) {
// 						var score = parseInt(localStorage.getItem('score'))
// 						var updatedScore = score + 1
// 						localStorage.setItem("score", updatedScore);
// 						setEmojis(prevState => ({
// 							...prevState, happyEmoji: 1
// 						}))

// 						setImg(prevData => ({
// 							...prevData,
// 							happyImg30: true,
// 						}))
// 					}
// 				}
// 			}

// 			if (scoreImg === surprise) {
// 				if (percentage.surprised30) {
// 					if (emojis.surprisedEmoji == 0) {
// 						var score2 = parseInt(localStorage.getItem('score'))
// 						var updatedScore2 = score2 + 1
// 						localStorage.setItem("score", updatedScore2);

// 						setEmojis(prevState => ({
// 							...prevState, surprisedEmoji: 1
// 						}))
// 						setImg(prevData => ({
// 							...prevData,
// 							surprisedImg30: true,
// 						}))
// 					}

// 				}
// 			}

// 			if (scoreImg === angry) {
// 				if (percentage.angry30) {
// 					if (emojis.angryEmoji == 0) {
// 						var score3 = parseInt(localStorage.getItem('score'))
// 						var updatedScore3 = score3 + 1
// 						localStorage.setItem("score", updatedScore3);
// 						setEmojis(prevState => ({
// 							...prevState, angryEmoji: 1
// 						}))
// 						setImg(prevData => ({
// 							...prevData,
// 							angryImg30: true
// 						}))
// 					}

// 				}
// 			}

// 			// FOR SCORE PERCENTAGE 50

// 			if (scoreImg === happy) {
// 				if (percentage.happy50) {
// 					if (emojis.happyEmoji == 0) {
// 						var score = parseInt(localStorage.getItem('score'))
// 						var updatedScore = score + 2
// 						localStorage.setItem("score", updatedScore);
// 						setEmojis(prevState => ({
// 							...prevState, happyEmoji: 1
// 						}))

// 						setImg(prevData => ({
// 							...prevData,
// 							happyImg50: true,
// 						}))
// 					}
// 				}
// 			}

// 			if (scoreImg === surprise) {
// 				if (percentage.surprised50) {
// 					if (emojis.surprisedEmoji == 0) {
// 						var score2 = parseInt(localStorage.getItem('score'))
// 						var updatedScore2 = score2 + 2
// 						localStorage.setItem("score", updatedScore2);

// 						setEmojis(prevState => ({
// 							...prevState, surprisedEmoji: 1
// 						}))
// 						setImg(prevData => ({
// 							...prevData,
// 							surprisedImg50: true,
// 						}))
// 					}

// 				}
// 			}

// 			if (scoreImg === angry) {
// 				if (percentage.angry50) {
// 					if (emojis.angryEmoji == 0) {
// 						var score3 = parseInt(localStorage.getItem('score'))
// 						var updatedScore3 = score3 + 2
// 						localStorage.setItem("score", updatedScore3);
// 						setEmojis(prevState => ({
// 							...prevState, angryEmoji: 1
// 						}))
// 						setImg(prevData => ({
// 							...prevData,
// 							angryImg50: true
// 						}))
// 					}

// 				}
// 			}

// 			//FOR SCORE PERCENTAGE 70

// 			if (scoreImg === happy) {
// 				if (percentage.happy70) {
// 					if (emojis.happyEmoji == 0) {
// 						var score = parseInt(localStorage.getItem('score'))
// 						var updatedScore = score + 3
// 						localStorage.setItem("score", updatedScore);
// 						setEmojis(prevState => ({
// 							...prevState, happyEmoji: 1
// 						}))

// 						setImg(prevData => ({
// 							...prevData,
// 							happyImg70: true,
// 						}))
// 					}
// 				}
// 			}

// 			if (scoreImg === surprise) {
// 				if (percentage.surprised70) {
// 					if (emojis.surprisedEmoji == 0) {
// 						var score2 = parseInt(localStorage.getItem('score'))
// 						var updatedScore2 = score2 + 3
// 						localStorage.setItem("score", updatedScore2);

// 						setEmojis(prevState => ({
// 							...prevState, surprisedEmoji: 1
// 						}))
// 						setImg(prevData => ({
// 							...prevData,
// 							surprisedImg70: true,
// 						}))
// 					}

// 				}
// 			}

// 			if (scoreImg === angry) {
// 				if (percentage.angry70) {
// 					if (emojis.angryEmoji == 0) {
// 						var score3 = parseInt(localStorage.getItem('score'))
// 						var updatedScore3 = score3 + 3
// 						localStorage.setItem("score", updatedScore3);
// 						setEmojis(prevState => ({
// 							...prevState, angryEmoji: 1
// 						}))
// 						setImg(prevData => ({
// 							...prevData,
// 							angryImg70: true
// 						}))
// 					}

// 				}
// 			}

// 		}

// 		if (((pleft < e4right) && (pright > e4left) && (pbottom > e4top) && (ptop < e4bottom))) {

// 			faceFxn()
// 			//FOR SCORE PERCENTAGE 30 
// 			if (scoreImg === happy) {
// 				if (percentage.happy30) {
// 					if (emojis.happyEmoji == 0) {
// 						var score = parseInt(localStorage.getItem('score'))
// 						var updatedScore = score + 1
// 						localStorage.setItem("score", updatedScore);
// 						setEmojis(prevState => ({
// 							...prevState, happyEmoji: 1
// 						}))

// 						setImg(prevData => ({
// 							...prevData,
// 							happyImg30: true,
// 						}))
// 					}
// 				}
// 			}

// 			if (scoreImg === surprise) {
// 				if (percentage.surprised30) {
// 					if (emojis.surprisedEmoji == 0) {
// 						var score2 = parseInt(localStorage.getItem('score'))
// 						var updatedScore2 = score2 + 1
// 						localStorage.setItem("score", updatedScore2);

// 						setEmojis(prevState => ({
// 							...prevState, surprisedEmoji: 1
// 						}))
// 						setImg(prevData => ({
// 							...prevData,
// 							surprisedImg30: true,
// 						}))
// 					}

// 				}
// 			}

// 			if (scoreImg === angry) {
// 				if (percentage.angry30) {
// 					if (emojis.angryEmoji == 0) {
// 						var score3 = parseInt(localStorage.getItem('score'))
// 						var updatedScore3 = score3 + 1
// 						localStorage.setItem("score", updatedScore3);
// 						setEmojis(prevState => ({
// 							...prevState, angryEmoji: 1
// 						}))
// 						setImg(prevData => ({
// 							...prevData,
// 							angryImg30: true
// 						}))
// 					}

// 				}
// 			}

// 			// FOR SCORE PERCENTAGE 50

// 			if (scoreImg === happy) {
// 				if (percentage.happy50) {
// 					if (emojis.happyEmoji == 0) {
// 						var score = parseInt(localStorage.getItem('score'))
// 						var updatedScore = score + 2
// 						localStorage.setItem("score", updatedScore);
// 						setEmojis(prevState => ({
// 							...prevState, happyEmoji: 1
// 						}))

// 						setImg(prevData => ({
// 							...prevData,
// 							happyImg50: true,
// 						}))
// 					}
// 				}
// 			}

// 			if (scoreImg === surprise) {
// 				if (percentage.surprised50) {
// 					if (emojis.surprisedEmoji == 0) {
// 						var score2 = parseInt(localStorage.getItem('score'))
// 						var updatedScore2 = score2 + 2
// 						localStorage.setItem("score", updatedScore2);

// 						setEmojis(prevState => ({
// 							...prevState, surprisedEmoji: 1
// 						}))
// 						setImg(prevData => ({
// 							...prevData,
// 							surprisedImg50: true,
// 						}))
// 					}

// 				}
// 			}

// 			if (scoreImg === angry) {
// 				if (percentage.angry50) {
// 					if (emojis.angryEmoji == 0) {
// 						var score3 = parseInt(localStorage.getItem('score'))
// 						var updatedScore3 = score3 + 2
// 						localStorage.setItem("score", updatedScore3);
// 						setEmojis(prevState => ({
// 							...prevState, angryEmoji: 1
// 						}))
// 						setImg(prevData => ({
// 							...prevData,
// 							angryImg50: true
// 						}))
// 					}

// 				}
// 			}

// 			//FOR SCORE PERCENTAGE 70

// 			if (scoreImg === happy) {
// 				if (percentage.happy70) {
// 					if (emojis.happyEmoji == 0) {
// 						var score = parseInt(localStorage.getItem('score'))
// 						var updatedScore = score + 3
// 						localStorage.setItem("score", updatedScore);
// 						setEmojis(prevState => ({
// 							...prevState, happyEmoji: 1
// 						}))

// 						setImg(prevData => ({
// 							...prevData,
// 							happyImg70: true,
// 						}))
// 					}
// 				}
// 			}

// 			if (scoreImg === surprise) {
// 				if (percentage.surprised70) {
// 					if (emojis.surprisedEmoji == 0) {
// 						var score2 = parseInt(localStorage.getItem('score'))
// 						var updatedScore2 = score2 + 3
// 						localStorage.setItem("score", updatedScore2);

// 						setEmojis(prevState => ({
// 							...prevState, surprisedEmoji: 1
// 						}))
// 						setImg(prevData => ({
// 							...prevData,
// 							surprisedImg70: true,
// 						}))
// 					}

// 				}
// 			}

// 			if (scoreImg === angry) {
// 				if (percentage.angry70) {
// 					if (emojis.angryEmoji == 0) {
// 						var score3 = parseInt(localStorage.getItem('score'))
// 						var updatedScore3 = score3 + 3
// 						localStorage.setItem("score", updatedScore3);
// 						setEmojis(prevState => ({
// 							...prevState, angryEmoji: 1
// 						}))
// 						setImg(prevData => ({
// 							...prevData,
// 							angryImg70: true
// 						}))
// 					}

// 				}
// 			}
// 		}


// 		if (((pleft < e5right) && (pright > e5left) && (pbottom > e5top) && (ptop < e5bottom))) {

// 			faceFxn()
// 			//FOR SCORE PERCENTAGE 30 
// 			if (scoreImg === happy) {
// 				if (percentage.happy30) {
// 					if (emojis.happyEmoji == 0) {
// 						var score = parseInt(localStorage.getItem('score'))
// 						var updatedScore = score + 1
// 						localStorage.setItem("score", updatedScore);
// 						setEmojis(prevState => ({
// 							...prevState, happyEmoji: 1
// 						}))

// 						setImg(prevData => ({
// 							...prevData,
// 							happyImg30: true,
// 						}))
// 					}
// 				}
// 			}

// 			if (scoreImg === surprise) {
// 				if (percentage.surprised30) {
// 					if (emojis.surprisedEmoji == 0) {
// 						var score2 = parseInt(localStorage.getItem('score'))
// 						var updatedScore2 = score2 + 1
// 						localStorage.setItem("score", updatedScore2);

// 						setEmojis(prevState => ({
// 							...prevState, surprisedEmoji: 1
// 						}))
// 						setImg(prevData => ({
// 							...prevData,
// 							surprisedImg30: true,
// 						}))
// 					}

// 				}
// 			}

// 			if (scoreImg === angry) {
// 				if (percentage.angry30) {
// 					if (emojis.angryEmoji == 0) {
// 						var score3 = parseInt(localStorage.getItem('score'))
// 						var updatedScore3 = score3 + 1
// 						localStorage.setItem("score", updatedScore3);
// 						setEmojis(prevState => ({
// 							...prevState, angryEmoji: 1
// 						}))
// 						setImg(prevData => ({
// 							...prevData,
// 							angryImg30: true
// 						}))
// 					}

// 				}
// 			}

// 			// FOR SCORE PERCENTAGE 50

// 			if (scoreImg === happy) {
// 				if (percentage.happy50) {
// 					if (emojis.happyEmoji == 0) {
// 						var score = parseInt(localStorage.getItem('score'))
// 						var updatedScore = score + 2
// 						localStorage.setItem("score", updatedScore);
// 						setEmojis(prevState => ({
// 							...prevState, happyEmoji: 1
// 						}))

// 						setImg(prevData => ({
// 							...prevData,
// 							happyImg50: true,
// 						}))
// 					}
// 				}
// 			}

// 			if (scoreImg === surprise) {
// 				if (percentage.surprised50) {
// 					if (emojis.surprisedEmoji == 0) {
// 						var score2 = parseInt(localStorage.getItem('score'))
// 						var updatedScore2 = score2 + 2
// 						localStorage.setItem("score", updatedScore2);

// 						setEmojis(prevState => ({
// 							...prevState, surprisedEmoji: 1
// 						}))
// 						setImg(prevData => ({
// 							...prevData,
// 							surprisedImg50: true,
// 						}))
// 					}

// 				}
// 			}

// 			if (scoreImg === angry) {
// 				if (percentage.angry50) {
// 					if (emojis.angryEmoji == 0) {
// 						var score3 = parseInt(localStorage.getItem('score'))
// 						var updatedScore3 = score3 + 2
// 						localStorage.setItem("score", updatedScore3);
// 						setEmojis(prevState => ({
// 							...prevState, angryEmoji: 1
// 						}))
// 						setImg(prevData => ({
// 							...prevData,
// 							angryImg50: true
// 						}))
// 					}

// 				}
// 			}

// 			//FOR SCORE PERCENTAGE 70

// 			if (scoreImg === happy) {
// 				if (percentage.happy70) {
// 					if (emojis.happyEmoji == 0) {
// 						var score = parseInt(localStorage.getItem('score'))
// 						var updatedScore = score + 3
// 						localStorage.setItem("score", updatedScore);
// 						setEmojis(prevState => ({
// 							...prevState, happyEmoji: 1
// 						}))

// 						setImg(prevData => ({
// 							...prevData,
// 							happyImg70: true,
// 						}))
// 					}
// 				}
// 			}

// 			if (scoreImg === surprise) {
// 				if (percentage.surprised70) {
// 					if (emojis.surprisedEmoji == 0) {
// 						var score2 = parseInt(localStorage.getItem('score'))
// 						var updatedScore2 = score2 + 3
// 						localStorage.setItem("score", updatedScore2);

// 						setEmojis(prevState => ({
// 							...prevState, surprisedEmoji: 1
// 						}))
// 						setImg(prevData => ({
// 							...prevData,
// 							surprisedImg70: true,
// 						}))
// 					}

// 				}
// 			}

// 			if (scoreImg === angry) {
// 				if (percentage.angry70) {
// 					if (emojis.angryEmoji == 0) {
// 						var score3 = parseInt(localStorage.getItem('score'))
// 						var updatedScore3 = score3 + 3
// 						localStorage.setItem("score", updatedScore3);
// 						setEmojis(prevState => ({
// 							...prevState, angryEmoji: 1
// 						}))
// 						setImg(prevData => ({
// 							...prevData,
// 							angryImg70: true
// 						}))
// 					}

// 				}
// 			}
// 		}

//     }
//     return(
//         collision()
//     )
// })