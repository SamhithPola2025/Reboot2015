const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = 3000;

app.get('/hello', (req, res) => {
  res.send('Hello from Node.js');
});

app.post('/submit', (req, res) => {
  const website = req.body.websiteinput;
  console.log("User submitted:", website);
  res.send(`
    <html>
      <head>
        <script>
          const submittedWebsite = ${JSON.stringify(website)};
        </script>
        <script src="/script.js" defer></script>
      </head>
      <body>
        <h1>Searching Wayback Machine for ${website}...</h1>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});