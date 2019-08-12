const {
    relu,
    dotVectorMatrix,
    createRandomMatrix,
    vectorSubtract,
    transpose,
    vectorMultiply,
    reluToDerivative,
    outerProduct,
    scalarMatrixMultiply,
    matrixSubtract,
    matrixMultiply,
    dotMatrix
} = require('./functions');

function neuralNetwork(layer0, whatHappened) {
    let alpha = 0.001;
    const hiddenSize = 6;
    let layer1Weights = createRandomMatrix(layer0[0].length, hiddenSize);
    let layer2Weights = createRandomMatrix(hiddenSize, 1);
    let previousErrors = -10;
    let layer2Errors = 0;

    for (let training = 0; training < 1000000000; training = training + 1) {
        if (training % 50 === 0) previousErrors = layer2Errors
        layer2Errors = 0;

        layer0.forEach((currentLayer0, index) => {
            const layer1 = relu(dotVectorMatrix(currentLayer0, layer1Weights));
            const layer2 = dotVectorMatrix(layer1, layer2Weights);

            layer2Errors = layer2Errors + Math.pow(layer2[0] - whatHappened[index], 2);

            const layer2Delta = layer2[0] - whatHappened[index];
            const layer1Delta = matrixMultiply([dotVectorMatrix([layer2Delta], transpose(layer2Weights))], [reluToDerivative(layer1)]);

            layer2Weights = matrixSubtract(layer2Weights, scalarMatrixMultiply(alpha, dotMatrix(transpose([layer1]), [[layer2Delta]])));

            layer1Weights = matrixSubtract(
                layer1Weights,
                scalarMatrixMultiply(alpha, dotMatrix(transpose([currentLayer0]), layer1Delta))
            );
        });

        if (training % 50 === 0) {
            console.log('error: ', layer2Errors);
            // if (previousErrors > layer2Errors) {
            //     console.log('breaking');
            //     break;
            // }
        }

    }

    return {
        layer1Weights,
        layer2Weights
    }
}

module.exports = { neuralNetwork };