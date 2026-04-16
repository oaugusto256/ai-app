const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/translate', (req, res) => {
  // Handle POST request to /translate
  res.send({ translated_text: 'Translation result' });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});