const Phaser = require('phaser');
import { gameState } from '../../../game';
import {style} from '../../levels/gameScene';

let newPage

class HealthScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'HealthScene'
        });
    }


init(data){
newPage = data.page
}

preload(){

}

create(){
    console.log('HealthScene')
    const base = this.physics.add.sprite(25, 450, 'triBase').setScale(12).setImmovable();
    const triComData = [[0, 1, 1, 1, 1, 1, 1, 1, 1, 2]];
    const triComMap = this.make.tilemap({data: triComData, tileWidth: 32, tileHeight: 32});
    const triComMapTwo = this.make.tilemap({data: triComData, tileWidth: 32, tileHeight: 32});
    const triComTiles = triComMap.addTilesetImage('triComs');
    const triComLayerBottom = triComMap.createLayer(0, triComTiles, 0, 644).setScale(4);
    const triComLayerTop = triComMapTwo.createLayer(0, triComTiles, 0, 0).setScale(4);
    
    const textBoxData = [[0,1,2]];
    const textBoxMap = this.make.tilemap({data: textBoxData, tileWidth: 32, tileHeight:32});
    const textBoxCoords = [100, 200]
    const textBox = textBoxMap.createLayer(0, triComTiles, textBoxCoords[0], textBoxCoords[1]).setScale(2);
    const style = {

    }
    const upgradeText = this.add.text(textBoxCoords[0]+5, textBoxCoords[1]+5, 'You are tougher!', style)
    
    
      gameState.player = this.physics.add.sprite(275, 445, 'triFighter').setScale(0.5);
      gameState.music = this.sound.add('theme');
      //gameState.music.play();
      gameState.playerInformation.baseLevel++

    const timedEvent = this.time.delayedCall(5000,  () => {
        this.scene.stop('HealthScene');
        this.scene.start('ConvoScene', {
            page: newPage,
            baseLevel: gameState.playerInformation.baseLevel
        })
    })

}

update(){

}
}

module.exports = {HealthScene};