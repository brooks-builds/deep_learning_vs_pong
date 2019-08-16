function createRandomMatrix(rows, columns) {
    const matrix = []

    for (let rowIndex = 0; rowIndex < rows; rowIndex = rowIndex + 1) {
        const newRow = []

        for (let columnIndex = 0; columnIndex < columns; columnIndex = columnIndex + 1) {
            const randomNumber = Math.random() * 2 - 1

            newRow.push(randomNumber)
        }

        matrix.push(newRow)
    }

    return matrix
}

function dotVectorMatrix(vector, matrix) {
    const transposedMatrix = transpose(matrix)

    return transposedMatrix.map(row => dot(vector, row));
}

function transpose(matrix) {
    const transposedMatrix = []

    for (let columnIndex = 0; columnIndex < matrix[0].length; columnIndex = columnIndex + 1) {
        transposedMatrix.push(matrix.map(row => row[columnIndex]))
    }

    return transposedMatrix
}

function dot(vector1, vector2) {
    return vector1.reduce((weightedSum, vector1Value, index) => weightedSum + vector1Value * vector2[index], 0)
}

function relu(vector) {
    return vector.map(value => value > 0 ? value : 0)
}

function reluToDerivative(vector) {
    return vector.map(value => value > 0 ? 1 : 0);
}

function dotMatrix(matrix1, matrix2) {
    const transposedMatrix = transpose(matrix2)
    const newMatrix = []

    for (let rowIndex = 0; rowIndex < matrix1.length; rowIndex = rowIndex + 1) {
        const matrix1Row = matrix1[rowIndex]

        newMatrix.push(transposedMatrix.map(row => dot(matrix1Row, row)))
    }

    return newMatrix
}

function scalarMatrixMultiply(scalar, matrix) {
    return matrix.map(vector => scalarVectorMultiply(scalar, vector))
}

function scalarVectorMultiply(scalar, vector) {
    return vector.map(value => scalar * value)
}

function matrixSubtract(matrix1, matrix2) {
    return matrix1.map((matrix1Row, rowIndex) => vectorSubtract(matrix1Row, matrix2[rowIndex]))
}

function vectorSubtract(vector1, vector2) {
    return vector1.map((vector1Value, index) => vector1Value - vector2[index])
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
    dotMatrix
};