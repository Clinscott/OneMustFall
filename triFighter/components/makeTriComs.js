export default makeTriComs = (game, x, y, scale) => {
  const triComData = [[0, 1, 1, 1, 1, 1, 1, 1, 1, 2]];
  const triComMap = game.make.tilemap({
    data: triComData,
    tileWidth: 32,
    tileHeight: 32,
  });
  const triComTiles = triComMap.addTilesetImage("triComs");
  const triComLayer = triComMap
    .createLayer(0, triComTiles, x, y)
    .setScale(scale);
};

