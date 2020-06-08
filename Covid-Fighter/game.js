function load_images() {
    enemy_image = new Image;
    enemy_image.src="Assets/enemy3.png";
    
    player_img = new Image;
    player_img.src = "Assets/superhero.png"
    
    gem_img = new Image;
    gem_img.src = "Assets/gem.png";
    
}

function init() {
    canvas = document.getElementById("mycanvas");
    console.log(canvas);
    W = 700;
    H = 400;
    canvas.width = W;
    canvas.height = H;
    
    pen = canvas.getContext('2d');
    console.log(pen);
    
    game_over = false;
    
    e1 = {
        x: 150,
        y: 50,
        w: 60,
        h: 60,
        speed: 20
    };
    
    e2 = {
        x: 300,
        y: 150,
        w: 60,
        h: 60,
        speed: 30
    };
    
    e3 = {
        x: 450,
        y: 20,
        w: 60,
        h: 60,
        speed: 40
    };
    
    enemy = [e1,e2,e3];
    
    player = {
        x: 20,
        y: H/2,
        w: 60,
        h: 60,
        speed: 20,
        moving: false,
        health: 100
    };
    
    gem = {
        x: W-100,
        y: H/2,
        w: 60,
        h: 60
    };
    
    // listen to events on the canvas
    canvas.addEventListener('mousedown', function() {
       console.log('mouse pressed');
        player.moving = true;
    });
    
    canvas.addEventListener('mouseup', function() {
       console.log('mouse released');
        player.moving = false;
    });
}

function isOverlap(rect1, rect2) {
    if (rect1.x < rect2.x + rect2.w &&
        rect1.x + rect1.w > rect2.x &&
        rect1.y < rect2.y + rect2.h &&
        rect1.y + rect1.h > rect2.y) {
            return true;
    }
    return false;
}

function draw() {
    
    pen.clearRect(0,0,W,H);
    pen.fillStyle = "red";
    
    // draw player
    pen.drawImage(player_img, player.x, player.y, player.w, player.h);
    
    // draw gem
    pen.drawImage(gem_img, gem.x, gem.y, gem.w, gem.h);
    
//    pen.fillRect(box.x,box.y,box.w,box.h);
    enemy.map((enemy)=>{
        pen.drawImage(enemy_image,enemy.x,enemy.y,enemy.w,enemy.h);
    })
//    pen.drawImage(enemy_image,box.x,box.y,box.w,box.h);
    
    pen.fillStyle = "white";
    pen.fillText("Score: "+ player.health, 10, 10);
    
}

function update() {
    
    // if player is moving
    if(player.moving === true) {
        player.x += player.speed;
        player.health += 20;
    }
    
    enemy.map((e)=>{
        if(isOverlap(player,e)){
            player.health -= 50;
            if(player.health < 0) {
                console.log(player.health);
                game_over = true;
                alert("Game Over!");
            }
        }
    })
    
    // check overlap
    if(isOverlap(player,gem)) {
        console.log("You won the game!");
        alert("You won!");
        game_over = true;
        return;
    }
    
    enemy.map((enemy)=>{
        enemy.y += enemy.speed;
    if(enemy.y >= H - enemy.h || enemy.y <= 0) {
        enemy.speed *= -1;
    }
    })
    
}

function gameLoop() {
    if(game_over === true) {
        clearInterval(f);
    }
    draw();
    update();
    console.log("game loop running");
}

load_images();
init();
var f = setInterval(function(){
    gameLoop();
}, 100);
