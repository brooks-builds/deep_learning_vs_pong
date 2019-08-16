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
    const newMatrix = []

    for (let columnIndex = 0; columnIndex < matrix[0].length; columnIndex = columnIndex + 1) {
        newMatrix.push(matrix.map(row => row[columnIndex]))
    }

    return newMatrix
}

function dot(vector1, vector2) {

}

function relu(vector) {

}

function reluToDerivative(vector) {

}

function matrixMultiply(matrix1, matrix2) {

}

function dotMatrix(matrix1, matrix2) {

}

function scalarMatrixMultiply(scalar, matrix) {

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