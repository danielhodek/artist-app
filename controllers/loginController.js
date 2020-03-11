exports.get = (req, res, next) => {
    res.render('login');
}

exports.login = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  
  if (username.toLowerCase() === 'a00907279' && password === 'password') {
    return res.redirect(301, '/artists');
  } else {
    return res.render('login', { msg: 'Username or password incorrect' });
  }
}
