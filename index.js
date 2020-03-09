const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

const ARITSTS_FILE = 'data/artists.txt';

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/artists', (req, res) => {
  fs.readFile(ARITSTS_FILE, (err, data) => {
    if (err) return res.sendStatus(500);
    return res.json(JSON.parse(data));
  });
});

app.get('/artists/:searchStr', (req, res) => {
  const searchStr = req.params.searchStr;
  const regex = new RegExp(searchStr, 'i');
  fs.readFile(ARITSTS_FILE, (err, data) => {
    if (err) return res.sendStatus(500);
    let artists = JSON.parse(data);
    let filteredArtists = artists.filter(a => regex.test(a.name));
    console.log(filteredArtists);
    return res.json(filteredArtists);
  });
});

app.post('/artists', (req, res) => {
  const artist = req.body;
  fs.readFile(ARITSTS_FILE, (err, data) => {
    if (err) return res.sendStatus(500);
    let artists = JSON.parse(data);
    artists.push(artist);
    fs.writeFile(ARITSTS_FILE, JSON.stringify(artists), 'utf-8', err => {
      if (err) return res.sendStatus(500);
      return res.sendStatus(200);
    });
  });
});

app.delete('/artists/:name', (req, res) => {
  const name = req.params.name;
  console.log(name);
  fs.readFile(ARITSTS_FILE, (err, data) => {
    if (err) return res.sendStatus(500);
    let artists = JSON.parse(data);
    let filteredArtists = artists.filter(a => a.name !== name);
    fs.writeFile(
      ARITSTS_FILE,
      JSON.stringify(filteredArtists),
      'utf-8',
      err => {
        if (err) return res.sendStatus(500);
        return res.sendStatus(200);
      }
    );
  });
});

app.listen(process.env.PORT || 3000, () => console.log('server ready'));
