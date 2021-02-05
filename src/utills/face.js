// import * as faceapi from "face-api.js"
// import {useEffect} from 'react';

// export default function Face(){
//     const video1 = document.getElementById('video1')
//     console.log(video1)

//        const face = async() => {
//            try{
//             let play = await [faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
//             faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
//             faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
//             faceapi.nets.faceExpressionNet.loadFromUri('/models')]
//             return play(startVideo)
//            }
//            catch(err){
//             console.error(err)
//            }
//        } 

//        useEffect(() => {
// 		face();
//     }, [])
    
//        function startVideo() {
//            async function getMedia() {
//              let stream = null;
//              const constraints = {
//                audio: true,
//                video: {
//                  frameRate: { ideal: 15, max: 20 },
//                  mirrored: false,
//                  width: 1280,
//                  height: 720,
//                },
//                facingMode: "user"
//              }
//              try {
//                stream = await navigator.mediaDevices.getUserMedia(constraints);
//                let video = document.getElementsByClassName('app__videoFeed')[0];
//                if (video) {
//                  video.srcObject = stream;
//                }
//              } catch (err) {
//                console.log(err)
//              }
//            }
//            getMedia()
//          };
       
         
//          video1.addEventListener('play', () => {
//             const canvas = faceapi.createCanvasFromMedia(video1)
//             document.body.append(canvas)
//             const displaySize = { width: video1.width, height: video1.height }
//             faceapi.matchDimensions(canvas, displaySize)
//             setInterval(async () => {
//               const detections = await faceapi.detectAllFaces(video1, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
             
//               if(detections[0].expressions.happy>=0.5){
//                 console.log('happy face')
//               }else if(detections[0].expressions.angry>=0.5){
//                 console.log('angry face')
//               }else if(detections[0].expressions.surprised>=0.5){
//                 console.log('surprise face')
//               }else if(detections[0].expressions.sad>=0.5){
//                 console.log('sad face')
//               }else{
//                 console.log('No face detected')
//               }
          
//               canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
//             }, 100)
//           })

//     return(
// <div>
// <video
// 						id='video1'
// 						playsInline
// 						muted
// 						autoPlay
// 						resize
// 						className="app__videoFeed"
// 					/>
// </div>
//     )
// } 
  
