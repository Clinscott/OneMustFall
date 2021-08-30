const Phaser = require('phaser');
import {gameState} from "./game.js"


class EndScene extends Phaser.Scene {
    constructor() {
      super({
        key: 'EndScene'
      })
    }
preload(){

};

create(){
  gameState.timer = 60;
  this.anims.resumeAll();
  this.physics.resume();
  this.add.text(95, 250, 'Click to reStart!', { fontSize: '30px', fill: '#000000' });
  this.input.on('pointerup', () => {
    //gameState.timer = 60;
    this.scene.stop('EndScene');
    this.scene.start('GameScene');
  });

};

update(){

};

};

module.exports = {EndScene};