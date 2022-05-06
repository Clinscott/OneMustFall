import { gameState } from "../../../game";
export default renderTriCharacter = (scene, key) => {
  if (gameState.triCharacter) {
    gameState.triCharacter.destroy();
  }
  gameState.triCharacter = scene.add.sprite(64, 192);
  //gameState.character.setOrigin(.5, 1);
  gameState.triCharacter.setScale(4);
  gameState.triCharacter.play(key);
};
