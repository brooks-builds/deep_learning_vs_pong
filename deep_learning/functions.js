/* 
Create a matrix filled with random numbers between -1 and 1 exclusively.
For example, a 4,3 matrix would look like
[
    [-0.1, 0.2, 0.3],
    [-0.4, -0.1, 0.9],
    [0.4, 0.9, -0.3],
    [0.6, -0.1, 0.0]
]
*/
function createRandomMatrix(rows, columns) {

}

/*
Perform a weighted sum between a vector and a matrix.
the length of the vector must be equal to the number of rows in the matrix
We take the vector and perform a dot with it on the first items of the matrix, and then repeat for the second column .etc
for example
vector: [1, 2, 3]
matrix: [
    [1, 2],
    [3, 4],
    [5, 6]
]
results in [22, 28]
*/
function dotVectorMatrix(vector, matrix) {

}

/*
Take in two vectors, and create a new vector by multiplying the first item from each vector together, then the second and so on.
[1, 2, 3] * [4, 5, 6] -> [4, 10, 18]
*/
function vectorMultiply(vector1, vector2) {
    if (vector1.length !== vector2.length)
        throw new Error("vectors must be same length");
    return vector1.map((firstNumber, index) => firstNumber * vector2[index]);
}

/*
Performs a weighted sum over two vectors of the same length. A weighted sum is multiplying the first item of each vector, and then adding the results together with the product of the second item of each vector and so on.
[1, 2, 3] dot [4, 5, 6] -> 32
*/
function dot(vector1, vector2) {

}

/*
We want set negative numbers in the vector to 0, we can leave the positive numbers
alone. For example
[1, -1, 2] -> [1, 0, 2]
*/
function relu(vector) {

}

/*
Take a matrix and change its shape by making the first column the first row,
the second column the second row and so on.
for example
[
    [1, 2],
    [3, 4]
]
becomes
[
    [1, 3], 
    [2, 4]
]
*/
function transpose(matrix) {

}

/*
Take two vectors of the same length, and then create a new vector by subtracting the first item from each vector and the second item and so on.
[10, 9, 8] - [1, 2, 3] -> [9, 7, 5]
*/
function vectorSubtract(vector1, vector2) {
    if (vector1.length !== vector2.length)
        throw new Error("vectors must be same length");
    return vector1.map((firstNumber, index) => firstNumber - vector2[index]);
}

/*
Like relu, we want to turn negative numbers into a 0. However we are now also turning positive numbers into 1. Therefore we will end up with a vector of 1s and 0s
[1, -2, 3] -> [1, 0, 1]
*/
function reluToDerivative(vector) {
    return vector.map(item => (item > 0 ? 1 : 0));
}

/*
Take two vectors and create a matrix with delta's length as rows and inputs length as columns by multiplying each input by each delta
inputs: [1, 2, 3]
deltas: [4, 5]
results in: [
    [4, 8, 12],
    [5, 10, 15]
]
*/
function outerProduct(inputs, deltas) {
    return deltas.map(delta => inputs.map(currentInput => currentInput * delta));
}

/*
Take a scalar (number) and multiply it by every element in a matrix
scalar: 10
matrix: [
    [1, 2],
    [3, 4]
]
results in: [
    [10, 20],
    [30, 40]
]
*/
function scalarMatrixMultiply(scalar, matrix) {
    return matrix.map(matrixVector => scalarVectorMultiply(scalar, matrixVector));
}

/*
Multiply a scalar by each value in a vector, creating a new vector in the process
10 * [1, 2, 3] -> [10, 20, 30]
*/
function scalarVectorMultiply(scalar, vector) {
    return vector.map(item => item * scalar);
}

/*
subtract the values of two matrixes of the same size, creating a new matrix
matrix 1: [
    [10, 9],
    [8, 7]
]
matrix 2: [
    [1, 2],
    [3, 4]
]
results in: [
    [9, 7],
    [5, 3]
]
*/
function matrixSubtract(matrix1, matrix2) {
    return matrix1.map((matrix1Vector, index) =>
        vectorSubtract(matrix1Vector, matrix2[index])
    );
}

/*
Multiply each item of a matrix with each other, resulting in a new matrix
matrix 1: [
    [1, 2],
    [3, 4]
]
matrix 2: [
    [5, 6],
    [7, 8]
]
results in: [
    [5, 12],
    [21, 32]
]
*/
function matrixMultiply(matrix1, matrix2) {
    return matrix1.map((row, index) => vectorMultiply(row, matrix2[index]));
}

/*
Perform a weighted sum between two matrixes. That means taking the first row of matrix 1 and dotting it with the first column of matrix 2
matrix 1: [
    [1, 2, 3],
    [4, 5, 6]
]
matrix 2: [
    [7, 8],
    [9, 10],
    [11, 12]
]
results in: [
    [58, 154]
]
*/
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