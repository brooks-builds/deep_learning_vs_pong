function createRandomMatrix(rows, columns) {
    const matrix = [];

    for (
        let _rowCount = 0;
        _rowCount < rows;
        _rowCount = _rowCount + 1
    ) {
        const row = [];

        for (
            let _columnCount = 0;
            _columnCount < columns;
            _columnCount = _columnCount + 1
        ) {
            row.push(Math.random() * 2 - 1);
        }

        matrix.push(row);
    }

    return matrix;
}

function relu(vector) {
    return vector.map(item => (item > 0 ? item : 0));
}

function dotVectorMatrix(vector, matrix) {
    return transpose(matrix).map(row => dot(vector, row));
}

function transpose(matrix) {
    const transposedMatrix = [];

    for (
        let matrixWidthIndex = 0;
        matrixWidthIndex < matrix[0].length;
        matrixWidthIndex = matrixWidthIndex + 1
    ) {
        const newRow = [];

        matrix.forEach(row => newRow.push(row[matrixWidthIndex]));

        transposedMatrix.push(newRow);
    }

    return transposedMatrix;
}

function dot(vector1, vector2) {
    if (vector1.length !== vector2.length)
        throw new Error("vectors must be same length");

    return vectorMultiply(vector1, vector2).reduce(
        (sum, number) => sum + number,
        0
    );
}

function vectorMultiply(vector1, vector2) {
    if (vector1.length !== vector2.length)
        throw new Error("vectors must be same length");
    return vector1.map((firstNumber, index) => firstNumber * vector2[index]);
}

function vectorSubtract(vector1, vector2) {
    if (vector1.length !== vector2.length)
        throw new Error("vectors must be same length");
    return vector1.map((firstNumber, index) => firstNumber - vector2[index]);
}

function reluToDerivative(vector) {
    return vector.map(item => (item > 0 ? 1 : 0));
}

function outerProduct(inputs, deltas) {
    return deltas.map(delta => inputs.map(currentInput => currentInput * delta));
}

function scalarMatrixMultiply(scalar, matrix) {
    return matrix.map(matrixVector => scalarVectorMultiply(scalar, matrixVector));
}

function scalarVectorMultiply(scalar, vector) {
    return vector.map(item => item * scalar);
}

function matrixSubtract(matrix1, matrix2) {
    return matrix1.map((matrix1Vector, index) =>
        vectorSubtract(matrix1Vector, matrix2[index])
    );
}

function matrixMultiply(matrix1, matrix2) {
    return matrix1.map((row, index) => vectorMultiply(row, matrix2[index]));
}

function dotMatrix(matrix1, matrix2) {
    return matrix1.map(matrix1row =>
        transpose(matrix2).map(matrix2Row => dot(matrix1row, matrix2Row))
    );
}

module.exports = {
    createRandomMatrix,
    relu,
    dotVectorMatrix,
    transpose,
    dot,
    vectorMultiply,
    vectorSubtract,
    reluToDerivative,
    outerProduct,
    scalarMatrixMultiply,
    scalarVectorMultiply,
    matrixSubtract,
    matrixMultiply,
    dotMatrix
};