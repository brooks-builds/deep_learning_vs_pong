const {
    relu,
    dotVectorMatrix,
    createRandomMatrix,
    transpose,
    reluToDerivative,
    scalarMatrixMultiply,
    matrixSubtract,
    matrixMultiply,
    dotMatrix
} = require('./functions');

function neuralNetwork(data) {
    const { trainingData, testingData } = data;
    // We want to create an alpha value that will be used to limit the learning of the network. This will prevent the network from over learning and wildly spinning out of control.
    let alpha = 0.0001;
    // We are using two neurons here. The first will feed into the second neuron. The first predictions are called the hidden layer. We need to choose how many predictions we want the first neuron to make
    const hiddenSize = trainingData.inputs[0].length + 1;
    // Time to generate the weights. We'll be using random weights to begin with because we have no idea what a good guess would be. The weights need to be a matrix with the number of rows set to the number of input data we are using for training. The columns will be equal to the number of predictions that we want our neuron to make
    let layer1Weights = createRandomMatrix(trainingData.inputs[0].length, hiddenSize);
    // We have two neuron, so we need to create the weights for the second one as well. This neuron will be using the predictions from the first neuron as inputs, so its rows will be set to the hidden layer size. Also in this case we are guessing one thing, so we only need a single column for our final prediction
    let layer2Weights = createRandomMatrix(hiddenSize, 1);
    // We're training over a set of input data many times. For each of these iterations we are also looping over ever input. We are setting this so that we don't accidentally create a infinite loop that never ends
    const maxTrainingIterations = 100000;

    // Time to begin! Lets start by creating a loop that will repeat for every set of input data
    for (let training = 0; training < maxTrainingIterations; training = training + 1) {
        // We want to know how our network is doing over all of the input data so lets create a final prediction error variable to capture that
        let layer2Errors = 0;

        // We are looping over all of the input data we have, and for each of them we are running the inputs through the neural network
        trainingData.inputs.forEach((currentLayer0, index) => {
            // A neuron prediction is simply getting the weighted sum (or dot) of the input vector (also known as an array for us in JavaScript land) and the weights. 

            // We are going to take the prediction and turn off the negative values. This is because those negative values cause the end result to be way off. If we set them to 0, then they won't cause the rest of the neural network to get crazy.
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
            const accuracy = calculateAccuracy(testingData, layer1Weights, layer2Weights);
            process.stdout.write(`accuracy: ${(accuracy * 100).toFixed(2)}%  |  errors: ${layer2Errors.toFixed(15)} | iterations left: ${maxTrainingIterations - training}                  \r`);

            if (layer2Errors < 0.001 || accuracy > 0.60) {
                console.log('\nfinished training');
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