const Phaser = require("phaser");
const {GameScene} = require('./gameScene');
const {EndScene} = require('./endScene');
const {StartScene} = require('./startScene');
const {ConvoScene} = require('./convoScene');
const {MenuScene} = require('./menuScene');
const {PreloadScene} = require('./preloadScene');

let gameState = {
    player: {},
    playerSpeed: 2,
    computer: {},
    computerSpeed: 3,
    computerSprite: {},
    angleSprite: {},
    playerHealthBar: {},
    computerHealthBar: {},
    triAngles: {},
    triAnglesInformation: {},
    information: {},
    playerMove: {},
    playerInformation: {},
    computerInformation: {},
    computerMove: {},
    waveCount: 0,
    opponents: [],
    baseHealthBar: {},
    numCoordinates: {},
    timer: 60
  };

let timedEvent;
let randomCoord;

const config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 772,
    backgroundColor: 0x4297f1,
    pixelArt: true,
    scene: [
        PreloadScene,
        StartScene,
        MenuScene, 
        GameScene, 
        ConvoScene,
        EndScene],
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            enableBody: true,
            x: 0,
            y: 0,
            width: 1280,
            height: 772
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

export {gameState};



