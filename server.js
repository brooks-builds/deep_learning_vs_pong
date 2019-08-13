const express = require('express');
const bodyParser = require('body-parser');

const { neuralNetwork } = require('./deep_learning/neural_network');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/health', (request, response) => response.json({ message: 'healthy' }));
app.post('/api/get-weights', (request, response) => {
    const weights = neuralNetwork(request.body);

    response.json({ message: 'received', weights });
});


app.listen(port, () => console.log(`server listening on port ${port}`));