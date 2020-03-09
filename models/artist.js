const db = require('../db/db');

const addSql = 'INSERT INTO artists (name, about, url) VALUES ($1, $2, $3)';
const getByIdSql = 'SELECT * FROM artists WHERE id = $1';

exports.add = a => {
  db.query(addSql, [a.name, a.about, a.url]);
}

exports.getAll = () => {
  return db.query('SELECT * FROM artists');
}

exports.getById = id => {
  return db.query(getByIdSql, id);
}
