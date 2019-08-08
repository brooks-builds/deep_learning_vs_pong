function State() {
    let states = {
        start: () => {
            countdown = 5;
            current = 'countdown';
        }
    };

    let current = 'not started';

    const playing = () => {
        return state === 'playing';
    }

    const update = (newState) => {
        states[newState]();
    }

    let countdown = 5;

    return {
        playing,
        current,
        update,
        countdown
    };
}