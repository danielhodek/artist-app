const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const loginRoute = require('./routes/loginRoute');
const artistRoute = require('./routes/artistRoute');

app.set('view engine', 'pug');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(loginRoute);
app.use(artistRoute);

app.get('/', (req, res, next) => {
  res.redirect(301, '/login');
});

app.listen(process.env.PORT || 3000, () => console.log('server ready'));
