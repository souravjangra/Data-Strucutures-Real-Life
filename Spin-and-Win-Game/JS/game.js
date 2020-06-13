let prizes = {
    count: 6,
    prize_names: ["Better Luck Next Time","Movie Ticket","Another Spin","ML Course at 55% Off","50% Off Voucher","Free C++ Course"]
}

wheel_spinning = false

let config = {
    type: Phaser.canvas,
    width: 800,
    height: 600,
    backgroundColor: 0xffcc00,
    scene: {
        preload: preloadFun,
        create: createFun,
        update: updateFun
    }
};

var spinner = {
    spins: 5
}

let game = new Phaser.Game(config);

function preloadFun() {
    console.log("Preload");
    this.load.image('background', 'Assets/bg.jpg')
    this.load.image('wheel','Assets/wheel.png')
    this.load.image('pin','Assets/pin.png')
    this.load.image('stand','Assets/stand.png')
    this.load.spritesheet('btn','Assets/button.png', {frameWidth: 193, frameHeight: 76})
    this.load.audio('game', 'Assets/game.mp3')
    console.log(this);
}

var button;
var music;

Phaser.Scene.prototype.addButton = function(x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame)
{
        // add a button
        var btn = this.add.sprite(x, y, key, outFrame).setInteractive();
        btn.on('pointerover', function (ptr, x, y) { this.setFrame(overFrame) } );
        btn.on('pointerout',  function (ptr)       { this.setFrame(outFrame) } );
        btn.on('pointerdown', function (ptr)       { this.setScale(0.9, 0.9) } );
        btn.on('pointerup', callback.bind(callbackContext));

        return btn;
};

function createFun() {
    console.log("Create");
    let W = game.config.width
    let H = game.config.height
    this.add.sprite(W/2,H/2,'background');
    this.wheel = this.add.sprite(W/2,H/2,'wheel')
    this.wheel.setScale(0.45)
    let stand = this.add.sprite(W/2,H/2+40,'stand')
    stand.setScale(0.45)
    let pin = this.add.sprite(W/2,H/2-140,'pin')
    pin.setScale(0.25)
    pin.depth = 1;
    var button = this.addButton(120, 200, 'btn', actionOnClick, this);
    
    // event listener for mouse click
//    this.input.on("pointerdown", spinwheel, this)
    
    // create text object
    font_style = {
        font: "bold 30px Arial",
        align: "center",
        color: "#000"
    }
    this.game_text = this.add.text(10,10,"Welcome to Spin & Win", font_style)
    this.game_text2 = this.add.text(10, 80, "Spins - " + spinner.spins, font_style);
    
    music = this.sound.add('game')
}

function up() {
    console.log("Button press")
}

function actionOnClick () {
    spinwheel(this)
    console.log("Button press")
}

function updateFun() {
    console.log("Update");
//    this.wheel.angle += 2
}

function spinwheel(game) {
    console.log("You clicked the mouse");
    console.log("Start Spinning");
        
//    this.game_text.setText("You clicked the mouse!");
    
    let rounds = Phaser.Math.Between(2, 4);
    let degrees = Phaser.Math.Between(0, 5)*60;
    
    let total_angle = rounds * 360 + degrees;
    console.log(total_angle)
    
    let idx = prizes.count - 1 - Math.floor(degrees/(360/prizes.count));
    
    if(spinner.spins > 0) {
        if(!wheel_spinning) {
        tween = game.tweens.add({
        targets: game.wheel,
        angle: total_angle,
        ease: "Cubic.easeOut",
        duration: 6000,
        callbackScope: game,
        onStart: function() {
          wheel_spinning = true 
          spinner.spins -= 1
          game.game_text2.setText("Spins - " + spinner.spins);
          music.play()
        },
        onComplete: function() {
            this.game_text.setText("You got " + prizes.prize_names[idx] + "!")
            if(idx == 2) {
                spinner.spins += 1
                game.game_text2.setText("Spins - " + spinner.spins);
            }
            wheel_spinning = false
            music.stop()
        }
    })
    } else {
        alert("A spin is already running. Please wait!")
    }
    } else {
        alert("You have no spins left")
    }
    
}