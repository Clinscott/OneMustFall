const Phaser = require('phaser');
import { Scene } from "phaser";
import {gameState} from "../levels/gameScene"

let timedEvent;
let game;

class ConvoScene1 extends Phaser.Scene {
    constructor() {
      super({
        key: 'ConvoScene1'
      })
    }

preload(){

};

create(){
  game = this;
    const base = this.physics.add.sprite(25, 450, 'triBase').setScale(12).setImmovable();

    /*
    description: A tilemap for the top and bottom of the screen.
    credit: Micheal Hadley over on medium was instrumental for this.
    link: https://medium.com/@michaelwesthadley/modular-game-worlds-in-phaser-3-tilemaps-1-958fc7e6bbd6
    */
    const triComData = [[0, 1, 1, 1, 1, 1, 1, 1, 1, 2]]
    const triComMap = this.make.tilemap({data: triComData, tileWidth: 32, tileHeight: 32});
    const triComMapTwo = this.make.tilemap({data: triComData, tileWidth: 32, tileHeight: 32});
    const triComTiles = triComMap.addTilesetImage('triComs');
    const triComLayerBottom = triComMap.createLayer(0, triComTiles, 0, 644).setScale(4);
    const triComLayerTop = triComMapTwo.createLayer(0, triComTiles, 0, 0).setScale(4);
    
    
      gameState.player = this.physics.add.sprite(275, 445, 'triFighter').setScale(.5);
      //this.physics.world.setBounds(64, 256, 1152, 384);
      //gameState.player.setCollideWorldBounds(true);
      gameState.music = this.sound.add('theme');
      //gameState.music.play();

      /*
      description: Conversation functions with animation display and choice.
      credit: This mostly learned once again through codeCademy's PhaserJS course, through building thier narrative game. 
              It has been modified for my game, but the credit is thiers. Learning to impliment it was fun though.
      link: https://github.com/Clinscott/CodeCademy/tree/main/phaserjs/narrativegame
      */
      
      renderTriCharacter(this, 'triAngle');
      renderAdmin(this, 'generalGas');
      initializePage(this);
      const firstPage = getPage(1);
      displayPage(this, firstPage);

gameState.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
gameState.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

gameState.aKey.on('up', function(){
  console.log('a in create');
})

gameState.dKey.on('up', function(){
  console.log('d in create');
})

      function renderTriCharacter(scene, key){
        if(gameState.triCharacter){
          gameState.triCharacter.destroy();
        }
        gameState.triCharacter = scene.add.sprite(1216, 64);
        //gameState.character.setOrigin(.5, 1);
        gameState.triCharacter.setScale(4);
        gameState.triCharacter.play(key);
      }

      function renderAdmin(scene, key){
        if(gameState.admin){
          gameState.admin.destroy();
        }
        gameState.admin = scene.add.sprite(64, 708);
        gameState.admin.setScale(4);
        gameState.admin.play(key);
      };

      function initializePage(scene) {
        // create options list and background
        // and saves them into gameState
      
        if (!gameState.options) {
          // create options list
          // if it doesn't exist
          gameState.options = [];
        }
      
        /* if (!gameState.narrative_background) {
          // create narrative background
          // if it doesn't exist
          gameState.narrative_background = scene.add.rectangle(10, 360, 430, 170, 0x000);
        gameState.narrative_background.setOrigin(0, 0);
        } */
      }
      function destroyPage() {
        // wipe out narrative text and options
      
        if (gameState.narrative) {
          // destroy narrative if it exists
          gameState.narrative.destroy();
        }
      
        for (let option of gameState.options) {
          // destroy options if they exist
          option.optionBox.destroy();
          option.optionText.destroy();
        }
      }

      
      function displayPage(scene, page) {
        const narrativeStyle = { fill: '#000000', fontStyle: 'italic', align: 'center', wordWrap: { width: 380 }, lineSpacing: 8};
        // display general page character
        // & narrative here:
        renderTriCharacter(scene, page.character);
        
      
        gameState.narrative = scene.add.text(1050 - (page.narrative.length * 6), 32, page.narrative, narrativeStyle);

        // for-loop creates different options
        // need the index i for spacing the boxes
        for (let i=0; i<page.options.length; i++) {
          let option = page.options[i];
      
          // color in the option box
          const optionBox = scene.add.rectangle(128, 675 + i * 32, 20, 20, 0xb39c0e, 0)
          optionBox.strokeColor = 0xb39c0e;
          optionBox.strokeWeight = 2;
          optionBox.strokeAlpha = 1;
          optionBox.isStroked = true;
          optionBox.setOrigin(0, 0)
        
       

           /*
          if(gameState.aKey){
            optionKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A).isUp
            optionKey.on('up', function (){
              const newPage = this.option.nextPage;
              if (newPage !== undefined){
                renderAdmin(scene, page.admin);
                timedEvent = scene.time.delayedCall(500, ()=>{
                 destroyPage();
                 displayPage(scene, getPage(newPage));
               }, [], scene);
               if (newPage === 6){
                 destroyPage();
                 displayPage(scene, getPage(newPage));
                 timedEvent = scene.time.delayedCall(3000,()=>{
                   game.scene.stop('ConvoScene');
                   game.scene.start('GameScene');
                 }, scene, game);
               }
              }
             }, { option });
          }else if(gameState.dKey){
            optionkey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D).isUp;
            optionKey.on('up', function (){
              const newPage = this.option.nextPage;
              if (newPage !== undefined){
                renderAdmin(scene, page.admin);
                timedEvent = scene.time.delayedCall(500, ()=>{
                 destroyPage();
                 displayPage(scene, getPage(newPage));
               }, [], scene);
               if (newPage === 6){
                 destroyPage();
                 displayPage(scene, getPage(newPage));
                 timedEvent = scene.time.delayedCall(3000,()=>{
                   game.scene.stop('ConvoScene');
                   game.scene.start('GameScene');
                 }, scene, game);
               }
              }
             }, { option });
          }
 */
/* 
          const optionBoxTextA = scene.add.text(132, 678, 'A', narrativeStyle);
          const optionBoxTextS = scene.add.text(132, 710, 'D', narrativeStyle);
 */

          
      
          // add in the option text
          const baseY = 675 + i * 30;
          const baseX = 175
          const optionText = scene.add.text(baseX, baseY, option.option, { fontSize:14, fill: '#000000', align: 'centre', wordWrap: {width: 800}});
          const optionTextBounds = optionText.getBounds()
      
          // centering each option text
          //optionText.setX(optionTextBounds.x + 55 + (optionTextBounds.width / 2));
          optionText.setY(optionTextBounds.y + 10 - (optionTextBounds.height / 2));
      
          // add in gameplay functionality
          // for options here
          
          optionBox.setInteractive();

          optionBox.on('pointerup', function(){
           const newPage = this.option.nextPage;
           if (newPage !== undefined){
             renderAdmin(scene, page.admin);
             timedEvent = scene.time.delayedCall(500, ()=>{
              destroyPage();
              displayPage(scene, getPage(newPage));
            }, [], scene);
            if (newPage === 12){
              destroyPage();
              displayPage(scene, getPage(newPage));
              timedEvent = scene.time.delayedCall(3000,()=>{
                game.scene.stop('ConvoScene1');
                game.scene.start('GameScene1');
              }, scene, game);
            }
           }
          }, { option });

          optionBox.on('pointerover', function (){
            this.optionBox.setStrokeStyle(2, 0xffe014, 1);
            this.optionText.setColor('#000000');
          }, { optionBox, optionText });

          optionBox.on('pointerout', function (){
            this.optionBox.setStrokeStyle(1, 0xb38c03, 1);
            this.optionText.setColor('#000000');
          }, { optionBox, optionText });
      
          gameState.options.push({
            optionBox,
            optionText
          });
      
        }
      }

      function getPage(page){

        /*
        description: Each object within the convo array is a snippet. This was my first snippet, each input is a seperate tabable
                    event. Snippets rock, learn snippets. This comment is a snippet
        credit:     VSCode
        link:       https://code.visualstudio.com/docs/editor/userdefinedsnippets
        */    
      const convo = [
          {
          character: 'triAngle',
          page: 1,
          narrative: 'Well. I did it. I saved your butts.',
          admin: 'generalGas',
          options: [
          {key: 'A', option: 'We are ever gratefull triAngle.', nextPage:2},
          {key: 'D', option: 'You are a true hero triAngle.', nextPage:2}
          ]
          },
          {
          character: 'triAngle',
          page: 2 ,
          narrative: 'So what did I get out of that? Other than being awesome.',
          admin: 'generalGas',
          options: [
          {key: 'A', option: 'With those angles you picked up we can improve you. But at a cost.', nextPage:3},
          ]
          },
          {
          character: 'triAngle',
          page: 3,
          narrative: 'Oh? Really? Like How?',
          admin: 'generalGas',
          options: [
          {key: 'A', option: 'We can make you take more damage.', nextPage:4},
          {key: 'D', option: 'We can make the base safer.', nextPage:5},
          {key: 'D', option: 'We can make your attacks more effective.', nextPage:6}
          ]
          },
          {
          character: 'triAngle',
          page: 4,
          narrative: 'I feel Tougher. Can we improve anything else?',
          admin: 'generalGas',
          options: [
          {key: 'A', option: 'We can make the base safer.', nextPage:7},
          {key: 'D', option: 'We can make your attacks more effective.', nextPage:8}
          ]
          },
          {
          character: 'triAngle',
          page: 5,
          narrative: 'The Base looks much mightier! Can we improve anything else?',
          admin: 'generalGas',
          options: [
          {key: 'A', option: 'We can make you take more damage.', nextPage:9},
          {key: 'D', option: 'We can make your attacks more effective.', nextPage:8}
          ]
          },
          {
          character: 'triAngle',
          page: 6,
          narrative: 'I have true fists of fury now! Can we improve anything else?',
          admin: 'generalGas',
          options: [
          {key: 'A', option: 'We can make you take more damage.', nextPage:9},
          {key: 'D', option: 'We can make the base safer.', nextPage:7}
          ]
          },
          {
          character: 'triAngle',
          page: 7,
          narrative: 'The Base looks much mightier! Can we improve anything else?',
          admin: 'generalGas',
          options: [
          {key: 'A', option: 'I am afraid not. We need more angles to improve something else.', nextPage:10},
          ]
          },
          {
          character: 'triAngle',
          page: 8,
          narrative: 'I have true fists of fury now! Can we improve anything else?',
          admin: 'generalGas',
          options: [
          {key: 'A', option: 'I am afraid not. We need more angles to improve something else.', nextPage:10},
          ]
          },
          {
          character: 'triAngle',
          page: 9,
          narrative: 'I feel tougher, like an Ox. Can we improve anything else?',
          admin: 'generalGas',
          options: [
          {key: 'A', option: 'I am afraid not. We need more angles to improve something else.', nextPage:10},
          ]
          },
          {
          character: 'triAngle',
          page: 10,
          narrative: 'How do I get more angles?',
          admin: 'generalGas',
          options: [
          {key: 'A', option: 'Have no fear, for the enemy builds anew. Soon they will come again', nextPage:11},
          ]
          },
          {
          character: 'triAngle',
          page: 11,
          narrative: 'Bring em on! That was almost too easy last time.',
          admin: 'generalGas',
          options: [
          {key: 'A', option: '*mumbling* That is what the last one said.', nextPage:12},
          ]
          },
          {
          character: 'triAngle',
          page: 12,
          narrative: 'I am gonna become The triFighter!',
          admin: 'generalGas',
          options: [
          {key: 'A', option: 'We hope so.', nextPage:12},
          {key: 'D', option: 'May we be forgiven for what we had to do...', nextPage:12}
          ]
          }
      ];

      return convo.find(function(e) { if(e.page == page) return e });
    }




};

update(){
 /*  const aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A).isDown;
  const dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D).isDown;

  if (aKey){
    gameState.aKey = true;
    console.log('A hit in update');
  }else{
    gameState.akey = false;
  }

  if(dKey){
    gameState.dKey = true;
    console.log('D hit in update');
  }else{
    gameState.dKey = false;
  } */

};
};

module.exports = {ConvoScene1};
export {gameState};
