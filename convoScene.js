const Phaser = require('phaser');
import {gameState} from "./game.js"

let timedEvent;
let game;

class ConvoScene extends Phaser.Scene {
    constructor() {
      super({
        key: 'ConvoScene'
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
          const optionBox = scene.add.rectangle(150 + i * 130, 700, 200, 100, 0xb39c0e, 0)
          optionBox.strokeColor = 0xb39c0e;
          optionBox.strokeWeight = 2;
          optionBox.strokeAlpha = 1;
          optionBox.isStroked = true;
          optionBox.setOrigin(0, 0)
      
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
        credit: VSCode
        link: https://code.visualstudio.com/docs/editor/userdefinedsnippets
        */    
      const convo = [
          {
          character: 'triAngle',
          page: 1,
          narrative: 'Yo wassup',
          admin: 'generalGas',
          options: [
          {option: 'You must save the base TriAngle', nextPage:2},
          {option: 'Help us TriAngle, you are our only hope', nextPage:2}
          ]
          },
          {
          character: 'triAngle',
          page: 2 ,
          narrative: 'Why should I do that?',
          admin: 'generalGas',
          options: [
          {option: 'Because we have given unto you your life, and we need you to aid us now!', nextPage:3},
          {option: 'Please TriAngle, if you fail us, you too shall fall to the wrath of the One of Infinite Angles.', nextPage:4}
          ]
          },
          {
          character: 'triAngle',
          page: 3,
          narrative: 'That seams like a very good reason, but really, what\'s in it for me?',
          admin: 'generalGas',
          options: [
          {option: 'The One of Infinite Angles searches for all our destruction, yours included. This base is the last hope.', nextPage:4}
          ]
          },
          {
          character: 'triAngle',
          page: 4,
          narrative: 'That seams bad.',
          admin: 'generalGas',
          options: [
          {option: 'It is indeed Dire! Will you save us?', nextPage:5},
          {option: 'Once again TriAngle, help us, for you are our only hope', nextPage:5}
          ]
          },
          {
          character: 'triAngle',
          page: 5,
          narrative: 'Alright then, let\'s do this!',
          admin: 'generalGas',
          options: [
          {option: 'Thank You', nextPage:6},
          ]
          },
          {
          character: 'triAngle',
          page: 6,
          narrative: 'Don\'t thank me just yet. I gotta save your ass first.',
          admin: 'generalGas',
          options: [
          {option: '...', nextPage:5},
          ]
          },
      ];

      return convo.find(function(e) { if(e.page == page) return e });
    }




};

update(){

};
};

module.exports = {ConvoScene};