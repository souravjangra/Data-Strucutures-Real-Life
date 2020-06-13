let config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        width: 800,
        height: 600
    },
    backgroundColor: 0xffffcc,
    scene: {
        preload: preloadFun,
        create: createFun,
        update: updateFun
    }
}

let game = new Phaser.Game(config);

function preloadFun() {
    this.load.image('ground','Assets/ground2.png')
    this.load.image('sky','Assets/background.png')
}

function createFun() {
    W = game.config.width
    H = game.config.height
    
    // adding background
    let background = this.add.sprite(0,0,'sky');
    background.setOrigin(0,0);
    background.displayWidth = W;
    background.displayHeight = H;
    
    // add tileSprites
    let ground = this.add.tileSprite(0,H-77,W,189,'ground');
    ground.setOrigin(0,0);
    
    
}

function updateFun() {
    
}