export default makeRoad = (game, x, y, scale) => {
  const roadData = [[0, 0, 0, 0, 0]];
  const roadMap = game.make.tilemap({
    data: roadData,
    tileWidth: 256,
    tileHeight: 256,
  });
  const roadTiles = roadMap.addTilesetImage("triFighterStreet");
  const roadLayer = roadMap.createLayer(0, roadTiles, x, y).setScale(scale);
};


