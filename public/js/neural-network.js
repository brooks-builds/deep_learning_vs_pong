function NeuralNetwork() {
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

            inputs.push([
                ballLocation.x,
                ballLocation.y,
                ballVelocity.x,
                ballVelocity.y,
                paddleLocation.x,
                paddleLocation.y,
                arenaHeight,
                arenaWidth,
            ]);

            const interceptWithPaddleLine = calculateInterceptPoint(paddleLocation, ballVelocity, ballLocation);

            if (interceptWithPaddleLine.y < paddleLocation.y) {
                outputs.push(1);
            } else if (interceptWithPaddleLine.y > paddleLocation.y + 100) {
                outputs.push(-1);
            } else {
                outputs.push(0);
            }
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

    const trainingData = generateTrainingData(1);
    const testingData = generateTrainingData(1000);


}