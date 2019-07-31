const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.set('/public'));

app.get('/', (req, res) => {
  res.send('Welcome to the page!');
});

app.listen(3000, () => {
  console.log('Server has started and listening on port 3000!');
});
