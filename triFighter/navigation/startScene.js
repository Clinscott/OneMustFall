const Phaser = require("phaser");
import { gameState } from "../../game.js";

class StartScene extends Phaser.Scene {
  constructor() {
    super({
      key: "StartScene",
    });
  }

  preload() {}

  create() {
    this.add.text(95, 250, "Press T for Story Mode", {
      fontSize: "30px",
      fill: "#000000",
    });
    this.add.text(95, 350, "Press M to enter Menu", {
      fontSize: "30px",
      fill: "#000000",
    });

    const tKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
    const mKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);

    tKey.on("up", () => {
      gameState.timer = 60;
      this.scene.stop("StartScene");
      this.scene.start("ConvoScene");
    });

    mKey.on("up", () => {
      this.scene.stop("StartScene");
      this.scene.start("MenuScene");
    });
  }

  update() {}
}

module.exports = { StartScene };
