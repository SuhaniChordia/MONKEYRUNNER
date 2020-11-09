var PLAY=1;
  var END=0;
  var gameState=1;
var monkey , monkey_running
var banana ,bananaImage, obstace, obstaceImage
var FoodGroup, obstacleGroup
var score ;
var lion;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  
}



function setup() {
  
createCanvas(650,250);
  
  monkey = createSprite (50, 180, 20, 50);
  monkey.addAnimation("moving" , monkey_running);
  monkey.scale = 0.1;
  
  
  ground = createSprite(200, 220, 1300, 20);
 ground.velocityX = 5;
  score = 0;
      

   obstaclesGroup = createGroup();
  FoodGroup = createGroup();
}


function draw() {

  background("black");
  
 survivalTime=Math.ceil(frameCount/frameRate());
  text("Survival Time: "+ survivalTime, 300,30);
  stroke("black"); textSize(20); fill("black");
  
   if (keyDown("space") && monkey.y>161) {
    monkey.velocityY = -10;
   }
 
  
   monkey.velocityY = monkey.velocityY + 0.5;
  ground.velocityX = -2;
  if (ground.x < 0){
    ground.x = ground.width/2
  }
  //stop trex from falling down
  monkey.collide(ground)
  obstacle();
  Food();
   drawSprites();
  
  if (gameState===PLAY){
   if(FoodGroup.isTouching(monkey)){
  FoodGroup.destroyEach();
  score = score = +2;
}
  }
  
  if(obstaclesGroup.isTouching(monkey)){ 
    ground.velocityX = 0;
    monkey.velocityY = 0;
obstaclesGroup.setVelocityXEach(0); FoodGroup.setVelocityXEach(0); obstaclesGroup.setLifetimeEach(-1); banana.setLifetimeEach(-1);   
  }

                  
    

}
function obstacle(){
   if (frameCount % 300 === 0) {
     obstace = createSprite(650,190,10,10);
    obstace.addImage(obstaceImage);
    obstace.scale = 0.1;
    obstace.velocityX = -3;
     
    obstaclesGroup.add(obstace);
    obstace.lifetime = 300;
   }
  
}

function Food(){
  if(frameCount % 80 === 0){
    banana = createSprite( 650, 300, 10, 10);
    banana.y = Math.round(random(50,150));
    banana.velocityX = -3;
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    FoodGroup.add(banana);
  }
}









