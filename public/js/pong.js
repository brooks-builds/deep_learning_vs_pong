let ball;
let paddles = {
    player: null,
    ai: null
};
let ai;
let state = 'not started';
let neuralNetwork;
let score = {
    neuralNetwork: 0,
    ai: 0,
    max: 10
};

function setup() {
    const canvas = createCanvas(920, 700);

    canvas.parent('pong');
    ball = Ball();
    paddles.player = Paddle('left')
    paddles.ai = Paddle('right')
    ai = Ai();
    frameRate(60);
    neuralNetwork = NeuralNetwork();

    document.getElementById('save').addEventListener('click', () => {
        neuralNetwork.saveWeights();
        state = 'not started';
    });
    document.getElementById('restore').addEventListener('click', () => {
        neuralNetwork.loadWeights();
        reset();
        state = 'playing';
    });
    document.getElementById('restart').addEventListener('click', () => {
        reset();
        state = 'playing';
    });
}

function draw() {
    background(0);
    textSize(32);
    fill(255);
    if (state === 'not started') {
        textAlign(CENTER, CENTER);
        text('Press Enter to Start', width / 2, 250);

        if (keyIsDown(ENTER)) {
            state = 'running'
        }
    } else if (state === 'game over') {
        textSize(32);
        fill(255);
        textAlign(CENTER, CENTER);

        if (score.neuralNetwork >= 10) {
            text('I am the winner!', width / 2, 250);
        } else {
            text("Simple AI's still rule!", width / 2, 250);
        }

        text('Press return to start again!', width / 2, height / 2);

        if (keyIsDown(ENTER)) {
            score.neuralNetwork = 0;
            score.ai = 0;
            reset();
            state = 'running'
        }
    } else if (state === 'score') {
        if (ball.didPlayerWin()) {
            score.neuralNetwork = score.neuralNetwork + 1;
        } else {
            score.ai = score.ai + 1;
        }

        if (score.neuralNetwork < 10 && score.ai < 10) {
            reset();
            state = 'playing';
        } else {
            state = 'game over';
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

        const neuralNetworkMove = neuralNetwork.decision(ball, paddles.player);

        if (neuralNetworkMove === 'up') {
            paddles.player.moveUp();
        } else if (neuralNetworkMove === 'down') {
            paddles.player.moveDown();
        }

        if (ball.isBallOffScreen()) {
            state = 'score';
        }
    }

    textAlign(LEFT);
    text(`Neural Network`, 5, 25);
    textAlign(RIGHT);
    text(`Simple Ai`, width - 5, 25);

    textAlign(CENTER);
    if (score.neuralNetwork > score.ai) {
        fill('red');
    } else {
        fill('white');
    }
    text(score.neuralNetwork, width / 2 - 25, 25);
    rect(width / 2 - 2, 0, 4, 50);
    if (score.ai > score.neuralNetwork) {
        fill('red');
    } else {
        fill('white');
    }
    text(score.ai, width / 2 + 25, 25);
}

function reset() {
    paddles.player = Paddle('left');
    paddles.ai = Paddle('right');
    ball = Ball()
}