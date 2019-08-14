function Ai() {
    const decision = (ball, paddle) => {
        if (ball.location.y < paddle.location.y) {
            return 'up';
        } else if (ball.location.y > paddle.location.y + paddle.paddleHeight) {
            return 'down';
        }
    }

    return {
        decision
    };
}