function Ball() {
    const location = createVector(width / 2, height / 2);
    const size = 25;
    let color = 'white'
    const speed = 15;
    const velocity = createVector(random(-1, 1), random(-1, 1));
    // const velocity = createVector(1, 0);

    velocity.normalize();
    velocity.mult(speed);

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

    return {
        render,
        bounceOnWalls,
        move,
        collideWithPaddle,
        location
    };
}