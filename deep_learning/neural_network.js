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

function neuralNetwork(data) {
    const { trainingData, testingData } = data;
    let alpha = 0.0001;
    const hiddenSize = trainingData.inputs[0].length + 1;
    let layer1Weights = createRandomMatrix(trainingData.inputs[0].length, hiddenSize);
    let layer2Weights = createRandomMatrix(hiddenSize, 1);
    let layer2Errors = 0;

    for (let training = 0; training < 1000000; training = training + 1) {
        if (training % 1000 === 0) previousErrors = layer2Errors;

        layer2Errors = 0;

        trainingData.inputs.forEach((currentLayer0, index) => {
            const layer1 = relu(dotVectorMatrix(currentLayer0, layer1Weights));
            const layer2 = dotVectorMatrix(layer1, layer2Weights);

            layer2Errors = layer2Errors + Math.pow(layer2[0] - trainingData.outputs[index], 2);

            const layer2Delta = layer2[0] - trainingData.outputs[index];
            const layer1Delta = matrixMultiply([dotVectorMatrix([layer2Delta], transpose(layer2Weights))], [reluToDerivative(layer1)]);

            layer2Weights = matrixSubtract(layer2Weights, scalarMatrixMultiply(alpha, dotMatrix(transpose([layer1]), [[layer2Delta]])));

            layer1Weights = matrixSubtract(
                layer1Weights,
                scalarMatrixMultiply(alpha, dotMatrix(transpose([currentLayer0]), layer1Delta))
            ); 1
        });

        if (training % 10 === 0) {
            if (isNaN(layer2Errors)) throw new Error('error too big or too small');
            console.log('error: ', layer2Errors);
            console.log('accuracy: ', calculateAccuracy(testingData, layer1Weights, layer2Weights));

            if (layer2Errors < 0.1) {
                break;
            }
        }
    }

    return {
        layer1Weights,
        layer2Weights
    }
}

function calculateAccuracy(data, layer1Weights, layer2Weights) {
    let correctlyGuessed = 0;

    data.inputs.forEach((currentLayer0, index) => {
        const layer1 = relu(dotVectorMatrix(currentLayer0, layer1Weights));
        const layer2 = Math.round(dotVectorMatrix(layer1, layer2Weights));

        if (data.outputs[index] > 0 && layer2 > 0) {
            correctlyGuessed = correctlyGuessed + 1;
        } else if (data.outputs[index] < 0 && layer2 < 0) {
            correctlyGuessed = correctlyGuessed + 1;
        } else if (data.outputs[index] === 0 && layer2 === 0) {
            correctlyGuessed = correctlyGuessed + 1;
        }
    })

    return correctlyGuessed / data.inputs.length;
}

module.exports = { neuralNetwork };