const Phaser = require("phaser");
const {GameScene} = require('./gameScene');

const config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 768,
    backgroundColor: 0x4297f1,
    pixelArt: true,
    scene: [GameScene],
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: 300,
            enableBody: true,
            x: 0,
            y: 0,
            width: 1280,
            height: 768
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

