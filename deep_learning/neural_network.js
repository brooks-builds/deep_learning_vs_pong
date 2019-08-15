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
    let weightUpdateLimiter = 0.0001; // alpha
    const numberOfFirstPredictions = trainingData.inputs[0].length + 1; // hidden layer
    const numberOfInputs = trainingData.inputs[0].length;
    let firstNeuronWeights = createRandomMatrix(numberOfInputs, numberOfFirstPredictions);
    const numberOfFinalOutputs = 1;
    let secondNeuronWeights = createRandomMatrix(numberOfFirstPredictions, numberOfFinalOutputs);
    const maxTrainingIterations = 100000;

    for (let training = 0; training < maxTrainingIterations; training = training + 1) {
        let totalErrors = 0;

        trainingData.inputs.forEach((currentInputs, trainingDataIndex) => {
            const firstPredictions = dotVectorMatrix(currentInputs, firstNeuronWeights);
            const deactivatedFirstPredictions = relu(firstPredictions);
            const finalPredictions = dotVectorMatrix(deactivatedFirstPredictions, secondNeuronWeights);
            const finalPredictionsDelta = finalPredictions[0] - trainingData.outputs[trainingDataIndex];
            const finalPredictionsErrors = Math.pow(finalPredictionsDelta, 2);

            totalErrors = totalErrors + finalPredictionsErrors;

            const firstPredictionsdeltas = dotVectorMatrix([finalPredictionsDelta], transpose(secondNeuronWeights));
            const firstPredictionsDerivatives = reluToDerivative(deactivatedFirstPredictions);
            const firstPredictionDeltas = matrixMultiply([firstPredictionsdeltas], [firstPredictionsDerivatives]);
            const weightedFinalDeltas = dotMatrix(transpose([deactivatedFirstPredictions]), [[finalPredictionsDelta]]);
            const limitedWeightedFinalDeltas = scalarMatrixMultiply(weightUpdateLimiter, weightedFinalDeltas);

            secondNeuronWeights = matrixSubtract(secondNeuronWeights, limitedWeightedFinalDeltas);

            firstNeuronWeights = matrixSubtract(
                firstNeuronWeights,
                scalarMatrixMultiply(weightUpdateLimiter, dotMatrix(transpose([currentInputs]), firstPredictionDeltas))
            ); 1
        });

        if (training % 10 === 0) {
            if (isNaN(totalErrors)) throw new Error('error too big or too small');
            const accuracy = calculateAccuracy(testingData, firstNeuronWeights, secondNeuronWeights);
            process.stdout.write(`accuracy: ${(accuracy * 100).toFixed(2)}%  |  errors: ${totalErrors.toFixed(15)} | iterations left: ${maxTrainingIterations - training}                  \r`);

            if (totalErrors < 0.001 || accuracy > 0.985) {
                console.log('\nfinished training');
                break;
            }
        }
    }

    return {
        firstNeuronWeights,
        secondNeuronWeights
    }
}

function calculateAccuracy(data, firstNeuronWeights, secondNeuronWeights) {
    let correctlyGuessed = 0;

    data.inputs.forEach((currentInputs, trainingDataIndex) => {
        const deactivatedFirstPredictions = relu(dotVectorMatrix(currentInputs, firstNeuronWeights));
        const finalPredictions = Math.round(dotVectorMatrix(deactivatedFirstPredictions, secondNeuronWeights));

        if (data.outputs[trainingDataIndex] > 0 && finalPredictions > 0) {
            correctlyGuessed = correctlyGuessed + 1;
        } else if (data.outputs[trainingDataIndex] < 0 && finalPredictions < 0) {
            correctlyGuessed = correctlyGuessed + 1;
        } else if (data.outputs[trainingDataIndex] === 0 && finalPredictions === 0) {
            correctlyGuessed = correctlyGuessed + 1;
        }
    })

    return correctlyGuessed / data.inputs.length;
}

module.exports = { neuralNetwork };