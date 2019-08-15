function createRandomMatrix(rows, columns) {
    const matrix = [];

    for (let _rowCount = 0; _rowCount < rows; _rowCount = _rowCount + 1) {
        const row = [];

        for (let _columnCount = 0; _columnCount < columns; _columnCount = _columnCount + 1) {
            const randomNumber = Math.random() * 2 - 1;

            row.push(randomNumber);
        }

        matrix.push(row);
    }

    return matrix;
}

function transpose(matrix) {
    const transposedMatrix = [];

    for (let columnIndex = 0; columnIndex < matrix[0].length; columnIndex = columnIndex + 1) {
        transposedMatrix.push(matrix.map(row => row[columnIndex]));
    }

    return transposedMatrix;
}

function dot(vector1, vector2) {
    return vector1.reduce((weightedSum, value, index) => weightedSum + (value * vector2[index]), 0);
}

function dotVectorMatrix(vector, matrix) {
    return transpose(matrix).map(row => dot(vector, row));
}

function relu(vector) {
    return vector.map(value => value > 0 ? value : 0);
}

function reluToDerivative(vector) {
    return vector.map(value => value > 0 ? 1 : 0);
}

function vectorMultiply(vector1, vector2) {
    return vector1.map((vector1Value, index) => vector1Value * vector2[index]);
}

function dotMatrix(matrix1, matrix2) {
    return matrix1.map(matrix1Row => {
        const newRow = transpose(matrix2).map(matrix2Row => dot(matrix1Row, matrix2Row));

        return newRow;
    });
}

function matrixSubtract(matrix1, matrix2) {
    return matrix1.map((matrix1Row, rowIndex) => matrix1Row.map((matrix1Value, columnIndex) => matrix1Value - matrix2[rowIndex][columnIndex]));
}

function scalarMatrixMultiply(scalar, matrix) {
    return matrix.map(row => row.map(value => scalar * value));
}

function vectorSubtract(vector1, vector2) {

}

function outerProduct(inputs, deltas) {
}

function scalarVectorMultiply(scalar, vector) {
}

function matrixMultiply(matrix1, matrix2) {
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