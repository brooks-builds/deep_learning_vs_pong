function NeuralNetwork() {
    const weights = {
        layer1: null,
        layer2: null
    };

    const generateTrainingData = (count) => {
        const inputs = [];
        const outputs = [];

        for (let _i = 0; _i < count; _i = _i + 1) {
            const ballLocation = createVector(random(50, width - 50), random(50, height - 50));
            const ballVelocity = createVector(random(-1, 1), random(-1, 1));
            const paddleLocation = createVector(10, random(0, height - 100));
            const arenaWidth = width;
            const arenaHeight = height;

            ballVelocity.normalize();
            ballVelocity.mult(11);

            const interceptWithPaddleLine = calculateInterceptPoint(paddleLocation, ballVelocity, ballLocation);


            if (interceptWithPaddleLine.y < paddleLocation.y) {
                outputs.push(1);
            } else if (interceptWithPaddleLine.y > paddleLocation.y + 100) {
                outputs.push(-1);
            } else {
                outputs.push(0);
            }

            // interceptWithPaddleLine.normalize();
            // ballLocation.normalize();
            // paddleLocation.normalize();

            inputs.push([
                ballLocation.x / 1000,
                ballLocation.y / 1000,
                ballVelocity.x / 1000,
                ballVelocity.y / 1000,
                paddleLocation.x / 1000,
                paddleLocation.y / 1000,
                interceptWithPaddleLine.y / 1000,
                width / 1000,
                height / 1000
            ]);


        }

        return {
            inputs,
            outputs
        };
    };

    const calculateInterceptPoint = (paddleLocation, ballVelocity, ballLocation) => {
        let velocityScalar = ballVelocity.y / ballVelocity.x;

        velocityScalar = velocityScalar * (paddleLocation.x - ballLocation.x);

        const ballInterceptY = velocityScalar + ballLocation.y;
        const interceptVector = createVector(paddleLocation.x, ballInterceptY);

        return interceptVector;
    }

    const getWeights = data => {
        return new Promise((resolve, reject) => {
            httpPost('/api/get-weights', 'json', data, resolve);
        });
    };

    const decision = (ball, paddle) => {
        const ballLocation = ball.location.copy();
        const ballVelocity = ball.velocity.copy();
        const paddleLocation = paddle.location.copy();
        const interceptWithPaddleLine = calculateInterceptPoint(paddleLocation, ballVelocity, ballLocation);

        // ballLocation.normalize();
        // ballVelocity.normalize();
        // paddleLocation.normalize();

        const currentLayer0 = [
            ballLocation.x / 1000,
            ballLocation.y / 1000,
            ballVelocity.x / 1000,
            ballVelocity.y / 1000,
            paddleLocation.x / 1000,
            paddleLocation.y / 1000,
            interceptWithPaddleLine.y / 1000,
            width / 1000,
            height / 1000,
        ];
        const layer1 = relu(dotVectorMatrix(currentLayer0, weights.layer1));
        const layer2 = Math.round(dotVectorMatrix(layer1, weights.layer2));

        console.log('prediction', layer2);

        if (layer2 > 0) {
            return 'up';
        } else if (layer2 < 0) {
            return 'down';
        }
    };

    const trainingData = generateTrainingData(100);
    const testingData = generateTrainingData(600);

    return getWeights({ trainingData, testingData })
        .then(response => {
            weights.layer1 = response.weights.layer1Weights,
                weights.layer2 = response.weights.layer2Weights
        })
        .then(() => decision);
}

function relu(vector) {
    return vector.map(item => (item > 0 ? item : 0));
}

function dotVectorMatrix(vector, matrix) {
    return transpose(matrix).map(row => dot(vector, row));
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

function dot(vector1, vector2) {
    if (vector1.length !== vector2.length)
        throw new Error("vectors must be same length");

    return vectorMultiply(vector1, vector2).reduce(
        (sum, number) => sum + number,
        0
    );
}

function vectorMultiply(vector1, vector2) {
    if (vector1.length !== vector2.length)
        throw new Error("vectors must be same length");
    return vector1.map((firstNumber, index) => firstNumber * vector2[index]);
}