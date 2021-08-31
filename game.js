/*
description: Thanks for taking a look at my game triFighter. It is a super fun and wild ride learning how everything
            works. If you are looking at this game and making your own phaserjs game awesome! I only have one piece of 
            advice to add, especially if you are new to coding. If you are not taking a course on how to
            build a game, I highly suggest it, and if you are, don't be afraid to jump in and out from it to your game.
            While I stumbled more when not directly following the course material I found I learned so much more aside
            from phaser. Then when I jumped back into the course, after my stumbles led to complete road blocks, everything
            was so much clearer.
credit: codecademy phaserjs course
link: https://github.com/Clinscott/OneMustFall
further: Best reference along with phasers main website is rexrainbows site with phaser 3 notes. Solid references.
link: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/
*/  

const Phaser = require("phaser");
const {GameScene} = require('./triFighter/levels/gameScene');
const {EndScene} = require('./triFighter/navigation/endScene');
const {StartScene} = require('./triFighter/navigation/startScene');
const {ConvoScene} = require('./triFighter/storyLine/convoScene');
const {MenuScene} = require('./triFighter/navigation/menuScene');
const {PreloadScene} = require('./triFighter/navigation/preloadScene');

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
        MenuScene,
        StartScene,
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



