const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.set('view options', { delimiter: '?' });
app.use(express.static(path.join(__dirname, 'public')));

// root route
app.get('/', (req, res) => {
  res.render('landing');
});

app.listen(3000, () => {
  console.log('Server has started and listening on port 3000!');
});
