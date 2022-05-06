const Phaser = require("phaser");
import { gameState } from "../../game.js";
import title from "../components/title"

class MenuScene extends Phaser.Scene {
  constructor() {
    super({
      key: "MenuScene",
    });
  }

  preload() {}

  create() {
    let game = this;
    title(game, 0 , 0, 4);
    this.add.text(350, 300, "Menu",{
      fontSize: "30px",
      fill: "#000000",
    })
    this.add.text(350, 400, "Press T to Start Game!!", {
      fontSize: "30px",
      fill: "#000000",
    });
    this.add.text(350, 500, "Press M to exit Game.", {
      fontSize: "30px",
      fill: "#000000",
    });
  }//Create end

  update() {
    const tKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
    const mKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);

    tKey.on("up", () => {
      gameState.timer = 60;
      loadGame();
    });

    const loadGame = () => {
      this.scene.stop("MenuScene");
      this.scene.start("StartScene");
    };

    mKey.on("up", () => {
      this.scene.stop("MenuScene");
      this.scene.start("EndScene");
    });
  }
}

module.exports = { MenuScene };
