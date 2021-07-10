const Phaser = require("phaser");

let gameState = {
    player: {},
    playerSpeed: 2,
    computer: {},
    computerSpeed:{},
    computerSprite: {},
    playerHealthBar: {},
    computerHealthBar: {},
    attackButton: {},
    defendButton: {},
    specialButton: {},
    information: {},
    playerMove: {},
    computerMove: {},
    waveCount: 0,
    opponents: []
  };
  
function preload(){
    this.load.spritesheet('triFighter', './assets/triFighter/triFighterFullMoveSet.png', { frameWidth: 256, frameHeight: 256, endFrame: 16});
    this.load.spritesheet('fight', './assets/fight.png', { frameWidth: 256, frameHeight: 256});
    this.load.audio('theme', './assets/music/omfTheme.mp3');
}

function create(){
    gameState.information = this.add.sprite(800, 200, 'fight');
    gameState.player = this.physics.add.sprite(150, 600, 'triFighter').setScale(1);
    this.physics.world.setBounds(100, 100, 1500, 700);
    gameState.player.setCollideWorldBounds(true);
    gameState.player.body.collideWorldBounds = true;
    gameState.music = this.sound.add('theme');
    gameState.music.play();

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
        frames: this.anims.generateFrameNumbers('triFighter', {frames: [10, 11, 12, 0]}),
        frameRate: 10,
        repeat: 0
    });

    
}

function update(){
// Arrow keys that will move tri in 4 directions
const cursors = this.input.keyboard.createCursorKeys();
// Add variables that store if a specific arrow key is being pressed
const rightArrow = cursors.right.isDown;
const leftArrow = cursors.left.isDown;
const upArrow = cursors.up.isDown;
const downArrow = cursors.down.isDown;

const spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE).isDown;
    
if(spaceKey){
    triPunch();
    return;
}else if(rightArrow && upArrow){
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



const triXCoord = gameState.player.x;
const triYCoord = gameState.player.y;

    // Helper functions to move tri in 8 directions
    function moveTriRight() {
        gameState.player.flipX = false;
        gameState.player.play('triMoveRight');
        gameState.player.setVelocityX(150 * gameState.playerSpeed);
        gameState.player.setVelocityY(0);
      };
  
      function moveTriLeft() {
        gameState.player.flipX = false;
        gameState.player.play('triMoveLeft');
        gameState.player.setVelocityX(-150 * gameState.playerSpeed);
        gameState.player.setVelocityY(0);
      };
  
      function moveTriUp() {
        gameState.player.flipX = false;
        gameState.player.play('triMoveUp');
        gameState.player.setVelocityX(0);
        gameState.player.setVelocityY(-150 * gameState.playerSpeed);
      };
  
      function moveTriDown() {
        gameState.player.flipX = false;
        gameState.player.play('triMoveDown');
        gameState.player.setVelocityX(0);
        gameState.player.setVelocityY(150 * gameState.playerSpeed);
      };

      function moveTriUpRight(){
          gameState.player.flipX = false;
          gameState.player.play('triMoveUpRight');
          gameState.player.setVelocityX(100 * gameState.playerSpeed);
          gameState.player.setVelocityY(-100 * gameState.playerSpeed);
      };

      function moveTriUpLeft(){
          gameState.player.flipX = false;
          gameState.player.play('triMoveUpLeft');
          gameState.player.setVelocityX(-100 * gameState.playerSpeed);
          gameState.player.setVelocityY(-100 * gameState.playerSpeed);
      };

      function moveTriDownRight(){
          gameState.player.flipX = false;
          gameState.player.play('triMoveDownRight');
          gameState.player.setVelocityX(100 * gameState.playerSpeed);
          gameState.player.setVelocityY(100 * gameState.playerSpeed);
      };

      function moveTriDownLeft(){
          gameState.player.flipX = false;
          gameState.player.play('triMoveDownLeft');
          gameState.player.setVelocityX(-100 * gameState.playerSpeed);
          gameState.player.setVelocityY(100 * gameState.playerSpeed);
      };
      
      function stopTri(){
          gameState.player.setVelocityX(0);
          gameState.player.setVelocityY(0);
      };

      function triPunch(){
          gameState.player.flixX = false;
          gameState.player.play('triPunch', 10, true);
          gameState.player.setVelocityX(0);
          gameState.player.setVelocityY(0);
      };
    }


const config = {
    type: Phaser.AUTO,
    width: 1600,
    height: 900,
    backgroundColor: 0x4297f1,
    pixelArt: true,
    scene: {
        preload,
        create,
        update
    },
    physics: {
        default: 'arcade',
        arcade: {
          gravity: 300,
          enableBody: true,
          x: 0,
          y: 0,
          width: 1600,
          height:900
        },
    checkCollision:{
        up: true,
        down: true,
        left: true,
        right: true
    }}
};

if (module.hot){
    module.hot.accept();
}

const game = new Phaser.Game(config);

