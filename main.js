function setup(){
    canvas = createCanvas(600 , 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video , modelLoaded);
    poseNet.on("pose" , gotposes);
}

leftWristX =0;
leftWristY = 0 ;
rightWristX = 0;
rightWristY = 0;
leftWrist = 0;
rightWrist =1;
harryPotter ="";
peterPan ="";

function modelLoaded(){
    console.log("poseNet is initialized");
}

function gotposes(results){
    if(results.length > 0){
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX =" + leftWristX + "leftWristY =" + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX =" + rightWristX + "rightWristY =" + rightWristY);

        leftWrist =results[0].pose.keypoints[9].score;
        rightWrist =results[0].pose.keypoints[10].score;
    }
}

function Play(){
  peterPan.play();
}

function preload(){
    harryPotter = loadSound("music.mp3");
    peterPan = loadSound("music2.mp3")
}

function draw(){
    image(video , 0 , 0 , 600 , 500);
    fill('#FF0000');
    stroke('#FF0000');
    song1 = harryPotter.isPlaying();
    
   if(leftWrist > 0.2){
      circle(leftWristX , leftWristY , 20);
      peterPan.stop();

      if(harryPotter =false){
      harryPotter.play();
      document.getElementById("heading").innerHTML = "harryPotter"
      }
   }


   song2 = peterPan.isPlaying();

   if(rightWrist > 0.2){
    circle(rightWristX , rightWristY , 20);
    harryPotter.stop();

    if(peterPan == false){
        peterPan.play();
        document.getElementById("heading").innerHTML = "peterPan"
   }
}
}