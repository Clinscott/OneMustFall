const Phaser = require("phaser");

let gameState = {
    player: {},
    playerSpeed: 2,
    computer: {},
    computerSpeed: 1,
    computerSprite: {},
    angleSprite: {},
    playerHealthBar: {},
    computerHealthBar: {},
    attackButton: {},
    defendButton: {},
    specialButton: {},
    information: {},
    playerMove: {},
    playerInformation: {},
    computerInformation: {},
    computerMove: {},
    waveCount: 0,
    opponents: [],
    baseHealthBar: {},
    numCoordinates: {}
  };

const triXCoord = gameState.player.x;
const triYCoord = gameState.player.y;

const squareXCoord = gameState.computerSprite.x;
const squareYCoord = gameState.computerSprite.y;

let randomCoord;

class GameScene extends Phaser.Scene {
    constructor() {
      super({
        key: 'GameScene'
      })
    }
  
preload(){
    this.load.spritesheet('triFighter', './assets/triFighter/triFighterFullMoveSet.png', { frameWidth: 256, frameHeight: 256, endFrame: 16});
    this.load.spritesheet('fight', './assets/fight.png', { frameWidth: 256, frameHeight: 256});
    this.load.audio('theme', './assets/music/omfTheme.mp3');
    this.load.spritesheet('squareFighter', './assets/squareFighter/squareFighterMoves.png', {frameWidth: 32, frameHeight: 32, endFrame:10});
}

create(){
    gameState.information = this.add.sprite(640, 64, 'fight').setScale(.5);
    gameState.player = this.physics.add.sprite(256, 600, 'triFighter').setScale(.5);
    this.physics.world.setBounds(64, 256, 1152, 384);
    gameState.player.setCollideWorldBounds(true);
    gameState.player.body.collideWorldBounds = true;
    gameState.music = this.sound.add('theme');
    //gameState.music.play();
    gameState.playerMove.active = false;
    gameState.playerMove.activeHit = false;
    

    gameState.player.setCircle(46, 46, 100);

    randomCoord = assignComputerCoord();
    gameState.computerSprite = this.physics.add.sprite(randomCoord.x, randomCoord.y, 'squareFighter').setScale(2);
    gameState.computerSprite.setCollideWorldBounds(true);
    gameState.computerSprite.body.collideWorldBounds = true;
    gameState.computerSprite.setCircle(8, 7, 7);
    gameState.computerSprite.active = true;
    

    gameState.playerInformation = {
      name: 'TriFighter',
      health: 3
    };

    gameState.computerInformation = {
      name: 'SquareFighter',
      health: 40
    };

    const style = {
      font: '16px Helvetica',
      fill: '#000000',
      padding: {x: 6, y: 7}
    }
  
    gameState.playerHealthBar = this.add.text(45, 45, `HP: ${gameState.playerInformation.health}`, style);
    gameState.computerHealthBar = this.add.text(800, 45, `HP: ${gameState.computerInformation.health}`, style);
    
    this.physics.add.collider(gameState.player, gameState.computerSprite, ()=>{
   
    if(gameState.computerInformation.health > 0 && gameState.playerMove.activeHit){
      gameState.computerInformation.health -= 1;
      squareHit();
      gameState.computerHealthBar.text = `HP: ${gameState.computerInformation.health}`;
      }
      if(gameState.computerInformation.health == 0 && gameState.playerMove.activeHit){
        squareDead();
        return;
      }
      if(!gameState.computerSprite.active){

      }
    }
    );
   


    function generateComputerEntryCoord(){
      const coordX = 1184
      const coordY = Math.floor(Math.random()* 6) * 64 + 256;
      return {x: coordX, y: coordY};
    };

    function assignComputerCoord(){
      let assignedCoord = generateComputerEntryCoord();

      while(gameState.numCoordinates[`x${assignedCoord.x}y${assignedCoord.y}`]){
        assignedCoord = generateComputerEntryCoord();
      }

      gameState.numCoordinates[`x${assignedCoord.x}y${assignedCoord.y}`] = true;

      return assignedCoord;
    }

    gameState.playerMove.triMoveUp = this.anims.create({
        key: 'triMoveUp',
        frames: this.anims.generateFrameNumbers('triFighter', {frames: [1, 0]}),
        frameRate:8,
        repeat: 0
    });

    gameState.playerMove.triMoveRight = this.anims.create({
        key: 'triMoveRight',
        frames: this.anims.generateFrameNumbers('triFighter', {frames: [2, 0]}),
        frameRate: 8,
        repeat: 0
    });

    gameState.playerMove.triMoveDown = this.anims.create({
        key: 'triMoveDown',
        frames: this.anims.generateFrameNumbers('triFighter', {frames: [3, 0]}),
        frameRate: 8,
        repeat: 0
    });

    gameState.playerMove.triMoveLeft = this.anims.create({
        key: 'triMoveLeft',
        frames: this.anims.generateFrameNumbers('triFighter', {frames: [4, 0]}),
        frameRate: 8,
        repeat: 0
    });

    gameState.playerMove.triMoveUpRight = this.anims.create({
        key: 'triMoveUpRight',
        frames: this.anims.generateFrameNumbers('triFighter', {frames: [15, 0]}),
        frameRate: 10,
        repeat: 0
    });

    gameState.playerMove.triMoveUpLeft = this.anims.create({
        key: 'triMoveUpLeft',
        frames: this.anims.generateFrameNumbers('triFighter', {frames: [16, 0]}),
        frameRate: 10,
        repeat: 0
    });

    gameState.playerMove.triMoveDownRight = this.anims.create({
        key: 'triMoveDownRight',
        frames: this.anims.generateFrameNumbers('triFighter', {frames: [14, 0]}),
        frameRate: 10,
        repeat: 0
    });

    gameState.playerMove.triMoveDownLeft = this.anims.create({
        key: 'triMoveDownLeft',
        frames: this.anims.generateFrameNumbers('triFighter', {frames: [13, 0]}),
        frameRate: 10,
        repeat: 0
    });

    gameState.playerMove.triPunch = this.anims.create({
        key: 'triPunch',
        frames: this.anims.generateFrameNumbers('triFighter', {frames: [10, 11, 12, 12, 11, 10, 0]}),
        frameRate: 15,
        repeat: 0
    });

    gameState.playerMove.triKick = this.anims.create({
        key:'triKick',
        frames: this.anims.generateFrameNumbers('triFighter', {frames:[7, 8, 9, 9, 8, 7, 0]}),
        frameRate: 10,
        repeat: 0
    });

    gameState.computerMove.squareRight = this.anims.create({
      key:'squareRight',
      frames: this.anims.generateFrameNumbers('squareFighter', {frames:[1, 0]}),
      frameRate: 10,
      repeat: 0
    });

    gameState.computerMove.squareDown = this.anims.create({
      key:'squareDown',
      frames: this.anims.generateFrameNumbers('squareFighter', {frames:[2, 0]}),
      frameRate: 10,
      repeat: 0
    });

    gameState.computerMove.squareLeft = this.anims.create({
      key:'squareLeft',
      frames: this.anims.generateFrameNumbers('squareFighter', {frames:[3]}),
      frameRate: 10,
      repeat: 0
    });

    gameState.computerMove.squareUp = this.anims.create({
      key:'squareUp',
      frames: this.anims.generateFrameNumbers('squareFighter', {frames:[4, 0]}),
      frameRate: 10,
      repeat: 0
    });

    gameState.computerMove.squareHit = this.anims.create({
      key:'squareHit',
      frames: this.anims.generateFrameNumbers('squareFighter', {frames:[5, 6, 7, 6, 5, 0]}),
      frameRate: 10,
      repeat: 0
    });

    gameState.computerMove.squareDead = this.anims.create({
      key:'squareDead',
      frames: this.anims.generateFrameNumbers('squareFighter', {frames:[5, 6, 7, 6, 7, 8, 9, 10]}),
      frameRate: 10,
      repeat: 0
    });

  
  function squareHit(){
      gameState.computerSprite.play('squareHit', true);
  }
  function squareDead(){
    if(gameState.computerSprite.active){
    gameState.computerSprite.play('squareDead', true);
    gameState.computerSprite.setVelocityX(0);
    setTimeout(()=>{
      gameState.computerSprite.active = false;
    },1000)
    }
  }
}

update(){
  
// Arrow keys that will move tri in 4 directions
const cursors = this.input.keyboard.createCursorKeys();
// Add variables that store if a specific arrow key is being pressed
const rightArrow = cursors.right.isDown;
const leftArrow = cursors.left.isDown;
const upArrow = cursors.up.isDown;
const downArrow = cursors.down.isDown;

const aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A).isDown;
const sKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S).isDown;

if(aKey){
    triPunch();
}
if(sKey){
    triKick();
}

if(rightArrow && upArrow){
    moveTriUpRight();
}else if(leftArrow && upArrow){
    moveTriUpLeft();
}else if (rightArrow && downArrow){
    moveTriDownRight();
} else if(downArrow && leftArrow){
    moveTriDownLeft();
} else if(rightArrow){
    moveTriRight();
} else if(leftArrow){
    moveTriLeft()
} else if(upArrow){
    moveTriUp();
}else if(downArrow){
    moveTriDown();
} else {stopTri();}

if(gameState.computerInformation.health > 0){
  squareMove();
}

    // Helper functions to move tri in 8 directions
    function moveTriRight() {
        if(!gameState.playerMove.active){
        gameState.player.flipX = false;
        gameState.player.play('triMoveRight');
        gameState.player.setVelocityX(150 * gameState.playerSpeed);
        gameState.player.setVelocityY(0);}
      };
  
      function moveTriLeft() {
        if(!gameState.playerMove.active){
        gameState.player.flipX = false;
        gameState.player.play('triMoveLeft');
        gameState.player.setVelocityX(-150 * gameState.playerSpeed);
        gameState.player.setVelocityY(0);}
      };
  
      function moveTriUp() {
        if(!gameState.playerMove.active){
        gameState.player.flipX = false;
        gameState.player.play('triMoveUp');
        gameState.player.setVelocityX(0);
        gameState.player.setVelocityY(-150 * gameState.playerSpeed);}
      };
  
      function moveTriDown() {
        if(!gameState.playerMove.active){
        gameState.player.flipX = false;
        gameState.player.play('triMoveDown');
        gameState.player.setVelocityX(0);
        gameState.player.setVelocityY(150 * gameState.playerSpeed);}
      };

      function moveTriUpRight(){
        if(!gameState.playerMove.active){
          gameState.player.flipX = false;
          gameState.player.play('triMoveUpRight');
          gameState.player.setVelocityX(100 * gameState.playerSpeed);
          gameState.player.setVelocityY(-100 * gameState.playerSpeed);}
      };

      function moveTriUpLeft(){
        if(!gameState.playerMove.active){
          gameState.player.flipX = false;
          gameState.player.play('triMoveUpLeft');
          gameState.player.setVelocityX(-100 * gameState.playerSpeed);
          gameState.player.setVelocityY(-100 * gameState.playerSpeed);}
      };

      function moveTriDownRight(){
        if(!gameState.playerMove.active){
          gameState.player.flipX = false;
          gameState.player.play('triMoveDownRight');
          gameState.player.setVelocityX(100 * gameState.playerSpeed);
          gameState.player.setVelocityY(100 * gameState.playerSpeed);}
      };

      function moveTriDownLeft(){
        if(!gameState.playerMove.active){
          gameState.player.flipX = false;
          gameState.player.play('triMoveDownLeft');
          gameState.player.setVelocityX(-100 * gameState.playerSpeed);
          gameState.player.setVelocityY(100 * gameState.playerSpeed);}
      };
      
      function stopTri(){
          if(!gameState.playerMove.active){
          gameState.player.setVelocityX(0);
          gameState.player.setVelocityY(0);
        }
      };

      function triPunch(){
        if(!gameState.playerMove.active){
          gameState.playerMove.active = true;
          gameState.playerMove.activeHit = true;
          gameState.player.flipX = false;
          gameState.player.play('triPunch', true);
          gameState.player.setVelocityX(0);
          gameState.player.setVelocityY(0);
          setTimeout(()=>{
            gameState.player.setCircle(20, 125, 80)}, 50)
          setTimeout(()=>{
            gameState.player.setCircle(20, 150, 80)}, 150);
          setTimeout(()=>{
           gameState.player.setCircle(20, 185, 80)}, 175);
          setTimeout(()=>{
            gameState.player.setCircle(46, 46, 100)}, 250);
          setTimeout(() => {
            triHold()
          }, 400);}
      };

      function triKick(){
        if(!gameState.playerMove.active){
            gameState.player.flipX = false;
            gameState.player.play('triKick', true);
            gameState.player.setVelocityX(0);
            gameState.player.setVelocityY(0);
            gameState.playerMove.active = true;
            gameState.playerMove.activeHit = true;
            gameState.playerMove.activeHit = true;
            setTimeout(()=>{
              gameState.player.setCircle(20, 150, 160)}, 150)
            setTimeout(()=>{
              gameState.player.setCircle(20, 175, 160)}, 200);
            setTimeout(()=>{
             gameState.player.setCircle(20, 200, 160)}, 250);
            setTimeout(()=>{
              gameState.player.setCircle(46, 46, 100)}, 300);
             setTimeout(() => {
              triHold()}, 700);}
        };

      function triHold(){
          gameState.playerMove.active = false;
          gameState.playerMove.activeHit = false;
      };

      function squareHit(){
          gameState.computerSprite.play('squareHit', true);
      }
      function squareMove(){
        gameState.computerSprite.setVelocityX(-10);
        gameState.computerSprite.play('squareLeft', true);
      }
      
     
     
      
      //function squareStop(){gameState.computerSprite.anims.play('squareDead', true);}


    };
};

module.exports = {GameScene};