function Paddle(side) {
    const paddleHeight = 100;
    const paddleWidth = 20;
    const color = 255;
    const paddleSide = {
        'left': createVector(10, height / 2 - paddleHeight / 2),
        'right': createVector(width - paddleWidth - 10, height / 2 - paddleHeight / 2)
    }
    let location = paddleSide[side];
    const speed = 12;

    const render = () => {
        fill(color);
        rect(location.x, location.y, paddleWidth, paddleHeight);
    }

    const moveUp = () => {
        location.y = location.y - speed;
    }

    const moveDown = () => {
        location.y = location.y + speed;
    }

    const stopAtEdge = () => {
        if (location.y < 0) {
            location.y = 0;
        } else if (location.y + paddleHeight > height) {
            location.y = height - paddleHeight;
        }
    }

    const reset = () => {
        location = paddleSide[side];
    }

    return {
        render,
        height,
        moveDown,
        moveUp,
        stopAtEdge,
        location,
        paddleHeight,
        paddleWidth,
        side,
        reset
    };
}