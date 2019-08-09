const {
    relu,
    dotVectorMatrix,
    createRandomMatrix
} = require('./functions');

function neuralNetwork(inputs, outputs) {
    const alpha = 0.01;
    const hiddenSize = 7;
    let layer1Weights = createRandomMatrix(inputs[0].length, hiddenSize);
    let layer2Weights = createRandomMatrix(hiddenSize, outputs[0].length);

    for (let iterations = 0; iterations < 1; iterations = iterations + 1) {
        let totalErrors = 0;

        inputs.forEach((layer0, inputIndex) => {
            const layer1 = relu(dotVectorMatrix(layer0, layer1Weights));
            const prediction = dotVectorMatrix(layer1, layer2Weights);

            console.log('prediction', prediction);
        })
    }
}

module.exports = { neuralNetwork };