function Ai() {
    const decision = (ball, paddle) => {
        if (ball.location.y < paddle.location.y + 10) {
            return 'up';
        } else if (ball.location.y > paddle.location.y + paddle.paddleHeight - 10) {
            return 'down';
        }
    }

    return {
        decision
    };
}