const Phaser = require("phaser");
import { Scene } from "phaser";
import { gameState } from "../../game.js";
import { convo } from "./convo";
import punchSceneUpgrade from "./upgrade/components/punchSceneUpgrade";
import baseSceneUpgrade from "./upgrade/components/baseSceneUpgrade";
import healthSceneUpgrade from "./upgrade/components/healthSceneUpgrade";
import gameSceneTransfer from "./components/gameSceneTransfer";
import getData from "./components/getData";
import title from "../components/title";
import makeTriComs from "../components/makeTriComs.js";
import makeRoad from "../components/makeRoad";
import renderTriCharacter from "./components/renderTriCharacter.js";

let timedEvent;
let game;
let newPage;

class ConvoScene extends Phaser.Scene {
  constructor() {
    super({
      key: "ConvoScene",
    });
  }

  init(data) {
    console.log(data);
    gameState.playerInformation = {
      name: "TriFighter",
      punchLevel: data.punchLevel,
      health: data.playerHealth,
      baseHealth: data.baseHealth,
      baseLevel: data.baseLevel,
    };

    gameState.triAnglesInformation = {
      total: data.triAnglesTotal,
    };
    gameState.timer = data.timer;
    console.log("GameState:");
    console.log({ ...gameState });
    if (!data.page) {
      newPage = 1;
    } else {
      newPage = data.page;
    }
  }
  preload() {}

  create() {
    game = this;
    //const background = this.add.image(0,0,"triFighterBackground");

    title(game, 0, 0, 4);
    makeRoad(game, 100, 325, 1);

    const base = this.physics.add
      .sprite(25, 450, "triBase")
      .setScale(12)
      .setImmovable();

    /*
    description: A tilemap for the top and bottom of the screen.
    credit: Micheal Hadley over on medium was instrumental for this.
    link: https://medium.com/@michaelwesthadley/modular-game-worlds-in-phaser-3-tilemaps-1-958fc7e6bbd6
    */

    makeTriComs(game, 0, 644, 4);
    makeTriComs(game, 0, 128, 4);

    gameState.player = this.physics.add
      .sprite(275, 445, "triFighter")
      .setScale(0.5);
    //this.physics.world.setBounds(64, 256, 1152, 384);
    //gameState.player.setCollideWorldBounds(true);
    gameState.music = this.sound.add("theme");
    gameState.music.play();

    /*
      description: Conversation functions with animation display and choice.
      credit: This mostly learned once again through codeCademy's PhaserJS course, through building thier narrative game. 
              It has been modified for my game, but the credit is thiers. Learning to impliment it was fun though.
      link: https://github.com/Clinscott/CodeCademy/tree/main/phaserjs/narrativegame
      */

    renderTriCharacter(this, "triAngle");
    renderAdmin(this, "generalGas");
    initializePage(this);
    const firstPage = getPage(newPage);
    displayPage(this, firstPage);

    gameState.aKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.A
    );
    gameState.dKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.D
    );

    gameState.aKey.on("up", function () {
      console.log("a in create");
    });

    gameState.dKey.on("up", function () {
      console.log("d in create");
    });

    function renderAdmin(scene, key) {
      if (gameState.admin) {
        gameState.admin.destroy();
      }
      gameState.admin = scene.add.sprite(64, 708);
      gameState.admin.setScale(4);
      gameState.admin.play(key);
    }

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
      const narrativeStyle = {
        fill: "#000000",
        fontStyle: "italic",
        align: "center",
        wordWrap: { width: 380 },
        lineSpacing: 8,
      };
      // display general page character
      // & narrative here:
      renderTriCharacter(scene, page.character);

      gameState.narrative = scene.add.text(
        128,
        160,
        page.narrative,
        narrativeStyle
      );

      // for-loop creates different options
      // need the index i for spacing the boxes
      for (let i = 0; i < page.options.length; i++) {
        let option = page.options[i];

        // color in the option box
        const optionBox = scene.add.rectangle(
          128,
          675 + i * 32,
          20,
          20,
          0xb39c0e,
          0
        );
        optionBox.strokeColor = 0xb39c0e;
        optionBox.strokeWeight = 2;
        optionBox.strokeAlpha = 1;
        optionBox.isStroked = true;
        optionBox.setOrigin(0, 0);

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
        const baseX = 175;
        const optionText = scene.add.text(baseX, baseY, option.option, {
          fontSize: 14,
          fill: "#000000",
          align: "centre",
          wordWrap: { width: 800 },
        });
        const optionTextBounds = optionText.getBounds();

        // centering each option text
        //optionText.setX(optionTextBounds.x + 55 + (optionTextBounds.width / 2));
        optionText.setY(optionTextBounds.y + 10 - optionTextBounds.height / 2);

        // add in gameplay functionality
        // for options here

        optionBox.setInteractive();

        optionBox.on(
          "pointerup",
          function () {
            newPage = this.option.nextPage;
            console.log(newPage);
            if (newPage !== undefined) {
              console.log(newPage);
              renderAdmin(scene, page.admin);
              timedEvent = scene.time.delayedCall(
                500,
                () => {
                  destroyPage();
                  displayPage(scene, getPage(newPage));
                },
                [],
                scene
              );
            }
            if (newPage !== 6) {
              console.log(`Not 6. Page :${newPage}`);
            } else if (newPage === 6) {
              gameSceneTransfer(
                "GameScene",
                newPage,
                timedEvent,
                scene,
                gameState
              );
            }
            if (newPage !== 15 && newPage !== 10) {
              console.log(`Not 10 or 15. Page: ${newPage}`);
            } else if (newPage === 10 || newPage === 15) {
              gameSceneTransfer(
                "HealthScene",
                newPage,
                timedEvent,
                scene,
                gameState
              );
            }
            if (newPage !== 11 && newPage !== 13) {
              console.log(`Not 11 or 13. Page: ${newPage}`);
            } else if (newPage === 11 || newPage === 13) {
              gameSceneTransfer(
                "BaseScene",
                newPage,
                timedEvent,
                scene,
                gameState
              );
            }
            if (newPage !== 12 && newPage !== 14) {
              console.log(`Not 12 or 14. Page: ${newPage}`);
            } else if (newPage === 12 || newPage === 14) {
              gameSceneTransfer(
                "PunchScene",
                newPage,
                timedEvent,
                scene,
                gameState
              );
            }
          },
          { option }
        );

        optionBox.on(
          "pointerover",
          function () {
            this.optionBox.setStrokeStyle(2, 0xffe014, 1);
            this.optionText.setColor("#000000");
          },
          { optionBox, optionText }
        );

        optionBox.on(
          "pointerout",
          function () {
            this.optionBox.setStrokeStyle(1, 0xb38c03, 1);
            this.optionText.setColor("#000000");
          },
          { optionBox, optionText }
        );

        gameState.options.push({
          optionBox,
          optionText,
        });
      }
    }

    function getPage(page) {
      /*
        description: Each object within the convo array is a snippet. This was my first snippet, each input is a seperate tabable
                    event. Snippets rock, learn snippets. This comment is a snippet
        credit:     VSCode
        link:       https://code.visualstudio.com/docs/editor/userdefinedsnippets
        */

      return convo.find(function (e) {
        if (e.page == page) return e;
      });
    }
  }

  update() {
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
  }
}

module.exports = { ConvoScene };
