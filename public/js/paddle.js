function Paddle() {
    const height = 50;
    const width = 20;
    let createVector;
    const color = 255;

    const render = () => {
        fill(color);
        rect(location.x, location.y, width, height);
    }

    const initialize = (location) {

    }

    return {
        render,
        height
    };
}