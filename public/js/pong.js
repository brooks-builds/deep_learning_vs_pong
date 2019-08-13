let ball;
let paddles = {
    player: null,
    ai: null
};
let ai;
let state = 'not started';
let neuralNetworkWeights;

function setup() {
    const canvas = createCanvas(920, 700);

    canvas.parent('pong');
    ball = Ball();
    paddles.player = Paddle('left')
    paddles.ai = Paddle('right')
    ai = Ai();
    frameRate(60);
    neuralNetwork = NeuralNetwork();
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
        textSize(32);
        fill(255);
        textAlign(CENTER, CENTER);

        if (ball.didPlayerWin()) {
            text('I am the winner!', width / 2, 250);
        } else {
            text("Simple AI's still rule!", width / 2, 250);
        }

        text('Press return to start again!', width / 2, height / 2);

        if (keyIsDown(ENTER)) {
            reset();
            state = 'running'
        }
    } else {
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

        const neuralNetworkMove = neuralNetwork(ball, paddles.player);

        if (neuralNetworkMove === 'up') {
            paddles.player.moveUp();
        } else if (neuralNetworkMove === 'down') {
            paddles.player.moveDown();
        }

        if (ball.isBallOffScreen()) {
            state = 'game over';
        }
    }
}

function reset() {
    paddles.player = Paddle('left');
    paddles.ai = Paddle('right');
    ball = Ball()
}