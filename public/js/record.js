function Record() {
    const inputs = [];
    const outputs = [];
    const keyPressedToOutput = {
        up: 1,
        down: -1,
        [undefined]: 0
    };

    const recordInput = (ball, paddle, keyPressed) => {
        if (inputs.length === 1) return 'ready';

        ballLocation = ball.location.copy();
        ballVelocity = ball.velocity.copy();
        paddleLocation = paddle.location.copy();

        ballLocation.normalize();
        ballVelocity.normalize();
        paddleLocation.normalize();

        inputs.push([
            ballLocation.x,
            ballLocation.y,
            ballVelocity.x,
            ballVelocity.y,
            paddleLocation.x,
            paddleLocation.y
        ]);

        outputs.push(keyPressedToOutput[keyPressed]);
    }

    return {
        inputs,
        outputs
    };
}