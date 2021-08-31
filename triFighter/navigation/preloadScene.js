const Phaser = require('phaser');
import {gameState} from "../../game.js"

class PreloadScene extends Phaser.Scene {
    constructor() {
      super({
        key: 'PreloadScene'
      })
    }

preload(){
/*
description:A loading bar page that loads all assets prior to game start.
credit: Scott Westover at gamedevacademy gets the credit here.
link: https://gamedevacademy.org/creating-a-preloading-screen-in-phaser-3/?a=13
*/

    let progressBar = this.add.graphics();
            let progressBox = this.add.graphics();
            let width = this.cameras.main.width;
            let height = this.cameras.main.height;
            progressBox.fillStyle(0x222222, 0.8);
            progressBox.fillRect(width/2-170, height/2-75, 320, 50);
            
          
            let loadingText = this.make.text({
                x: width / 2,
                y: height / 2 - 50,
                text: 'Loading...',
                style: {
                    font: '20px monospace',
                    fill: '#ffffff'
                }
            });
            loadingText.setOrigin(0.5, 0.5);
            
            let percentText = this.make.text({
                x: width / 2,
                y: height / 2 - 5,
                text: '0%',
                style: {
                    font: '18px monospace',
                    fill: '#ffffff'
                }
            });
            percentText.setOrigin(0.5, 0.5);
            
            let assetText = this.make.text({
                x: width / 2,
                y: height / 2 + 50,
                text: '',
                style: {
                    font: '18px monospace',
                    fill: '#ffffff'
                }
            });
            assetText.setOrigin(0.5, 0.5);
            
            this.load.on('progress', function (value) {
                percentText.setText(parseInt(value * 100) + '%');
                progressBar.clear();
                progressBar.fillStyle(0xffffff, 1);
                progressBar.fillRect(width/2-160, height/2-65, 300 * value, 30);
            });
            
            this.load.on('fileprogress', function (file) {
                assetText.setText('Loading asset: ' + file.key);
            });
            this.load.on('complete', function () {
                destroyBar();
                loadGame();
            });
    
    const destroyBar = ()=>{
        progressBar.destroy();
        progressBox.destroy();
        loadingText.destroy();
        percentText.destroy();
        assetText.destroy();
    };
    
    const loadGame =()=>{
        this.scene.stop('PreloadScene');
        this.scene.start('MenuScene');
    };

    this.load.spritesheet('triFighter', './assets/triFighter/triFighterFullMoveSet.png', { frameWidth: 256, frameHeight: 256, endFrame: 16});
    this.load.spritesheet('fight', './assets/fight.png', { frameWidth: 256, frameHeight: 256});
    this.load.audio('theme', './assets/music/omfTheme.mp3');
    this.load.spritesheet('squareFighter', './assets/squareFighter/squareFighterMoves.png', {frameWidth: 32, frameHeight: 32, endFrame:10});
    this.load.spritesheet('triBase', './assets/base/triFighterBase.png', {frameWidth: 32, frameHeight: 32, endFrame:3});
    this.load.image('triComs', './assets/textMenu.png')//, {frameWidth: 32, frameHeight: 32, endFrame: 6});
    this.load.spritesheet('genTriComs', './assets/textMenu.png', {frameWidth: 32, frameHeight: 32, endFrame: 6});
};

create(){

    /*
    description: Animations for the game
    credit: codecademy's PhaserJS course. Solid learning site. Everything I have learned there linked below.
    link: https://github.com/Clinscott/CodeCademy
    */

    this.anims.create({
        key: 'triStop',
        frames: this.anims.generateFrameNumbers('triFighter', {frames: [0]}),
        frameRate: 10,
        repeat: 0
      });
  
      this.anims.create({
          key: 'triMoveUp',
          frames: this.anims.generateFrameNumbers('triFighter', {frames: [1, 0]}),
          frameRate:8,
          repeat: 0
      });
  
      this.anims.create({
          key: 'triMoveRight',
          frames: this.anims.generateFrameNumbers('triFighter', {frames: [2, 0]}),
          frameRate: 8,
          repeat: 0
      });
  
      this.anims.create({
          key: 'triMoveDown',
          frames: this.anims.generateFrameNumbers('triFighter', {frames: [3, 0]}),
          frameRate: 8,
          repeat: 0
      });
  
      this.anims.create({
          key: 'triMoveLeft',
          frames: this.anims.generateFrameNumbers('triFighter', {frames: [4, 0]}),
          frameRate: 8,
          repeat: 0
      });
  
      this.anims.create({
          key: 'triMoveUpRight',
          frames: this.anims.generateFrameNumbers('triFighter', {frames: [15, 0]}),
          frameRate: 10,
          repeat: 0
      });
  
      this.anims.create({
          key: 'triMoveUpLeft',
          frames: this.anims.generateFrameNumbers('triFighter', {frames: [16, 0]}),
          frameRate: 10,
          repeat: 0
      });
  
      this.anims.create({
          key: 'triMoveDownRight',
          frames: this.anims.generateFrameNumbers('triFighter', {frames: [14, 0]}),
          frameRate: 10,
          repeat: 0
      });
  
      this.anims.create({
          key: 'triMoveDownLeft',
          frames: this.anims.generateFrameNumbers('triFighter', {frames: [13, 0]}),
          frameRate: 10,
          repeat: 0
      });
  
      this.anims.create({
          key: 'triPunch',
          frames: this.anims.generateFrameNumbers('triFighter', {frames: [10, 11, 12, 12, 11, 10, 0]}),
          frameRate: 15,
          repeat: 0
      });
  
      this.anims.create({
          key:'triKick',
          frames: this.anims.generateFrameNumbers('triFighter', {frames:[7, 8, 9, 9, 8, 7, 0]}),
          frameRate: 10,
          repeat: 0
      });
  
      this.anims.create({
        key:'squareRight',
        frames: this.anims.generateFrameNumbers('squareFighter', {frames:[1, 0]}),
        frameRate: 10,
        repeat: 0
      });
  
      this.anims.create({
        key:'squareDown',
        frames: this.anims.generateFrameNumbers('squareFighter', {frames:[2, 0]}),
        frameRate: 10,
        repeat: 0
      });
  
      this.anims.create({
        key:'squareLeft',
        frames: this.anims.generateFrameNumbers('squareFighter', {frames:[3]}),
        frameRate: 10,
        repeat: 0
      });
  
      this.anims.create({
        key:'squareUp',
        frames: this.anims.generateFrameNumbers('squareFighter', {frames:[4, 0]}),
        frameRate: 10,
        repeat: 0
      });
  
      this.anims.create({
        key:'squareHit',
        frames: this.anims.generateFrameNumbers('squareFighter', {frames:[5, 6, 7, 6, 5, 0]}),
        frameRate: 10,
        repeat: 0
      });
  
      this.anims.create({
        key:'squareDead',
        frames: this.anims.generateFrameNumbers('squareFighter', {frames:[5, 6, 7, 6, 7, 8, 9, 10]}),
        frameRate: 10,
        repeat: 0
      });
  
      this.anims.create({
        key: 'baseHit',
        frames: this.anims.generateFrameNumbers('triBase', {frames: [0, 1, 0]}),
        frameRate: 15,
        repeat: 5
      });

      this.anims.create({
        key: 'triAngle',
        frames: this.anims.generateFrameNumbers('genTriComs', {frames: [5, 6, 5]}),
        frameRate:8,
        repeat: 10
    });
    
    this.anims.create({
        key: 'generalGas',
        frames: this.anims.generateFrameNumbers('genTriComs', {frames: [3, 4, 3]}),
        frameRate: 8,
        repeat: 10
    });

};

update(){
};

};

module.exports = {PreloadScene};