const Phaser = require("phaser");
const { GameScene } = require("./triFighter/levels/gameScene");
const { EndScene } = require("./triFighter/navigation/endScene");
const { StartScene } = require("./triFighter/navigation/startScene");
const { ConvoScene } = require("./triFighter/storyLine/convoScene");
const { MenuScene } = require("./triFighter/navigation/menuScene");
const { PreloadScene } = require("./triFighter/navigation/preloadScene");
const { PunchScene } = require("./triFighter/storyLine/upgrade/PunchScene");
const { HealthScene } = require("./triFighter/storyLine/upgrade/HealthScene");
const { BaseScene } = require("./triFighter/storyLine/upgrade/BaseScene");

let gameState = {
  player: {},
  playerSpeed: 2,
  computer: {},
  computerSpeed: 3,
  computerSprite: {},
  angleSprite: {},
  playerHealthBar: {},
  computerHealthBar: {},
  triAngles: {},
  triAnglesInformation: {},
  information: {},
  playerMove: {},
  playerInformation: {},
  computerInformation: {},
  computerMove: {},
  waveCount: 0,
  opponents: [],
  baseHealthBar: {},
  numCoordinates: {},
  timer: 10,
};

let timedEvent;
let randomCoord;

const config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 772,
  backgroundColor: 0x6f7870,
  pixelArt: true,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    min: {
      width: 800,
      height: 600,
    },
    max: {
      width: 1600,
      height: 1200,
    },
    zoom: 1,
  },
  autoRound: false,
  scene: [
    PreloadScene,
    MenuScene,
    StartScene,
    GameScene,
    ConvoScene,
    BaseScene,
    PunchScene,
    HealthScene,
    EndScene,
  ],
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
      enableBody: true,
      x: 0,
      y: 0,
      width: 1280,
      height: 772,
    },
    checkCollision: {
      up: true,
      down: true,
      left: true,
      right: true,
    },
  },
};

if (module.hot) {
  module.hot.accept();
}

const game = new Phaser.Game(config);

export { gameState };
