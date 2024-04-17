const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.2

class sprite {
    constructor({position, velocity}) {
        this.position = position
        this.velocity = velocity
        this.height = 150
    }

    draw(){
        c.fillStyle = "red";
        c.fillRect(this.position.x, this.position.y, 50, this.height);
    }

    update(){
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

    if(this.position.y  + this.height + this.velocity.y >= canvas.height){
        this.velocity.y = 0;
    }else this.velocity.y += gravity
    }
}

// player

const player = new sprite({
    position: {x: 0, y: 0},
    velocity: {x: 0, y: 0}
})

player.draw()

const enemy = new sprite({
    position: {x: 400, y: 100},
    velocity: {x: 0, y: 0}
})

enemy.draw()

console.log(player)

const keys = {
    a : {
        pressed : false,
    },
    d : {
        pressed : false,
    }
}

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = "black"
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()
}

if (key.a.pressed) {
    player.velocity.x = -1
}else if (key.d.pressed) {
    player.velocity.x = 1
}

animate()

window.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "d":
            player.velocity.x = 1
            break
        case "a":
            player.velocity.x = -1
            break
    }
    console.log(event.key)
});

window.addEventListener("keyup", (event) => {
    switch (event.key) {
        case "d":
            player.velocity.x = 0
            break
        case "a":
            player.velocity.x = 0
            break
    }
    console.log(event.key)
});
