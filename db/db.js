const { Pool } = require('pg');

const pool = new Pool({
  host: 'ec2-184-72-236-57.compute-1.amazonaws.com',
  user: 'snqxtmutvhqxwz',
  database: 'd72gaiopcji85n',
  password: '5e1dd3dee7321cb1a0101665e2d3981fd12f20684e4f4f6a58f6351279f463d3',
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;
