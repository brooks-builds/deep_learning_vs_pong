const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.get('/health', (request, response) => response.json({ message: 'healthy' }));

app.listen(port, () => console.log(`server listening on port ${port}`));