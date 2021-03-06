const Phaser = require("phaser");

let triFighter;

function preload(){
    this.load.image('triFighter', './assets/triFighter/triFighter.png');
}

function create(){
    this.add.text(100, 100, 'Start or not');
    triFighter = this.add.sprite(100, 200, 'triFighter');
}

function update(){

}

const config = {
    type: Phaser.AUTO,
    width: 500,
    height: 500,
    backgroundColor: 0x4297f1,
    scene: {
        preload,
        create,
        update
    }
};

if (module.hot){
    module.hot.accept();
}

const game = new Phaser.Game(config);

