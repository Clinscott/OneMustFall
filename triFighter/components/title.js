export default title = (game, x, y, scale) => {
  const titleData = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]];
  const titleMap = game.make.tilemap({
    data: titleData,
    tileWidth: 32,
    tileHeight: 32,
  });
  const titleTiles = titleMap.addTilesetImage("triTitle");
  const titleBottom = titleMap.createLayer(0, titleTiles, x, y).setScale(scale);
};
