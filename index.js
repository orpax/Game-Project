const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.4;

class Sprite {
    constructor({position, velocity}) {
        this.position = position;
        this.velocity = velocity;
        this.height = 150;
        this.lastKey;
        this.attackBox  = {
            position: this.position,
            width: 100,
            height: 50,
        }
    }

    draw() {
        c.fillStyle = "red";
        c.fillRect(this.position.x, this.position.y, 50, this.height);
        c.fillStyle = "white";
        c.fillRect(
            this.attackBox.position.x,
            this.attackBox.position.y,
            this.attackBox.width,
            this.attackBox.height);
    }

    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        // Player
        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0;
        } else this.velocity.y += gravity;
    }
}

// player
const player = new Sprite({
    position: {x: 0, y: 0},
    velocity: {x: 0, y: 0}
});

const enemy = new Sprite({
    position: {x: 400, y: 100},
    velocity: {x: 0, y: 0}
});

const keys = {
    a: {pressed: false},
    d: {pressed: false},
    w: {pressed: false},
    ArrowLeft: {pressed: false},
    ArrowRight: {pressed: false}
};

function animate() {
    window.requestAnimationFrame(animate);
    c.fillStyle = "black";
    c.fillRect(0, 0, canvas.width, canvas.height);
    player.update();
    enemy.update();
    player.velocity.x = 0;
    enemy.velocity.x = 0;
    // player
    if (keys.a.pressed && player.lastKey === "a") {
        player.velocity.x = -5;
    } else if (keys.d.pressed && player.lastKey === "d") {
        player.velocity.x = 5;
    }
    // enemy
    if (keys.ArrowLeft.pressed && enemy.lastKey === "ArrowLeft") {
        enemy.velocity.x = -5;
    } else if (keys.ArrowRight.pressed && enemy.lastKey === "ArrowRight") {
        enemy.velocity.x = 5;
    }
}

animate();

window.addEventListener("keydown", (event) => {
    console.log(event.key);
    switch (event.key) {
        // player
        case "d":
            keys.d.pressed = true;
            player.lastKey = "d";
            break;
        case "a":
            keys.a.pressed = true;
            player.lastKey = "a";
            break;
        case "w":
            player.velocity.y = -10;
            break;
        // enemy
        case "ArrowRight":
            keys.ArrowRight.pressed = true;
            enemy.lastKey = "ArrowRight";
            break;
        case "ArrowLeft":
            keys.ArrowLeft.pressed = true;
            enemy.lastKey = "ArrowLeft";
            break;
        case "ArrowUp":
            enemy.velocity.y = -10;
            break;
    }
    console.log(event.key);
});

window.addEventListener("keyup", (event) => {
    switch (event.key) {
        case "d":
            keys.d.pressed = false;
            break;
        case "a":
            keys.a.pressed = false;
            break;
        case "w":
            keys.w.pressed = false;
            break;
    }

    switch (event.key) {
        case "ArrowRight":
            keys.ArrowRight.pressed = false;
            break;
        case "ArrowLeft":
            keys.ArrowLeft.pressed = false;
            break;
        case "ArrowUp":
            keys.ArrowUp.pressed = false;
            break;
    }
    console.log(event.key);
});
