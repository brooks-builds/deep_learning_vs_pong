let ball;
let paddles = {
    player: null,
    ai: null
};

function setup() {
    const canvas = createCanvas(1500, 700);

    canvas.parent('pong');
    ball = Ball();
}

function draw() {
    background(0);
    ball.render();
}