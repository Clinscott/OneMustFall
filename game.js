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
    this.load.spritesheet('triFighter', './assets/triFighter/triFighter.png', { frameWidth: 256, frameHeight: 256});
    this.load.spritesheet('fight', './assets/fight.png', { frameWidth: 256, frameHeight: 256});
}

function create(){
    gameState.information = this.add.sprite(800, 200, 'fight');
    gameState.player = this.physics.add.sprite(150, 600, 'triFighter').setScale(.8);
    this.physics.world.setBounds()
}

function update(){
// Arrow keys that will move Bob in 4 directions
const cursors = this.input.keyboard.createCursorKeys();
// Add variables that store if a specific arrow key is being pressed
const rightArrow = cursors.right.isDown;
const leftArrow = cursors.left.isDown;
const upArrow = cursors.up.isDown;
const downArrow = cursors.down.isDown;

if(rightArrow && upArrow){
    moveTriUpRight();
} else if(leftArrow && upArrow){
    moveTriUpLeft();
}else if(rightArrow){
    moveTriRight();
} else if(leftArrow){
    moveTriLeft()
} else if(upArrow){
    moveTriUp();
}else if(downArrow){
    moveTriDown();
}else{
    stopTri();
}

const triXCoord = gameState.player.x;
const triYCoord = gameState.player.y;

    // Helper functions to move Bob in 4 directions
    function moveTriRight() {
        gameState.player.flipX = false;
        gameState.player.setTexture('triFighter');
        gameState.player.setVelocityX(150 * gameState.playerSpeed);
        gameState.player.setVelocityY(0);
      }
  
      function moveTriLeft() {
        // NOTE: By default Bob looks to the right so we flip the image if moving left
        gameState.player.flipX = false;
        gameState.player.setTexture('triFighter');
        gameState.player.setVelocityX(-150 * gameState.playerSpeed);
        gameState.player.setVelocityY(0);
      }
  
      function moveTriUp() {
        gameState.player.flipX = false;
        gameState.player.setTexture('triFighter');
        gameState.player.setVelocityX(0);
        gameState.player.setVelocityY(-150 * gameState.playerSpeed);
      }
  
      function moveTriDown() {
        gameState.player.flipX = false;
        gameState.player.setTexture('triFighter');
        gameState.player.setVelocityX(0);
        gameState.player.setVelocityY(150 * gameState.playerSpeed);
      }

      function moveTriUpRight(){
          gameState.player.flipX = false;
          gameState.player.setTexture('triFighter');
          gameState.player.setVelocityX(150 * gameState.playerSpeed);
          gameState.player.setVelocityY(-150 * gameState.playerSpeed);
      }

      function moveTriUpLeft(){
          gameState.player.flipX = false;
          gameState.player.setTexture('triFighter');
          gameState.player.setVelocityX(-150 * gameState.playerSpeed);
          gameState.player.setVelocityY(-150 * gameState.playerSpeed);
      }
      
      function stopTri(){
          gameState.player.flipX = false;
          gameState.player.setTexture('triFighter');
          gameState.player.setVelocityX(0);
          gameState.player.setVelocityY(0);
      }
    }


const config = {
    type: Phaser.AUTO,
    width: 1600,
    height: 900,
    backgroundColor: 0x4297f1,
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
        }}
};

if (module.hot){
    module.hot.accept();
}

const game = new Phaser.Game(config);

