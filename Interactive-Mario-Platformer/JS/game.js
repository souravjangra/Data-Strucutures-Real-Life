let config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        width: 800,
        height: 600
    },
    backgroundColor: 0xffffcc,
    
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 1000
            },
            debug: true
        }
    },
    
    scene: {
        preload: preloadFun,
        create: createFun,
        update: updateFun
    }
}

let game = new Phaser.Game(config);

let player_config = {
    player_speed: 150,
    player_jumpspeed: -700
}

function preloadFun() {
    this.load.image('ground','Assets/ground2.png')
    this.load.image('sky','Assets/background.png')
    this.load.image('apple','Assets/apple2.png')
    this.load.spritesheet('player','Assets/player.png',{frameWidth: 32, frameHeight: 48})
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
    
    // player
    this.player = this.physics.add.sprite(100, 100, 'player', 4);
//    console.log(this.player);
    
    //set the bounce values
    this.player.setBounce(0.3);
    
    // player animations and movements
    
    this.anims.create({
       key: 'left',
       frames: this.anims.generateFrameNumbers('player',{start:0, end: 3}),
       frameRate: 10,
       repeat: -1
    });
    this.anims.create({
       key: 'center',
       frames: this.anims.generateFrameNumbers('player',{start:4, end: 4}),
       frameRate: 10,
    });
    this.anims.create({
       key: 'right',
       frames: this.anims.generateFrameNumbers('player',{start:5, end: 8}),
       frameRate: 10,
       repeat: -1
    });
    
    // keyboard controls
    this.cursors = this.input.keyboard.createCursorKeys();
    
    
    // adding group of apples = physical objects
    let fruits = this.physics.add.group({
        key: "apple",
        repeat: 8,
        setScale: {x: 0.05, y: 0.05},
        setXY: {X:10,Y:0,stepX: 100}
    })
    
    // add bouncing effect to all the apples
    fruits.children.iterate(function(f) {
        f.setBounce(Phaser.Math.FloatBetween(0.4,0.7));
    })
    
    // create more platforms
    let platforms = this.physics.add.staticGroup();
    platforms.create(600, 400, 'ground').setScale(1.2,0.8).refreshBody();
    platforms.create(500, 250, 'ground').setScale(1.2,0.8).refreshBody();
    platforms.create(130, 200, 'ground').setScale(1.2,0.8).refreshBody();
    platforms.add(ground);
    
    // ground
//    this.physics.add.existing(ground);
//    ground.body.allowGravity = false;
//    ground.body.immovable = true;
    console.log(ground);
    
    // collision detection between player and ground
    this.physics.add.collider(platforms, this.player);
    this.physics.add.collider(platforms, fruits);
    this.physics.add.overlap(this.player, fruits, eatFruit, null, this);
    
    // don't allow the player to move out of the game boundary
    this.player.setCollideWorldBounds(true);
    
    // working with camera
    this.cameras.main.setBounds(0,0,W,H);
    this.physics.world.setBounds(0,0,W,H);
    
    this.cameras.main.startFollow(this.player, true, true);
    this.cameras.main.setZoom(1.5);
    
}

function updateFun() {
    if(this.cursors.left.isDown) {
        this.player.setVelocityX(-player_config.player_speed);
        this.player.anims.play('left',true);
    } else if(this.cursors.right.isDown){
        this.player.setVelocityX(player_config.player_speed);
        this.player.anims.play('right',true);
    } else {
        this.player.setVelocityX(0);
        this.player.anims.play('center',true);
    }
    
    // add jumping ability , stop the player when in air
    if(this.cursors.up.isDown && this.player.body.touching.down) {
        this.player.setVelocityY(player_config.player_jumpspeed)
    }
}

function eatFruit(player, fruit) {
    fruit.disableBody(true, true);
}