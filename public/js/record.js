function Record() {
    const inputs = [];
    const outputs = [];
    const keyPressedToOutput = {
        up: [1, 0],
        down: [0, 1],
        [undefined]: [0, 0]
    };

    const recordInput = (ball, paddle, keyPressed) => {
        inputs.push({
            ballLocationX: ball.location.x,
            ballLocationY: ball.location.y,
            ballVelocityX: ball.velocity.x,
            ballVelocityY: ball.velocity.y,
            paddleLocationX: paddle.location.x,
            paddleLocationY: paddle.location.y
        });

        outputs.push(keyPressedToOutput[keyPressed]);
    }

    return {
        inputs,
        outputs,
        recordInput
    };
}