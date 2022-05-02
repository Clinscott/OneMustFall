export default function gameSceneTransfer(
  goTo,
  newPage,
  timedEvent,
  game,
  gameState
) {
  console.log("I worked!");
  console.log(`Page:${newPage}`);
  console.log(`Welcome to: ${goTo}`);
  game.scene.start(goTo, {
    page: newPage,
    playerHealth: gameState.playerInformation.health,
    baseLevel: gameState.playerInformation.baseLevel,
    punchLevel: gameState.playerInformation.punchLevel,
    triAnglesTotal: gameState.triAnglesInformation.total,
    timer: 60,
  });
}
