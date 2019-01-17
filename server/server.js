const express = require('express');
const path = require('path');

const publicPath = path.join(__dirname, '../public');
const app = express();
const port = process.env.PORT || 4000;

app.use(express.static(publicPath));

app.get('/', (req, res) => {
  res.send('Hello everyone');
});

app.listen(port, () => {
  console.log(`The server is on port ${port}`);
});
