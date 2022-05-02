import { gameState } from "../../../game";

export default function getData(data, gameState) {
  console.log(data);
  gameState.playerInformation = {
    name: "TriFighter",
    punchLevel: data.punchLevel,
    health: data.playerHealth,
    baseHealth: data.baseHealth,
    baseLevel: data.baseLevel,
  };

  gameState.triAnglesInformation = {
    total: data.triAnglesTotal,
  };
  gameState.timer = data.timer;
  return { gameState };
}
