const chai = require('chai');

const { createRandomMatrix,
    relu,
    dotVectorMatrix,
    transpose,
    dot,
    vectorMultiply
} = require('../deep_learning/functions');

const assert = chai.assert;

describe("canary test", () => {
    it("5 should be 5", () => {
        assert.equal(5, 5);
    });
});

describe("createRandomMatrix", () => {
    it("should create a matrix with random numbers between -1 and 1", () => {
        const rows = 3;
        const columns = 4;
        const matrix = createRandomMatrix(rows, columns);

        assert.equal(matrix.length, rows);

        matrix.forEach(row => {
            assert.equal(row.length, columns);

            row.forEach(column => {
                assert.isAbove(column, -1);
                assert.isBelow(column, 1);
            });
        });
    });
});

describe("relu", () => {
    it("should return the same vector with all negative numbers converted to 0s", () => {
        const vector = [1, 2, -5, 0, -9];
        const expectedOutput = [1, 2, 0, 0, 0];

        assert.deepEqual(relu(vector), expectedOutput);
    });
});

describe("dotVectorMatrix", () => {
    it("should perform a dot between a vector and a matrix", () => {
        const vector = [1, 2, 3];
        const matrix = [
            [1, 2, 3, 4],
            [5, 6, 7, 5],
            [9, 0, 1, 6]];
        const expectedOutput = [38, 14, 20, 32];

        assert.deepEqual(dotVectorMatrix(vector, matrix), expectedOutput);
    });
});

describe("transpose", () => {
    it("should transpose a 4x1 matrix", () => {
        const matrix = [[1, 2, 3, 4]];
        const expectedOutput = [[1], [2], [3], [4]];

        assert.deepEqual(transpose(matrix), expectedOutput);
    });

    it("should transpose a 2x3 matrix", () => {
        const matrix = [
            [1, 2],
            [3, 4],
            [5, 6]];
        const expectedOutput = [
            [1, 3, 5],
            [2, 4, 6]];

        assert.deepEqual(transpose(matrix), expectedOutput);
    });
});

describe("dot", () => {
    it("should dot (weighted sum / inner product) two vectors together", () => {
        const vector1 = [1, 2, 3];
        const vector2 = [4, 5, 6];
        const expectedOutput = 32;

        assert.deepEqual(dot(vector1, vector2), expectedOutput);
    });
});

describe("vectorMultiply", () => {
    it("should multiply 2 vectors together", () => {
        const vectorA = [1, 2, 3];
        const vectorB = [4, 5, 6];
        const expectedOutput = [4, 10, 18];

        assert.deepEqual(vectorMultiply(vectorA, vectorB), expectedOutput);
    });

    it("should fail if 2 vectors of different sizes are passed in", () => {
        const vectorA = [1];
        const vectorB = [1, 2];

        assert.throws(
            vectorMultiply.bind(this, vectorA, vectorB),
            "vectors must be same length"
        );
    });
});