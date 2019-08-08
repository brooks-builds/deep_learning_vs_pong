let ball;
let paddles = {
    player: null,
    ai: null
};
let ai;
const state = State();

function setup() {
    const canvas = createCanvas(920, 700);

    canvas.parent('pong');
    ball = Ball();
    paddles.player = Paddle('left')
    paddles.ai = Paddle('right')
    ai = Ai();
}

function draw() {
    background(0);
    if (state.current === 'not started') {
        textSize(32);
        fill(255);
        textAlign(CENTER, CENTER);
        text('Press Enter to Start', width / 2, 250);

        if (keyIsDown(ENTER)) {
            debugger
            state.current = 'running'
        }
    } else {
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
        ball.collideWithPaddle(paddles.ai);
        ball.collideWithPaddle(paddles.player);

        const aiMove = ai.decision(ball, paddles.ai);

        if (aiMove === 'up') {
            paddles.ai.moveUp();
        } else if (aiMove === 'down') {
            paddles.ai.moveDown();
        }
    }
}