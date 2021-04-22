var bgsprite, bgimage;
var mariosprite, marioimage;
var invisiblesprite, firesprite, fireimage
var score
var cloudimage, cloudsprite
var coinimage, coinsprite
var groupFire, groupCloud, groupCoins
var survival
var play=1;
var end=0;
var gamestate=1
var gameoverimg, gameoversprite
var restartimg, restartsprite

function preload(){
bgimage=loadImage("bgimage.jpg");
marioimage=loadAnimation("mario1.png", "mario2.png");
fireimage=loadAnimation("fire11.png", "fire22.png", "fire33.png", "fire4.png")
cloudimage=loadImage("cloud.png")
coinimage = loadAnimation("coin1.png", "coin2.png", "coin3.png", "coin4.png", "coin5.png")
gameoverimg=loadImage("gameover.png")
restartimg = loadImage("restart.png")
}

function setup(){
createCanvas(1200, 800);
bgsprite = createSprite(0, 410, 1200, 800)
bgsprite.addImage(bgimage)
bgsprite.scale = 1.5
bgsprite.velocityX = -4
mariosprite = createSprite(50, 680, 50, 50);
mariosprite.addAnimation("marioimage", marioimage);
invisiblesprite = createSprite(600, 735, 1200, 20)
invisiblesprite.visible=false;
score=0
groupFire = new Group()
groupCoins = new Group()
groupCloud = new Group()
survival = 0
gameoversprite = createSprite(600, 400, 50, 50)
restartsprite = createSprite(600, 500, 50, 50)
gameoversprite.addImage(gameoverimg)
restartsprite.addImage(restartimg)
restartsprite.visible = false
gameoversprite.visible = false
}

function draw(){
background(0);

if(gamestate === play){
    if(bgsprite.x<0){
        bgsprite.x = 600
    }
    
    if(keyDown("space")){
        mariosprite.velocityY = -12
    }
    mariosprite.velocityY = mariosprite.velocityY+0.5
    mariosprite.collide(invisiblesprite);
    
    for(var i = 0; i<groupCoins.length; i++){
        if(mariosprite.isTouching(groupCoins.get(i))){
            groupCoins.get(i).remove()
            score = score+1
        }
    }
   
    survival = survival+1

fire();
cloud();
coins();

if(mariosprite.isTouching(groupFire)){
    gamestate = 0
}
}
else
if(gamestate === end){
    gameoversprite.visible = true
    restartsprite.visible = true
    bgsprite.velocityX =0
    groupCloud.velocityX =0
    groupCoins.velocityX =0
    groupFire.velocityX =0
}





drawSprites();
textSize(18)
fill("white")
text("SURVIVAL TIME:"+survival, 990, 50)
text("COINS:"+score, 890, 50)

}

function fire(){
    if(frameCount%200===0){
        firesprite = createSprite(1200, 680, 50, 50)
        firesprite.addAnimation("fireimage", fireimage)
        firesprite.velocityX = -4;
        firesprite.lifetime=600
        groupFire.add(firesprite)
    }
}

function cloud(){
    if(frameCount%300===0){
        cloudsprite = createSprite(1200, 100, 50, 50)
        cloudsprite.addImage(cloudimage)
        cloudsprite.velocityX = -4
        cloudsprite.lifetime=600
        cloudsprite.scale = 0.3
        cloudsprite.y = random(50, 400);
        groupCloud.add(cloudsprite)
    }
}

function coins(){
    if(frameCount%130===0){
        coinsprite = createSprite(1200, 100, 50, 50)
        coinsprite.addAnimation("coinimage", coinimage)
        coinsprite.velocityX = -4
        coinsprite.scale = 0.3
        coinsprite.lifetime=600
        coinsprite.y = random(400, 600);
        groupCoins.add(coinsprite)
    }
}