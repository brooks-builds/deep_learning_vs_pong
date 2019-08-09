let ball;
let paddles = {
    player: null,
    ai: null
};
let ai;
let state = 'not started';
const record = Record();

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
    if (state === 'not started') {
        textSize(32);
        fill(255);
        textAlign(CENTER, CENTER);
        text('Press Enter to Start', width / 2, 250);

        if (keyIsDown(ENTER)) {
            state = 'running'
        }
    } else if (state === 'game over') {
        console.log(record);
        textSize(32);
        fill(255);
        textAlign(CENTER, CENTER);

        if (ball.didPlayerWin()) {
            text('You Win!', width / 2, 250);
        } else {
            text('You Lost!', width / 2, 250);
        }

        text('Press return to start again!', width / 2, height / 2);

        if (keyIsDown(ENTER)) {
            reset();
            state = 'running'
        }
    } else {
        let keyPressed;

        ball.render();
        paddles.player.render();
        paddles.ai.render();

        if (keyIsDown(UP_ARROW)) {
            paddles.player.moveUp();
            keyPressed = 'up';
        } else if (keyIsDown(DOWN_ARROW)) {
            paddles.player.moveDown();
            keyPressed = 'down'
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

        if (ball.isBallOffScreen()) {
            state = 'game over';
        }

        record.recordInput(ball, paddles.player, keyPressed);
    }
}

function reset() {
    paddles.player = Paddle('left');
    paddles.ai = Paddle('right');
    ball = Ball()
}