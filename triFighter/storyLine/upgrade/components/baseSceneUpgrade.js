export default function baseSceneUpgrade(newPage, timedEvent, game, scene){
    console.log(`Page: ${newPage}`);
              console.log("Base Upgrade!");
              timedEvent = scene.time.delayedCall(
                3000,
                () => {
                  game.scene.start("BaseScene", { page: newPage });
                },
                scene,
                game
              );
}