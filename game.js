const Phaser = require("phaser");
const {GameScene} = require('./gameScene');
const {EndScene} = require('./endScene');

const config = {
    type: Phaser.AUTO,
    width: 1282,
    height: 772,
    backgroundColor: 0x4297f1,
    pixelArt: true,
    scene: [GameScene],
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            enableBody: true,
            x: 0,
            y: 0,
            width: 1282,
            height: 772
            //gravity: { x: -100 }
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

module.exports = game;

