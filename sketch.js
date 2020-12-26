
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var score=0;
var obstacle, ground;
var survivalTime;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png")
}



function setup() {
  createCanvas(400,400);
  
  monkey = createSprite(50,340,10,10)
  monkey.addAnimation("animal",monkey_running)
  monkey.scale=0.1;
  
  ground = createSprite(0,350,400,2);
  ground.scale = 1
  ground.x = -100;
  ground.x=ground.width/2;
  
  banana = createSprite(390,200,20,20);
  banana.addImage(bananaImage);
  banana.scale = 0.1;
  banana.velocityX = -4;
  
  obstacle = createSprite(200,313,20,20);
  obstacle.addImage("obstacle",obstacleImage);
  obstacle.scale = 0.2;
  
  survivalTime = 0;
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
  
  }

 
function draw() {
  
  background(255);
  text("Score:"+score,300,50);
  
  score = score + Math.round(getFrameRate()/60);
  
  ground.x=200
  ground.velocityX=-10;
  
  if(keyDown("SPACE") && monkey.y>=290){
    monkey.velocityY = -20;
    }
  
  if(ground.x<0){
   ground.x=ground.width/2;
   }
  
  obstacle.velocityX = -6;
  
  monkey.velocityY = monkey.velocityY + 1;
  monkey.collide(ground);
  
  Banana();
  Obstacle();
  
  if(monkey.isTouching(banana)){
    banana.destroy();
    }
  
  if(obstacleGroup.isTouching(monkey)){
    ground.velocityX=0;
    monkey.velocityY=0;
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
  }
  
  drawSprites();
  
  }

function Banana(){
  if(frameCount%80===0){
    banana = createSprite(390,200,20,20);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.velocityX = -6;
    banana.lifeTime = 200;
    banana.scale=0.1
    bananaGroup.add(banana);
   }
   }

  function Obstacle(){
  if(frameCount % 100 === 0){
    obstacle = createSprite(390,313,10,10);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacleImage);       
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    obstacleGroup.add(obstacle);
    obstacle.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    }
    }  
