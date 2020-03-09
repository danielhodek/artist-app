let Artist = require('../models/artist');

exports.add = async (req, res, next) => {
  let artist = {
    name: req.body.name,
    about: req.body.about,
    url: req.body.url
  };

  Artist.add(artist);
}

exports.getAll = async (req, res, next) => {
  let data = await Artist.getAll();
  res.render('artist', { artists: data.rows });
}

exports.getById = async (req, res, next) => {
  let data = await Artist.getById(req.params.id);
  res.render('artists', { artists: data.rows[0] }); 
}

exports.logout = (req, res, next) => {
  return res.redirect(301, '/artists');
}
