function Ball() {
    const location = createVector(width / 2, height / 2);
    const size = 25;
    const color = 255;

    function render() {
        fill(color);
        ellipse(location.x, location.y, size);
    }

    return {
        render
    };
}