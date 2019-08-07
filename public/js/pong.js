let ball;
let paddles = {
    player: null,
    ai: null
};

function setup() {
    const canvas = createCanvas(920, 700);

    canvas.parent('pong');
    ball = Ball();
    paddles.player = Paddle('left')
    paddles.ai = Paddle('right')
}

function draw() {
    background(0);
    ball.render();
    paddles.player.render();
    paddles.ai.render();

    if (keyIsDown(UP_ARROW)) {
        paddles.player.moveUp();
    } else if (keyIsDown(DOWN_ARROW)) {
        paddles.player.moveDown();
    }

    paddles.player.stopAtEdge();
    paddles.ai.stopAtEdge();
    ball.bounceOnWalls();
    ball.move();
    // ball.collideWithPaddle(paddles.ai);
    ball.collideWithPaddle(paddles.player);
}