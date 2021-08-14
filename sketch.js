//creating global variables
var bg, bgImage;

var boy, boyImage;
var boyAnimLeft, boyAnimRight, boyAnimUpDown, boyCollide;
var ghost, ghostImage;
var coin, coinImage;

var gameover, gameoverImage;
var reset, resetImage;

var score = 0;

var play = 1, end = 0;
var gamestate = play;

var coinsGroup, ghostsGroup;

var sikkaSound, mrityuSound, bgSound;

function preload() {

  bgImage = loadImage("bg.jpg");

  boyImage = loadAnimation("1.png");
  boyAnimRight = loadAnimation("2.png", "3.png", "4.png", "5.png", "6.png");
  boyAnimLeft = loadAnimation("boy1.png", "boy2.png", "boy3.png", "boy4.png", "boy5.png", "boy6.png");
  boyAnimUpDown = loadAnimation("jump.png");
  boyCollide = loadAnimation("collide.png");

  ghostImage = loadImage("ghost.png");
  coinImage = loadImage("coin.png");

  gameoverImage = loadImage("gameover.png");
  resetImage = loadImage("reset.png");
  
  sikkaSound = loadSound("sikka.mp3");
  mrityuSound = loadSound("mauth ki aawaaz.wav");
  bgSound = loadSound("chudel hoon mein.wav")

}


function setup() {

  createCanvas(600, 400);

  bg = createSprite(300, 200, 600, 600);
  bg.addImage(bgImage);
  bg.scale = 1;
  bg.velocityX = -2;

  boy = createSprite(30, 300, 20, 20);
  boy.addAnimation("boy_standing", boyImage);
  boy.addAnimation("right", boyAnimRight);
  boy.addAnimation("left", boyAnimLeft);
  boy.addAnimation("up/down", boyAnimUpDown);
  boy.addAnimation("collided", boyCollide);
  boy.scale = 0.6;

  gameover = createSprite(250, 150, 20, 20);
  gameover.scale = 0.3;
  gameover.addImage("gameover", gameoverImage);
  gameover.visible = false;

  reset = createSprite(250, 250, 20, 20);
  reset.scale = 0.1;
  reset.addImage("reset", resetImage);
  reset.visible = false;
  
  coinsGroup = new Group();
  ghostsGroup = new Group();

}


function draw() {

  background(0);

  if (gamestate === play) {

    createCoins();
    createGhosts();

    //bgSound.play();
    
    if (bg.x < 0) {

      bg.x = bg.width / 2;

    }

    if (keyDown("LEFT_ARROW")) {

      boy.x = boy.x - 5;
      boy.changeAnimation("left", boyAnimLeft);

    }

    if (keyDown("RIGHT_ARROW")) {

      boy.x = boy.x + 5;
      boy.changeAnimation("right", boyAnimRight);
      
    }

    if (keyDown("UP_ARROW")) {

      boy.y = boy.y - 5;
      boy.changeAnimation("up/down", boyAnimUpDown);

    }

    if (keyDown("DOWN_ARROW")) {

      boy.y = boy.y + 5;
      boy.changeAnimation("up/down", boyAnimUpDown);

    }

    if (coinsGroup.isTouching(boy)) {

      score = score + 2;
      coinsGroup.destroyEach();
      sikkaSound.play();

    }

    if (ghostsGroup.isTouching(boy)) {

      mrityuSound.play();
      gamestate = end;
      
    }

  }

  if (gamestate === end) {

    gameover.visible = true;
    reset.visible = true;

    ghostsGroup.setVelocityXEach = 0;
    ghostsGroup.setVelocityYEach = 0;
    coinsGroup.setVelocityXEach = 0;
    bg.velocityX = 0;

    ghostsGroup.destroyEach();
    coinsGroup.destroyEach();

    boy.changeAnimation("collided", boyCollide);

    if (mousePressedOver(reset)) {

      resetGame();
      gamestate = play;

    }

  }

  drawSprites();

  fill("red");
  textSize(25);
  textFont("Ink Free");
  text("SCORE: " + score, 300, 30)

}


function createCoins() {

  if (frameCount % 200 === 0) {

    coin = createSprite(300, 300, 20, 20);
    coin.y = Math.round(random(150, 300));
    coin.addImage(coinImage);
    coin.velocityX = -5;
    coin.scale = 0.02;


    boy.depth = coin.depth + 1;
    coin.setLifetime = 600;
    coinsGroup.add(coin);

  }

}


function createGhosts() {

  if (frameCount % 300 === 0) {

    ghost = createSprite(300, 300, 20, 20);
    ghost.x = Math.round(random(150, 400));
    ghost.y = Math.round(random(50, 350));
    ghost.addAnimation("ghost", ghostImage);
    ghost.scale = 0.07;
    ghost.velocityX = -9;

    ghost.setLifetime = 800;
    ghostsGroup.add(ghost);

  }

}

function resetGame() {

  score = 0;

  boy.changeAnimation("boy_standing", boyImage);

  bg.velocityX = -2;

  gameover.visible = false;
  reset.visible = false;

}