var path,mainCyclist;
var player1,player2,player3;
var pathImg,mainRacerImg1,mainRacerImg2;

var oppPink1Img,oppPink2Img;
var oppYellow1Img,oppYellow2Img;
var oppRed1Img,oppRed2Img;
var gameOverImg,cycleBell;

var pinkCG, yellowCG,redCG; 

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var gameOver, restart;

function preload(){
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadAnimation("images/mainPlayer3.png");
  
  oppPink1Img = loadAnimation("images/opponent1.png","images/opponent2.png");
  oppPink2Img = loadAnimation("images/opponent3.png");
  
  oppYellow1Img = loadAnimation("images/opponent4.png","images/opponent5.png");
  oppYellow2Img = loadAnimation("images/opponent6.png");
  
  oppRed1Img = loadAnimation("images/opponent7.png","images/opponent8.png");
  oppRed2Img = loadAnimation("images/opponent9.png");
  
  cycleBell = loadSound("sound/bell.mp3");
  gameOverImg = loadImage("images/gameOver.png");
}

function setup(){
  
createCanvas(displayWidth,displayHeight-400);
// Moving background
path=createSprite(displayWidth/2,displayHeight/5+30);
path.addImage(pathImg);
path.velocityX = 0;

//creating boy running
mainCyclist  = createSprite(10,150);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.07;
mainCyclist.velocityX = 0;
  
//set collider for mainCyclist
mainCyclist.setCollider("rectangle",-60,0,400,400);
  
gameOver = createSprite(650,130);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.8;
gameOver.visible = false;  
  
pinkCG = new Group();
yellowCG = new Group();
redCG = new Group();
  
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,900,30);
  
  if(gameState===PLAY){
    
   distance = distance + Math.round(getFrameRate()/50);
   if(keyDown(RIGHT_ARROW)){
     mainCyclist.velocityX = 5;
   }
   if(keyDown(LEFT_ARROW)){
    mainCyclist.velocityX = -5;
  }
  if(keyDown(UP_ARROW)){
    mainCyclist.velocityY = -5;
  }
  if(keyDown(DOWN_ARROW)){
    mainCyclist.velocityY = 5;
  }

   camera.position.x = mainCyclist.x;
   camera.position.y = displayHeight/5+30;
  
  //code to reset the background
  
    //code to play cycle bell sound
  if(keyDown("space")) {
    cycleBell.play();
  }
  
  //creating continous opponent players
  var select_oppPlayer = Math.round(random(1,3));
  
  if (World.frameCount % 60 == 0) {
    if (select_oppPlayer == 1) {
      pinkCyclists();
    } else if (select_oppPlayer == 2) {
      yellowCyclists();
    } else {
      redCyclists();
    }
  }
  
   if(pinkCG.isTouching(mainCyclist)){
     gameState = END;
     player1.velocityY = 0;
     player1.addAnimation("opponentPlayer1",oppPink2Img);
    }
    
    if(yellowCG.isTouching(mainCyclist)){
      gameState = END;
      player2.velocityY = 0;
      player2.addAnimation("opponentPlayer2",oppYellow2Img);
    }
    
    if(redCG.isTouching(mainCyclist)){
      gameState = END;
      player3.velocityY = 0;
      player3.addAnimation("opponentPlayer3",oppRed2Img);
    }

    if(mainCyclist.x>displayWidth*2-100){
      mainCyclist.velocityX = 0;
      mainCyclist.velocityY = 0;
    }

    
    
}

else if (gameState === END) {
    gameOver.visible = true;
    //Add code to show restart game instrution in text here
    text("Press Up Arrow to Restart the game!",500,200)
  
    path.velocityX = 0;
    mainCyclist.velocityY = 0;
    mainCyclist.velocityX = 0;
    mainCyclist.addAnimation("SahilRunning",mainRacerImg2);
  
    pinkCG.setVelocityXEach(0);
    pinkCG.setLifetimeEach(-1);
  
    yellowCG.setVelocityXEach(0);
    yellowCG.setLifetimeEach(-1);
  
    redCG.setVelocityXEach(0);
    redCG.setLifetimeEach(-1);
}
    //write condition for calling reset
if(keyDown("r")){
  reset();
}
}
function pinkCyclists(){
        player1 =createSprite(Math.round(random(0,displayWidth)),Math.round(random(0,displayHeight)));
        player1.scale =0.06;
        player1.addAnimation("opponentPlayer1",oppPink1Img);
        player1.setLifetime=10;
        pinkCG.add(player1);
}

function yellowCyclists(){
        player2 =createSprite(Math.round(random(20,displayWidth)),Math.round(random(10, displayHeight/5)));
        player2.scale =0.06;
        player2.addAnimation("opponentPlayer2",oppYellow1Img);
        player2.setLifetime=10;
        yellowCG.add(player2);
}

function redCyclists(){
        player3 =createSprite(Math.round(random(20,displayWidth)),Math.round(random(50, displayHeight/5)));
        player3.scale =0.06;
        player3.addAnimation("opponentPlayer3",oppRed1Img);
        player3.setLifetime=10;
        redCG.add(player3);
}

//create reset function here
function reset(){
  gameState = PLAY;
  distance = 0;
  pinkCG.destroyEach();
  yellowCG.destroyEach();
  redCG.destroyEach();
  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  gameOver.visible = false;
}  