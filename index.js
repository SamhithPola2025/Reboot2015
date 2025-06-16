const express = require('express');
const app = express()
const PORT = 3000;

app.use(express.static('public'));

app.get('/hello', (req, res) => {
    res.send('Hello from Node.js');
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});