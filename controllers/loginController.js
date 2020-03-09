exports.login = (req, res, next) => {
  res.render('login');
}

exports.login = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  
  if (username === 'a00907279' && password === "password") {
    return res.redirect(301, '/artists');
  } else {
    return res.status(401).send('Username or password incorrect.');
  }
}
