const Phaser = require('phaser');
import {gameState} from "../../game.js";

class MenuScene extends Phaser.Scene {
    constructor() {
      super({
        key: 'MenuScene'
      });
    }

preload(){

}

create(){
  this.add.text(95, 250, 'Press T to Start Game!!', { fontSize: '30px', fill: '#000000' });
  this.add.text(95, 350, 'Press M to exit Game.', {fontSize: '30px', fill: '#000000'});

}

update(){
  const tKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
  const mKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
  
  tKey.on('up', () => {
    gameState.timer = 60;
    loadGame();
  });

  const loadGame =()=>{
    this.scene.stop('MenuScene');
    this.scene.start('StartScene');
};

  mKey.on('up', ()=>{
    this.scene.stop('MenuScene');
    this.scene.start('EndScene');
  });

}

}

module.exports = {MenuScene};