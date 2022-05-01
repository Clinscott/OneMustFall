export default function healthSceneUpgrade(newPage, timedEvent, game, scene){
    console.log(`Page: ${newPage}`);
              console.log("Health Upgrade!");
              timedEvent = scene.time.delayedCall(
                3000,
                () => {
                  game.scene.start("HealthScene", { page: newPage });
                },
                game,
                scene
              );
}