/*
  description: This code before you is the main game engine for my first game, triFighter.
  credit: Craig Linscott
  link: https://github.com/clinscott
  */

const Phaser = require("phaser");
import { gameState } from "../../game.js";
import getData from "../storyLine/components/getData";
import gameSceneTransfer from "../storyLine/components/gameSceneTransfer";
import { Scene } from "phaser";
import title from "../components/title";
import makeTriComs from "../components/makeTriComs.js";
import makeRoad from "../components/makeRoad.js";
import renderTriCharacter from "../storyLine/components/renderTriCharacter.js";

let timedEvent;
let randomCoord;
let game;
let newPage;

class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: "GameScene",
    });
  }

  init(data) {
    getData(data, gameState);
    console.log("GameState:");
    console.log({ ...gameState });
    if (!data.page) {
      newPage = 1;
    } else {
      newPage = data.page;
      newPage++;
    }
  }

  preload() {}

  create() {
    console.log("GameScene");
    game = this;
    const style = {
      font: "16px Helvetica",
      fill: "#000000",
      padding: { x: 6, y: 7 },
    };

    title(game, 0, 0, 4);
    makeRoad(game, 100, 325, 1);

    const base = this.physics.add
      .sprite(25, 450, "triBase")
      .setScale(12)
      .setImmovable();

    makeTriComs(game, 0, 644, 4);
    makeTriComs(game, 0, 128, 4);

    const showControls = () => {
      const punchControl = this.add.text(350, 700, "A: Punch", style);
      const moveUp = this.add.text(600, 675, "UP: Up Arrow", style);
      const moveDown = this.add.text(600, 725, "DOWN: Down Arrow", style);
      const moveLeft = this.add.text(450, 700, "LEFT: Left Arrow", style);
      const moveRight = this.add.text(750, 700, "RIGHT: Right Arrow", style);
    };
    showControls();

    renderTriCharacter(game, "triLogoFight");

    gameState.information = this.add.sprite(640, 180, "fight").setScale(0.5);
    gameState.player = this.physics.add
      .sprite(275, 445, "triFighter")
      .setScale(0.5);
    this.physics.world.setBounds(64, 256, 1152, 384);
    gameState.player.setCollideWorldBounds(true);
    gameState.player.body.collideWorldBounds = true;
    gameState.music = this.sound.add("theme");
    gameState.music.play();
    gameState.playerMove.active = false;
    gameState.playerMove.activeHit = false;
    gameState.information.velocity = [0, -100, 100, -150, 150, -25, 25];

    gameState.player.setCircle(46, 46, 100);

    randomCoord = assignComputerCoord();

    /*
    function createSquare(){
    gameState.computerSprite = game.physics.add.sprite(randomCoord.x, randomCoord.y, 'squareFighter').setScale(2);
    gameState.computerSprite.setCollideWorldBounds(true);
    gameState.computerSprite.body.collideWorldBounds = true;
    gameState.computerSprite.body.onWorldBounds = true;
    gameState.computerSprite.setCircle(9, 8, 7);
    };
    */

    gameState.computerSprite.active = true;
    gameState.computerInformation.health = 4;
    gameState.computerSprite.activeHit = false;

    gameState.opponents = this.physics.add.group({
      collideWorldBounds: true,
      velocityX: gameState.information.velocity[5] * gameState.computerSpeed,
    });

    gameState.triAngles = this.physics.add.group();

    gameState.playerInformation = {
      name: "TriFighter",
      punchLevel: 1,
      health: 3,
      baseHealth: 2,
      baseLevel: 1,
    };

    gameState.triAnglesInformation = {
      total: 0,
    };

    gameState.computerInformation = {
      name: "SquareFighter",
      health: 4,
    };

    gameState.playerHealthBar = this.add.text(
      128,
      156,
      `HP: ${gameState.playerInformation.health}`,
      style
    );
    /*gameState.computerHealthBar = this.add.text(
      800,
      10,
      `HP: ${gameState.computerInformation.health}`,
      style
    );*/
    gameState.triAnglesHealthBar = this.add.text(
      128,
      176,
      `triAngles: ${gameState.triAnglesInformation.total}`,
      style
    );
    gameState.baseHealthBar = this.add.text(
      128,
      196,
      `BASE HP: ${gameState.playerInformation.baseHealth}`,
      style
    );
    //gameState.timerBar = game.add.text(640, 200, `${gameState.timer}`, style);
    //gameState.computerHealthBar.text = `HP: ${gameState.computerInformation.health}`;

    const fightClock = this.time.addEvent({
      delay: 1000,
      callback: fightCounter,
      callbackScope: this,
      repeat: 59,
    });
    createOpponent();
    timedEvent = this.time.addEvent({
      delay: 10000,
      callback: createOpponent,
      callbackScope: this,
      loop: true,
    });

    this.physics.add.collider(
      gameState.opponents,
      base,
      function (triBase, enemy) {
        squareDead(enemy);
        baseHit(triBase);
      }
    );

    this.physics.add.collider(gameState.player, base, function () {});

    /* collider between the enemy sprite and the player */
    this.physics.add.collider(
      gameState.player,
      gameState.opponents,
      function (hero, enemy) {
        if (
          !gameState.playerMove.activeHit &&
          !gameState.computerSprite.activeHit
        ) {
          triWasHit();
          squareHit(enemy);
        }

        if (
          gameState.computerInformation.health > 0 &&
          gameState.playerMove.activeHit
        ) {
          squareHit(enemy);
        }
        if (
          gameState.computerInformation.health <= 0 &&
          gameState.computerSprite.activeHit
        ) {
          squareDead(enemy);
          //gameState.opponents.createOpponent();
        }
      }
    );

    this.physics.add.collider(
      gameState.player,
      gameState.triAngles,
      function (hero, enemy) {
        triPickUpAngles(enemy);
        //gameState.opponents.createOpponent();
      }
    );

    const triXCoord = gameState.player.x;
    const triYCoord = gameState.player.y;

    function createOpponent() {
      function generateComputerEntryCoord() {
        const coordX = 1180;
        const coordY = Math.floor(Math.random() * 6) * 64 + 290;
        return { x: coordX, y: coordY };
      }
      let assignedCoord = generateComputerEntryCoord();

      gameState.opponents
        .create(assignedCoord.x, assignedCoord.y, "squareFighter", 3)
        .setScale(2)
        .setCircle(8, 7, 7)
        .play("squareLeft");
      gameState.computerInformation.active = true;
      gameState.computerInformation.health = 4;
      gameState.computerHealthBar.text = `HP: ${gameState.computerInformation.health}`;
      return;
    }

    function createTriAngles(enemy) {
      gameState.triAngles
        .create(enemy.x, enemy.y, "squareFighter", 10)
        .setScale(2)
        .setCircle(8, 7, 7);
    }

    gameState.opponents.createOpponent = createOpponent;

    function triShoot(triAngle) {
      if (gameState.playerInformation.punchLevel === 2) {
        gameState.player.punchShot
          .create(triAngle.x, triAngle.y, "triFighter", 10)
          .setScale(0.25)
          .setCircle(2, 2, 2);
      }
    }

    function onWorldBounds() {}

    function generateComputerEntryCoord() {
      const coordX = 1180;
      const coordY = Math.floor(Math.random() * 6) * 64 + 290;
      return { x: coordX, y: coordY };
    }

    function assignComputerCoord() {
      let assignedCoord = generateComputerEntryCoord();

      while (
        gameState.numCoordinates[`x${assignedCoord.x}y${assignedCoord.y}`]
      ) {
        assignedCoord = generateComputerEntryCoord();
      }

      gameState.numCoordinates[`x${assignedCoord.x}y${assignedCoord.y}`] = true;

      return assignedCoord;
    }

    function squareHit(enemy) {
      enemy.play("squareHit", true);
      enemy.setVelocityX(
        gameState.information.velocity[2] * gameState.computerSpeed
      );
      timedEvent = game.time.delayedCall(
        100,
        () => {
          enemy.setVelocityX(
            gameState.information.velocity[5] * gameState.computerSpeed
          );
        },
        game
      );
      gameState.computerInformation.health--;
      gameState.computerHealthBar.text = `HP: ${gameState.computerInformation.health}`;
      gameState.computerSprite.activeHit = true;
    }

    gameState.computer.squareHit = squareHit;

    function squareDead(enemy) {
      enemy.play("squareDead", true);
      enemy.disableBody();
      gameState.computerInformation.health = 0;
      gameState.computerInformation.active = false;
      gameState.opponents.killed++;
      gameState.opponents.dead = true;
      timedEvent = game.time.delayedCall(
        100,
        function () {
          gameState.computerSprite.active = false;
          createTriAngles(enemy);
          enemy.setActive(false).setVisible(false);
          gameState.computerInformation.health = 4;
        },
        [],
        game
      );
      timedEvent = game.time.delayedCall(
        10000,
        () => {
          enemy.destroy(gameState.opponents.getLast(true), true);
          gameState.triAngles.remove(gameState.triAngles.getLast(true), true);
          gameState.opponents.createOpponent();
        },
        [],
        game
      );
    }

    gameState.computer.squareDead = squareDead;

    function triWasHit() {
      gameState.player.play("triMoveLeft");
      gameState.player.setVelocityX(
        gameState.information.velocity[3] * gameState.playerSpeed
      );
      gameState.player.setVelocityY(gameState.information.velocity[0]);
      gameState.playerMove.active = true;
      gameState.playerInformation.health--;
      gameState.playerHealthBar.text = `HP: ${gameState.playerInformation.health}`;
      timedEvent = game.time.delayedCall(
        500,
        () => {
          gameState.playerMove.active = false;
        },
        [],
        game
      );
    }

    gameState.playerMove.triWasHit = triWasHit;

    function triPickUpAngles(enemy) {
      gameState.triAnglesInformation.total += 1;
      gameState.triAnglesHealthBar.text = `triAngles: ${gameState.triAnglesInformation.total}`;
      gameState.computerSprite.active = true;
      enemy.destroy();
    }

    gameState.playerMove.triPickUpAngles = triPickUpAngles;

    function baseHit(triBase) {
      triBase.play("baseHit", true);
      gameState.playerInformation.baseHealth -= 1;
      gameState.baseHealthBar.text = `BASE HP: ${gameState.playerInformation.baseHealth}`;
    }

    function fightCounter() {
      gameState.timer--;
      //gameState.timerBar.text = `${gameState.timer}`;
    }

    function squareMove(enemy) {
      gameState.opponents.setVelocityX(
        gameState.information.velocity[5] * gameState.computerSpeed
      );
      gameState.opponents.playAnimation("squareLeft", true);
      gameState.computerInformation.active = true;
    }

    gameState.computer.squareMove = squareMove;
  }

  update() {
    /*
  description: Initial movement arrows and animation functions.
  credit: codecademy business outfitted bob game. 
  link: https://www.codecademy.com/paths/create-video-games-with-phaser/tracks/game-dev-learn-javascript-basics/modules/game-dev-project-variables-and-conditionals/projects/business-outfitted-bob
  */
    game = this;
    // Arrow keys that will move tri in 4 directions
    const cursors = this.input.keyboard.createCursorKeys();
    //Variables that store if a specific arrow key is being pressed
    const rightArrow = cursors.right.isDown;
    const leftArrow = cursors.left.isDown;
    const upArrow = cursors.up.isDown;
    const downArrow = cursors.down.isDown;

    const aKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.A
    ).isDown;
    const sKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.S
    ).isDown;

    if (gameState.timer > 0) {
      if (aKey && gameState.playerInformation.punchLevel === 1) {
        triPunch();
      } else if (aKey && gameState.playerInformation.punchLevel === 2) {
        triShoot();
      }

      if (rightArrow && upArrow) {
        triMoveUpRight();
      } else if (leftArrow && upArrow) {
        triMoveUpLeft();
      } else if (rightArrow && downArrow) {
        triMoveDownRight();
      } else if (downArrow && leftArrow) {
        triMoveDownLeft();
      } else if (rightArrow) {
        triMoveRight();
      } else if (leftArrow) {
        triMoveLeft();
      } else if (upArrow) {
        triMoveUp();
      } else if (downArrow) {
        triMoveDown();
      } else {
        triStop();
      }
    } else {
      endGame(game, this.scene);
    }

    /* if(gameState.computerInformation.health > 0 && !gameState.computerSprite.activeHit){
  squareMove(enemy);
} */

    if (
      gameState.playerInformation.health === 0 ||
      gameState.playerInformation.baseHealth === 0
    ) {
      this.physics.pause();
      this.anims.pauseAll();
      this.scene.stop("GameScene");
      //gameState.timer = 60;
      this.scene.start("EndScene");
    }

    function endGame(game) {
      triStop();
      game.physics.pause();
      gameSceneTransfer("ConvoScene", newPage, timedEvent, game, gameState);
    }
    // Helper functions to move tri in 8 directions
    function triMoveRight() {
      if (!gameState.playerMove.active) {
        gameState.player.play("triMoveRight");
        gameState.player.setVelocityX(
          gameState.information.velocity[4] * gameState.playerSpeed
        );
        gameState.player.setVelocityY(gameState.information.velocity[0]);
      }
    }
    gameState.playerMove.triMoveRight = triMoveRight;

    function triMoveLeft() {
      if (!gameState.playerMove.active) {
        gameState.player.play("triMoveLeft");
        gameState.player.setVelocityX(
          gameState.information.velocity[3] * gameState.playerSpeed
        );
        gameState.player.setVelocityY(gameState.information.velocity[0]);
      }
    }

    gameState.playerMove.triMoveLeft = triMoveLeft;

    function triMoveUp() {
      if (!gameState.playerMove.active) {
        gameState.player.play("triMoveUp");
        gameState.player.setVelocityX(gameState.information.velocity[0]);
        gameState.player.setVelocityY(
          gameState.information.velocity[3] * gameState.playerSpeed
        );
      }
    }

    gameState.playerMove.triMoveUp = triMoveUp;

    function triMoveDown() {
      if (!gameState.playerMove.active) {
        gameState.player.play("triMoveDown");
        gameState.player.setVelocityX(gameState.information.velocity[0]);
        gameState.player.setVelocityY(
          gameState.information.velocity[4] * gameState.playerSpeed
        );
      }
    }

    gameState.playerMove.triMoveDown = triMoveDown;

    function triMoveUpRight() {
      if (!gameState.playerMove.active) {
        gameState.player.play("triMoveUpRight");
        gameState.player.setVelocityX(
          gameState.information.velocity[2] * gameState.playerSpeed
        );
        gameState.player.setVelocityY(
          gameState.information.velocity[1] * gameState.playerSpeed
        );
      }
    }

    gameState.playerMove.triMoveUpRight = triMoveUpRight;

    function triMoveUpLeft() {
      if (!gameState.playerMove.active) {
        gameState.player.play("triMoveUpLeft");
        gameState.player.setVelocityX(
          gameState.information.velocity[1] * gameState.playerSpeed
        );
        gameState.player.setVelocityY(
          gameState.information.velocity[1] * gameState.playerSpeed
        );
      }
    }

    gameState.playerMove.triMoveUpLeft = triMoveUpLeft;

    function triMoveDownRight() {
      if (!gameState.playerMove.active) {
        gameState.player.play("triMoveDownRight");
        gameState.player.setVelocityX(
          gameState.information.velocity[2] * gameState.playerSpeed
        );
        gameState.player.setVelocityY(
          gameState.information.velocity[2] * gameState.playerSpeed
        );
      }
    }

    gameState.playerMove.triMoveDownRight = triMoveDownRight;

    function triMoveDownLeft() {
      if (!gameState.playerMove.active) {
        gameState.player.play("triMoveDownLeft");
        gameState.player.setVelocityX(
          gameState.information.velocity[1] * gameState.playerSpeed
        );
        gameState.player.setVelocityY(
          gameState.information.velocity[2] * gameState.playerSpeed
        );
      }
    }

    gameState.playerMove.triMoveDownLeft = triMoveDownLeft;

    function triStop() {
      if (!gameState.playerMove.active) {
        gameState.player.setVelocityX(gameState.information.velocity[0]);
        gameState.player.setVelocityY(gameState.information.velocity[0]);
        gameState.player.play("triStop");
      }
    }

    gameState.playerMove.triStop = triStop;

    function triPunch() {
      if (!gameState.playerMove.active) {
        gameState.playerMove.active = true;
        gameState.playerMove.activeHit = true;
        gameState.player.play("triPunch", true);
        gameState.player.setVelocityX(gameState.information.velocity[0]);
        gameState.player.setVelocityY(gameState.information.velocity[0]);
        timedEvent = game.time.delayedCall(
          50,
          () => {
            gameState.player.setCircle(20, 125, 80);
          },
          [],
          game
        );
        timedEvent = game.time.delayedCall(
          150,
          () => {
            gameState.player.setCircle(20, 150, 80);
          },
          [],
          game
        );
        timedEvent = game.time.delayedCall(
          175,
          () => {
            gameState.player.setCircle(20, 185, 80);
          },
          [],
          game
        );
        timedEvent = game.time.delayedCall(
          250,
          () => {
            gameState.player.setCircle(46, 46, 100);
          },
          [],
          game
        );
        timedEvent = game.time.delayedCall(
          400,
          () => {
            triHold();
          },
          [],
          game
        );
      }
    }

    gameState.playerMove.triPunch = triPunch;

    function triKick() {
      if (!gameState.playerMove.active) {
        gameState.player.flipX = false;
        gameState.player.play("triKick", true);
        gameState.player.setVelocityX(gameState.information.velocity[0]);
        gameState.player.setVelocityY(gameState.information.velocity[0]);
        gameState.playerMove.active = true;
        gameState.playerMove.activeHit = true;
        gameState.playerMove.activeHit = true;
        timedEvent = game.time.delayedCall(
          150,
          () => {
            gameState.player.setCircle(20, 150, 160);
          },
          [],
          game
        );
        timedEvent = game.time.delayedCall(
          200,
          () => {
            gameState.player.setCircle(20, 175, 160);
          },
          [],
          game
        );
        timedEvent = game.time.delayedCall(
          250,
          () => {
            gameState.player.setCircle(20, 200, 160);
          },
          [],
          game
        );
        timedEvent = game.time.delayedCall(
          300,
          () => {
            gameState.player.setCircle(46, 46, 100);
          },
          [],
          game
        );
        timedEvent = game.time.delayedCall(
          700,
          () => {
            triHold();
          },
          [],
          game
        );
      }
    }

    gameState.playerMove.triKick = triKick;

    function triHold() {
      gameState.playerMove.active = false;
      gameState.playerMove.activeHit = false;
      gameState.computerSprite.activeHit = false;
    }

    gameState.playerMove.triHold = triHold;
  }
}

module.exports = { GameScene };
export { style };
