function Ball() {
    let location;
    const size = 25;
    let color = 'white'
    const speed = 11;
    let velocity;


    const setup = () => {
        location = createVector(width / 2, height / 2);
        velocity = createVector(1, -0.5);

        velocity.normalize();
        velocity.mult(speed);
    }


    const render = () => {
        fill(color);
        ellipse(location.x, location.y, size);
    };

    const bounceOnWalls = () => {
        if (location.y - size / 2 < 0) {
            location.y = size / 2;
            velocity.y = velocity.y * -1;
        } else if (location.y + size / 2 > height) {
            location.y = height - size / 2;
            velocity.y = velocity.y * -1;
        }
    }

    const move = () => {
        location.add(velocity);
    }

    const collideWithPaddle = (paddle) => {
        if (location.y > paddle.location.y && location.y < paddle.location.y + paddle.paddleHeight) {
            if (paddle.side === 'left' && location.x - size / 2 < paddle.location.x + paddle.paddleWidth && location.x + size / 2 > paddle.location.x) {
                location.x = paddle.location.x + paddle.paddleWidth + size / 2;
                velocity.x = velocity.x * -1;
            }
            else if (location.x + size / 2 > paddle.location.x && location.x + size / 2 < paddle.location.x + paddle.paddleWidth) {
                location.x = paddle.location.x - size / 2;
                velocity.x = velocity.x * -1;
            }
            color = 'red';
        } else {
            color = 'white';
        }
    }

    const isBallOffScreen = () => {
        return location.x < 0 || location.x > width;
    }

    const didPlayerWin = () => {
        return location.x > width;
    }

    const reset = () => {
        setup();
    };

    setup();

    return {
        render,
        bounceOnWalls,
        move,
        collideWithPaddle,
        location,
        isBallOffScreen,
        didPlayerWin,
        reset,
        velocity
    };
}