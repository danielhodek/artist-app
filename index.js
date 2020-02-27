const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/artists', (req, res) => {
  fs.readFile('data/artists.txt', (err, data) => {
    if (err)
      return console.error(err);
    return res.json(JSON.parse(data));
  });
});

app.post('/artists', (req, res) => {
  const artists = req.body;
  fs.writeFile('data/artists.txt', JSON.stringify(artists), 'utf-8', err => {
    if (err)
      return console.error(err);
    return res.sendStatus(201);
  });
}); 

app.listen(process.env.PORT || 3000, () => console.log('server ready'));
