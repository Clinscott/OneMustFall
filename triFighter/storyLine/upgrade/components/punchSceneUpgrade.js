export default function punchSceneUpgrade(newPage, timedEvent, game, scene){
    console.log(`Page: ${newPage}`);
    console.log("Punch Upgrade!");
    timedEvent = scene.time.delayedCall(
      3000,
      () => {
        game.scene.start("PunchScene", { page: newPage });
      },
      scene,
      game
    );
  }

