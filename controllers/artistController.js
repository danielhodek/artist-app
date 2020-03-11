let Artist = require('../models/artist');

exports.add = async (req, res, next) => {
  let artist = {
    name: req.body.name,
    about: req.body.about,
    url: req.body.url
  };
  console.log(artist);

  await Artist.add(artist);
  return res.redirect(301, '/artists');
}

exports.get = async (req, res, next) => {
  let data;
  if (req.query.filter) {
    data = await Artist.getWithFilter(req.query.filter);
    return res.render('artist', { artists: data.rows, filter: req.query.filter });
  } else {
    data = await Artist.get();
    return res.render('artist', { artists: data.rows, filter: '' });
  }  
}

exports.getWithFilter = async (req, res, next) => {
  let data = await Artists.getWithFilter(req.query.filter);
  return res.render('artists', { artists: data.rows, filter: filter });
}

exports.getById = async (req, res, next) => {
  let data = await Artist.getById(req.params.id);
  return res.render('artist', { artists: data.rows[0] }); 
}

exports.logout = (req, res, next) => {
  return res.redirect(301, '/artists');
}

exports.delete = async (req, res, next) => {
  await Artist.delete(req.params.id);
  if (req.query.fiter)
    return res.redirect(301, '/artists');
  else
    return res.redirect(301, '/artists?filter=' + req.query.filter);
}
