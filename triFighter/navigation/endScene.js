const Phaser = require("phaser");
import { gameState } from "../../game.js";

class EndScene extends Phaser.Scene {
  constructor() {
    super({
      key: "EndScene",
    });
  }
  preload() {}

  create() {
    gameState.timer = 60;
    this.anims.resumeAll();
    this.physics.resume();
    this.add.text(95, 250, "Hit T to reStart! You can never escape.", {
      fontSize: "30px",
      fill: "#000000",
    });

    const tKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
    const mKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);

    tKey.on("up", () => {
      gameState.timer = 60;
      this.scene.stop("EndScene");
      this.scene.start("ConvoScene");
    });
  }

  update() {}
}

module.exports = { EndScene };
