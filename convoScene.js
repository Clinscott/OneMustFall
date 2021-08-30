const Phaser = require('phaser');
import {gameState} from "./game.js"

class ConvoScene extends Phaser.Scene {
    constructor() {
      super({
        key: 'ConvoScene'
      })
    }

preload(){

};

create(){
    const base = this.physics.add.sprite(25, 450, 'triBase').setScale(12).setImmovable();
    const triComData = [[0, 1, 1, 1, 1, 1, 1, 1, 1, 2]]
    const triComMap = this.make.tilemap({data: triComData, tileWidth: 32, tileHeight: 32});
    const triComMapTwo = this.make.tilemap({data: triComData, tileWidth: 32, tileHeight: 32});
    const triComTiles = triComMap.addTilesetImage('triComs');
    const triComLayerBottom = triComMap.createLayer(0, triComTiles, 0, 644).setScale(4);
    const triComLayerTop = triComMapTwo.createLayer(0, triComTiles, 0, 0).setScale(4);
    
    
      gameState.player = this.physics.add.sprite(275, 445, 'triFighter').setScale(.5);
      this.physics.world.setBounds(64, 256, 1152, 384);
      gameState.player.setCollideWorldBounds(true);
      gameState.music = this.sound.add('theme');
      //gameState.music.play();
      //renderCharacter(this, 'triAngle');
      //initializePage(this);
      //const firstPage = getPage(1);
      //displayPage(this, firstPage);

      function renderCharacter(scene, key){
        if(gameState.character){
          gameState.character.destroy();
        }
        gameState.character = scene.add.sprite(270, 340);
        gameState.character.setOrigin(.5, 1);
        gameState.character.setScale(.7);
        gameState.character.play(key)
      }
      function initializePage(scene) {
        // create options list and background
        // and saves them into gameState
      
        if (!gameState.options) {
          // create options list
          // if it doesn't exist
          gameState.options = [];
        }
      
        if (!gameState.narrative_background) {
          // create narrative background
          // if it doesn't exist
          gameState.narrative_background = scene.add.rectangle(10, 360, 430, 170, 0x000);
        gameState.narrative_background.setOrigin(0, 0);
        }
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
        const narrativeStyle = { fill: '#ffffff', fontStyle: 'italic', align: 'center', wordWrap: { width: 340 }, lineSpacing: 8};
        
        // display general page character
        // & narrative here:
        renderCharacter(scene, page.character);
      
        gameState.narrative = scene.add.text(65, 380, page.narrative, narrativeStyle);
      
        // for-loop creates different options
        // need the index i for spacing the boxes
        for (let i=0; i<page.options.length; i++) {
          let option = page.options[i];
      
          // color in the option box
          const optionBox = scene.add.rectangle(40 + i * 130, 470, 110, 40, 0xb39c0e, 0)
          optionBox.strokeColor = 0xb39c0e;
          optionBox.strokeWeight = 2;
          optionBox.strokeAlpha = 1;
          optionBox.isStroked = true;
          optionBox.setOrigin(0, 0)
      
          // add in the option text
          const baseX = 40 + i * 130;
          const optionText = scene.add.text(baseX, 480, option.option, { fontSize:14, fill: '#b39c0e', align: 'center', wordWrap: {width: 110}});
          const optionTextBounds = optionText.getBounds()
      
          // centering each option text
          optionText.setX(optionTextBounds.x + 55 - (optionTextBounds.width / 2));
          optionText.setY(optionTextBounds.y + 10 - (optionTextBounds.height / 2));
      
          // add in gameplay functionality
          // for options here
          
          optionBox.setInteractive();
          optionBox.on('pointerup', function(){
           const newPage = this.option.nextPage;
           if (newPage !== undefined){
             destroyPage();
             displayPage(scene, fetchPage(newPage));
           }
          }, { option });
          optionBox.on('pointerover', function (){
            this.optionBox.setStrokeStyle(2, 0xffe014, 1);
            this.optionText.setColor('#ffe014');
          }, { optionBox, optionText });
              optionBox.on('pointerout', function (){
            this.optionBox.setStrokeStyle(1, 0xb38c03, 1);
            this.optionText.setColor('#b39c0e');
          }, { optionBox, optionText });
      
          gameState.options.push({
            optionBox,
            optionText
          });
      
        }
      }

      function getPage(Page){
      const convo = [
          {
          character: 'triAngle',
          page: 1,
          Narrative: 'Yo wassup',
          options: [
          {option: 'You must save the base TriAngle', nextPage:2},
          {option: 'Help us TriAngle, you are our only hope', nextPage:2}
          ]
          },
          {
          character: 'triAngle',
          page: 2 ,
          Narrative: 'Why should I do that?',
          options: [
          {option: 'Because we have given unto you your life, and we need you to aid us now!', nextPage:3},
          {option: 'Please TriAngle, if you fail us, you too shall fall to the wrath of the One of Infinite Angles.', nextPage:4}
          ]
          },
          {
          character: 'triAngle',
          page: 3,
          Narrative: 'That seams like a very good reason, but really, what\'s in it for me?',
          options: [
          {option: 'The One of Infinite Angles searches for all our destruction, yours included. This base is the last hope.', nextPage:5}
          ]
          },
          {
          character: 'triAngle',
          page: 5,
          Narrative: 'That seams bad.',
          options: [
          {option: 'It is indeed Dire! Will you save us?', nextPage:6},
          {option: 'We hope that ', nextPage:bar}
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