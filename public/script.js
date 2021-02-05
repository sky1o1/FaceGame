// const video = document.getElementById('video')

// Promise.all([
//   faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
//   faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
//   faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
//   faceapi.nets.faceExpressionNet.loadFromUri('/models')
// ]).then(startVideo)


// function startVideo() {
//   async function getMedia() {
//     let stream = null;
//     const constraints = {
//       audio: true,
//       video: {
//         frameRate: { ideal: 15, max: 20 },
//         mirrored: false,
//         width: 1280,
//         height: 720,
//       },
//       facingMode: "user"
//     }
//     try {
//       stream = await navigator.mediaDevices.getUserMedia(constraints);
//       let video = document.getElementsByClassName('app__videoFeed')[0];
//       if (video) {
//         video.srcObject = stream;
//       }
//     } catch (err) {
//       console.log(err)
//     }
//   }
//   getMedia()
// };

// video.addEventListener('play', () => {
//   const canvas = faceapi.createCanvasFromMedia(video)
//   document.body.append(canvas)
//   const displaySize = { width: video.width, height: video.height }
//   faceapi.matchDimensions(canvas, displaySize)
//   setInterval(async () => {
//     const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
//     // console.log(detections[0].expressions)
//     if(detections[0].expressions.happy>=0.5){
//       console.log('happy face')
//       console.log('happy face')
//     //   createEmotion('happy face')
//     }else if(detections[0].expressions.angry>=0.5){
//       console.log('angry face')
//     //   createEmotion('angry face')
//     }else if(detections[0].expressions.surprised>=0.5){
//       console.log('surprise face')
//     //   createEmotion('surprise face')
//     }else if(detections[0].expressions.sad>=0.5){
//       console.log('sad face')
//     //   createEmotion('sad face')
//     }else{
//       console.log('No face detected')
//     //   createEmotion('No face detected')
//     }

//     // const resizedDetections = faceapi.resizeResults(detections, displaySize)
//     canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
//     // faceapi.draw.drawDetections(canvas, resizedDetections)
//     // faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
//     // faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
//   }, 100)
// })