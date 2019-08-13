let ball;
let paddles = {
    player: null,
    ai: null
};
let ai;
let state = 'not started';
const record = Record();
let sentData = false;
const neuralNetworkWeights = {
    layer1: null,
    layer2: null
};
let switchingToNeuralNetwork = false

function setup() {
    const canvas = createCanvas(920, 700);

    canvas.parent('pong');
    ball = Ball();
    paddles.player = Paddle('left')
    paddles.ai = Paddle('right')
    ai = Ai();
    frameRate(60);
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
            text('You Win!', width / 2, 250);
            if (!sentData) {
                sentData = true;
            }
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

        if (neuralNetworkWeights.layer1) {
            text('network playing', 0, 0);
            const neuralNetworkMove = neuralNetwork(ball, paddles.player, neuralNetworkWeights);

            if (neuralNetworkMove === 'up') {
                paddles.player.moveUp();
            } else if (neuralNetworkMove === 'down') {
                paddles.player.moveDown();
            }
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

function sendRecord() {
    const apiUrl = '//localhost:3000/api/record-game';
    const data = {
        inputs: record.inputs,
        outputs: record.outputs
    };

    httpPost(apiUrl, 'json', data, result => {
        neuralNetworkWeights.layer1 = result.weights.layer1Weights;
        neuralNetworkWeights.layer2 = result.weights.layer2Weights;
    });
}

function neuralNetwork(ball, paddle, weights) {
    const input = [
        ball.location.x,
        ball.location.y,
        ball.velocity.x,
        ball.velocity.y,
        paddle.location.x,
        paddle.location.y
    ];

    const layer1 = relu(dotVectorMatrix(input, weights.layer1));
    const layer2 = Math.round(dotVectorMatrix(layer1, weights.layer2));
    console.log(layer2);

    if (layer2 > 0) {
        return 'up';
    } else if (layer2 < 0) {
        return 'down';
    }
}

function relu(vector) {
    return vector.map(item => (item > 0 ? item : 0));
}

function dotVectorMatrix(vector, matrix) {
    return transpose(matrix).map(row => dot(vector, row));
}

function dot(vector1, vector2) {
    if (vector1.length !== vector2.length)
        throw new Error("vectors must be same length");

    return vectorMultiply(vector1, vector2).reduce(
        (sum, number) => sum + number,
        0
    );
}

function transpose(matrix) {
    const transposedMatrix = [];

    for (
        let matrixWidthIndex = 0;
        matrixWidthIndex < matrix[0].length;
        matrixWidthIndex = matrixWidthIndex + 1
    ) {
        const newRow = [];

        matrix.forEach(row => newRow.push(row[matrixWidthIndex]));

        transposedMatrix.push(newRow);
    }

    return transposedMatrix;
}

function vectorMultiply(vector1, vector2) {
    if (vector1.length !== vector2.length)
        throw new Error("vectors must be same length");
    return vector1.map((firstNumber, index) => firstNumber * vector2[index]);
}