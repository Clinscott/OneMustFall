const Phaser = require('phaser');
import {gameState} from "./game.js"

class MenuScene extends Phaser.Scene {
    constructor() {
      super({
        key: 'MenuScene'
      })
    }

preload(){

};

create(){
  this.add.text(95, 250, 'Press T to Return to Start Menu', { fontSize: '30px', fill: '#000000' });
  this.add.text(95, 350, 'Press M to exit Menu', {fontSize: '30px', fill: '#000000'});
  const qKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
  const mKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
  
  qKey.on('keyUp', () => {
    gameState.timer = 60;
    this.scene.stop('StartScene');
    this.scene.start('ConvoScene');
  });

  mKey.on('keyUp', ()=>{
    this.scene.stop('MenuScene');
    this.scene.start('StartScene');
  })
};

update(){

};

};

module.exports = {MenuScene};