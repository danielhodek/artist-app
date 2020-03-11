const db = require('../db/db');

const getWithFilterSql = "SELECT * FROM artists WHERE LOWER(name) LIKE '%' || $1 || '%'";
const getByIdSql = 'SELECT * FROM artists WHERE id = $1';
const addSql = 'INSERT INTO artists (name, about, url) VALUES ($1, $2, $3)';

exports.get = () => {
  return db.query('SELECT * FROM artists');
}

exports.getWithFilter = (filter) => {
  return db.query(getWithFilterSql, [filter.toLowerCase()]);
}

exports.getById = id => {
  return db.query(getByIdSql, [id]);
}

exports.add = a => {
  return db.query(addSql, [a.name, a.about, a.url]);
};

exports.delete = id => {
  return db.query('DELETE FROM artists WHERE id = $1', [id]);
}
