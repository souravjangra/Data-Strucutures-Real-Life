let prizes = {
    count: 6,
    prize_names: ["Java","Kotlin","JavaScript","Ruby","Python","Cpp"]
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

let game = new Phaser.Game(config);

function preloadFun() {
    console.log("Preload");
    this.load.image('background', 'Assets/bg.jpg')
    this.load.image('wheel','Assets/wheel.png')
    this.load.image('pin','Assets/pin.png')
    this.load.image('stand','Assets/stand.png')
    this.load.spritesheet('btn','Assets/button.png', {frameWidth: 193, frameHeight: 76})
    console.log(this);
}

var button;

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
    var button = this.addButton(120, 120, 'btn', actionOnClick, this);
    
    // event listener for mouse click
//    this.input.on("pointerdown", spinwheel, this)
    
    // create text object
    font_style = {
        font: "bold 30px Arial",
        align: "center",
        color: "#000"
    }
    this.game_text = this.add.text(10,10,"Welcome to Spin & Win", font_style)
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
    
    if(!wheel_spinning) {
        tween = game.tweens.add({
        targets: game.wheel,
        angle: total_angle,
        ease: "Cubic.easeOut",
        duration: 6000,
        callbackScope: game,
        onStart: function() {
          wheel_spinning = true  
        },
        onComplete: function() {
            this.game_text.setText("You won a course on " + prizes.prize_names[idx])
            wheel_spinning = false
            console.log("Your favourite programming language is : ", prizes.prize_names[idx])
        }
    })
    } else {
        alert("A spin is already running. Please wait!")
    }
    
}