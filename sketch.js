var trex
var trex_running
var ground
var grounding
var invisibleground
var score = 0
var gameState = "play"
var obstaclesGroup
var cloudsGroup
var gameOver
var restart
var trex_collided
var jumpSound
var dieSound
var checkpointSound

function preload (){
trex_running = loadAnimation ("trex1.png","trex3.png","trex4.png")
grounding = loadImage ("ground2.png")
Cloudsimg = loadImage("cloud.png")
Obstacle1img = loadImage("obstacle1.png")
Obstacle2img = loadImage("obstacle2.png")
Obstacle3img = loadImage("obstacle3.png")
Obstacle4img = loadImage("obstacle4.png")
Obstacle5img = loadImage("obstacle5.png")
Obstacle6img = loadImage("obstacle6.png")
gameOverimg = loadImage("gameOver.png")
restartimg = loadImage("restart.png")
trex_collided = loadAnimation("trex_collided.png")
jumpSound = loadSound("jump.mp3")
dieSound = loadSound("die.mp3")
checkpointSound = loadSound("checkpoint.mp3")
}

function setup(){
//createCanvas (600,200)
createCanvas (windowWidth,windowHeight)
//ground = createSprite(200,180,400,20)
ground = createSprite(200,height-20,400,20)
ground.addImage(grounding)
obstaclesGroup = new Group() 
cloudsGroup = new Group()
ground.x = ground.width/2
//trex = createSprite(50,170,20,40)
trex = createSprite(50,height-20,20,40)
trex.addAnimation("running",trex_running)
trex.addAnimation("collided",trex_collided)
trex.scale = 0.5
trex.debug = false
trex.setCollider("circle",0,0,40)
invisibleground = createSprite(200,height-10,400,10)
invisibleground.visible = false
var numAleatoria = Math.round(random(1,10))
gameOver = createSprite(width/2,height/2)
restart = createSprite(width/2,height/2 +40)
gameOver.addImage(gameOverimg)
restart.addImage(restartimg)
gameOver.scale = 0.5
restart.scale = 0.5
gameOver.visible = false
restart.visible = false
}

function draw (){
 // console.time()
 background(180)

if (gameState == "play"){
  ground.velocityX = -4
  score = score + 0.1
  
if(Math.round(score)%100 == 0 && Math.round(score) >0){
  checkpointSound.play()

}

  if ((keyDown("space")||touches.lenght>0)&& trex.y>height-52){
  trex.velocityY = -10
  touches = []
  jumpSound.play()
  }
  if (ground.x<0){
    ground.x = ground.width/2
   }
 trex.velocityY = trex.velocityY + 0.5
 spawClouds()
 spawObstacles()
 if(trex.isTouching(obstaclesGroup)){
  gameState = "end"
   dieSound.play()
 }
}

if (gameState == "end"){
  ground.velocityX = 0
  obstaclesGroup.setVelocityXEach(0)
  cloudsGroup.setVelocityXEach(0)
  obstaclesGroup.setLifetimeEach(-1)
  cloudsGroup.setLifetimeEach(-1)
  gameOver.visible = true
  restart.visible = true 
  trex.velocityY = 0
  trex.changeAnimation("collided",trex_collided)
  if(mousePressedOver(restart)|| touches.lenght>0){
  reset()
  touches =[]
}
}


 
// console.log(trex.y)
 //console.warn("una advertencia")
 //console.error("asi es como aperece un error")
 //console.info("informacion")
 
 
 

 text("puntuacion:" + Math.round(score),width-100,50)
 trex.collide (invisibleground)



 drawSprites()
 //console.timeEnd() 
 
}

function spawClouds (){
  if(frameCount%60 === 0){
var clouds = createSprite(width,100,40,20)
clouds.velocityX = -4
clouds.y = Math.round(random(20,height-80))
clouds.addImage(Cloudsimg)
clouds.scale = 0.5
trex.depth = clouds.depth
trex.depth = trex.depth +1
clouds.lifetime = 400 
cloudsGroup.add(clouds)
}
}
function spawObstacles (){
if(frameCount%60 === 0){
  var obstacles = createSprite(width+100,height-30,20,40)
  obstacles.velocityX = -(6+ 3 *score/100)
  var dado = Math.round(random(1,6))  
  switch(dado){
case 1 :obstacles.addImage(Obstacle1img); break ;
case 2 :obstacles.addImage(Obstacle2img); break ;
case 3 :obstacles.addImage(Obstacle3img); break ;
case 4 :obstacles.addImage(Obstacle4img); break ;
case 5 :obstacles.addImage(Obstacle5img); break ;
case 6 :obstacles.addImage(Obstacle6img); break ;
default:obstacles.addImage(Obstacle1img); break ;
}
obstacles.scale = 0.5
obstacles.lifetime = 400 
obstaclesGroup.add(obstacles)
}
}

function reset(){
  score = 0
  gameOver.visible = false
  restart.visible = false
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  gameState = "play"
  trex.changeAnimation("running",trex_running)
}