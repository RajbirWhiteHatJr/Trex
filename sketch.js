var trex, running_trex , collided_trex;
var ground,ground_image,invisible_ground;
var obstacle6,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5;
var cloudimg,restart,gameover,ObstaclesGroup,CloudsGroup;
var count=0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOver,gimg;
var restart,rimg;

function preload(){
 running_trex = loadAnimation ("trex1.png","trex3.png","trex4.png" );
  
  collided_trex = loadImage ("trex_collided.png") ;
  ground_image = loadImage ("ground2.png");
  
  obstacle6 = loadImage ("obstacle1.png");
  obstacle1 = loadImage ("obstacle2.png");
  obstacle2 = loadImage ("obstacle3.png");
  obstacle3 = loadImage ("obstacle4.png");
  obstacle4 = loadImage ("obstacle5.png");
  obstacle5 = loadImage("obstacle6.png");
  cloudimg=loadImage("cloud.png");
  rimg=loadImage("restart.png");
  gimg=loadImage("gameOver.png");
 
  
}



function setup() {
  createCanvas(600, 200);
  trex=createSprite(200,180,20,50);
  trex.addAnimation ( "running" ,running_trex);
  trex.addAnimation ( "collided" ,collided_trex);
  
  trex.scale=0.5;
  
  invisible_ground = createSprite(200,180,400,5);
  invisible_ground.visible = false;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",ground_image);
  ground.velocityX=- (3 + 3*count/100);;
  ground.x=ground.width/2;
  
   ObstaclesGroup = new Group();
   CloudsGroup = new Group();
  
 gameOver = createSprite(300,100);
  gameOver.addImage(gimg);
  gameOver.scale = 0.5;
  restart = createSprite(300,140);
  restart.addImage(rimg);
  restart.scale = 0.5;
  gameOver.visible = false;
  restart.visible = false;
}

function draw() {
  background(180);
  
   text("Score: "+ count, 350, 50);
  
  if(gameState === PLAY){
    
       count = count+ Math.round(getFrameRate()/60);
     
  if(keyDown("space")){
      trex.velocityY = -12 ;
  }
   trex.velocityY = trex.velocityY + 0.8;
  trex.collide(invisible_ground);
  
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
    spawnObstacles();
    spawnClouds() ;
     if(ObstaclesGroup.isTouching(trex)){
     
      gameState = END;
      
    }
  }
  
  else if(gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collided" ,collided_trex);
    
    //set lifetime of the game objects so that they are never destroyed
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
    reset();
  }
    
  }
  
  
  drawSprites();
  
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage("cimg",cloudimg);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    CloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = - (6 + 3*count/100);; 
    
    //generate random obstacles
    var rand =Math.round( random(1,6));
    switch(rand){
      case 1: obstacle.addImage(obstacle6);
              break;
      case 2: obstacle.addImage(obstacle1);
              break;
      case 3: obstacle.addImage(obstacle2);
              break;
      case 4: obstacle.addImage(obstacle3);
              break;
      case 5: obstacle.addImage(obstacle4);
              break;
      case 6: obstacle.addImage(obstacle5);
              break;
      default: break;     
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState=PLAY;
  trex.changeAnimation("running" ,running_trex);
  ObstaclesGroup.destroyEach();
  CloudsGroup.destroyEach();
  gameOver.visible = false;
  restart.visible = false;
  count=0
}
