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

module.exports = {
    createRandomMatrix,
    relu,
    dotVectorMatrix,
    transpose,
    dot,
    vectorMultiply
};