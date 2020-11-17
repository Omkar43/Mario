var PLAY;
var END;
var gameState = PLAY;


var mario,mario_running;
var ground,groundImage;
var obstacle,obstacle_Image,obstacle_Group;
var cloud,cloud_Image,cloud_Group;
var sky,skyImage;

var Sound;



function preload(){
  mario_running=loadAnimation("mario.gif");
  groundImage=loadImage("mario_ground20.png");
  obstacle_Image=loadImage("Plant.png");
  cloud_Image=loadImage("mario_cloud.png");
  skyImage=loadImage("mario_sky.png");
  Sound=loadSound("01 - Super Mario Bros.mp3");
}

function setup() {
 createCanvas(400,300);
  
//Sound.loop();
  
   sky=createSprite(200,113);
  sky.addImage("Image",skyImage);
  
  mario=createSprite(50, 207, 10, 10);
  mario.addAnimation("running",mario_running);
  mario.scale=0.4
  
  ground=createSprite(400,275);
  ground.addImage("Image",groundImage);
  ground.velocityX=-3;
  ground.x=ground.width/2;
  
  
  obstacleGroup=new Group();
  cloudGroup = new Group();
  
}

function draw() {
 background("white");
  
  if(gameState === PLAY){
     if (ground.x < 100){
      ground.x = ground.width/2;
    }
  
 if(keyDown("space")&& mario.y >= 205) {
       mario.velocityY = -12;
 }
  
    mario.debug=true;
mario.setCollider("rectangle",0,0,mario.width,mario.height); 
   mario.velocityY = mario.velocityY + 0.8;
  
  mario.collide(ground);
  
  mario.depth=ground.depth;
  mario.depth=mario.depth+ 1
  
 spawn_obstacles();
 spawn_clouds(); 
    
    
  
  drawSprites();
    
     if (mario.isTouching(obstacleGroup)) {
      gameState = "END"
    }
  }
  if(gameState === "END"){
      textSize(40)
    fill("red")
    text("YOU LOSE!", 70, 150);
     }

}

function spawn_obstacles(){
  if(frameCount % 100 === 0){
    
     var obstacle=createSprite(300,215,20,20);
    obstacle.addImage("Image",obstacle_Image);
    obstacle.scale=0.2;
    obstacle.velocityX=-3;
     
    obstacleGroup.add(obstacle);
     }
}

function spawn_clouds(){
  if(frameCount % 60 === 0){
      var cloud=createSprite(300,50,20,20);
    cloud.y=Math.round(random(30,100))
       cloud.addImage("Img",cloud_Image);
       cloud.scale=0.1;
    cloud.velocityX=-3
    
    cloudGroup.add(cloud);
     
    mario.depth=cloud.depth;
    mario.depth +=1;
     }
  
  
}
