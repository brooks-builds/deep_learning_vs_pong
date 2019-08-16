function createRandomMatrix(rows, columns) {
    const matrix = []

    for (let rowIndex = 0; rowIndex < rows; rowIndex = rowIndex + 1) {
        const row = []

        for (let columnIndex = 0; columnIndex < columns; columnIndex = columnIndex + 1) {
            const randomNumber = Math.random() * 2 - 1

            row.push(randomNumber)
        }

        matrix.push(row)
    }

    return matrix
}

function dotVectorMatrix(vector, matrix) {
    const transposedMatrix = transpose(matrix)

    return transposedMatrix.map(row => dot(vector, row));
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
    return vector1.reduce((weightedSum, vector1Value, index) => weightedSum + vector1Value * vector2[index], 0)
}

function relu(vector) {
    return vector.map(value => value > 0 ? value : 0)
}

function reluToDerivative(vector) {
    return vector.map(value => value > 0 ? 1 : 0)
}

function matrixMultiply(matrix1, matrix2) {
    return matrix1.map((matrix1Row, rowIndex) => matrix1Row.map((value, columnIndex) => value * matrix2[rowIndex][columnIndex]))
}

function dotMatrix(matrix1, matrix2) {
    return matrix1.map(matrix1row =>
        transpose(matrix2).map(matrix2Row => dot(matrix1row, matrix2Row))
    );
}

function scalarMatrixMultiply(scalar, matrix) {
    const newMatrix = [];

    for (let rowIndex = 0; rowIndex < matrix.length; rowIndex = rowIndex + 1) {
        newMatrix.push(matrix[rowIndex].map(value => scalar * value))
    }

    return newMatrix
}

function scalarVectorMultiply(scalar, vector) {

}

function matrixSubtract(matrix1, matrix2) {

}

function vectorSubtract(vector1, vector2) {

}

module.exports = {
    createRandomMatrix,
    relu,
    dotVectorMatrix,
    transpose,
    dot,
    vectorSubtract,
    reluToDerivative,
    scalarMatrixMultiply,
    scalarVectorMultiply,
    matrixSubtract,
    dotMatrix,
    matrixMultiply
};