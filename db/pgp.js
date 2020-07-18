const initOptions = {
  // connect(client, dc, useCount) {
  //   const cp = client.connectionParameters;
  //   console.log('Connected to database:', cp.database);
  // },
  // disconnect(client, dc) {
  //   const cp = client.connectionParameters;
  //   console.log('Disconnecting from database:', cp.database);
  // }
}

const cn = {
  host: 'localhost',
  port: 5432,
  database: 'dbadmin',
  user: process.env.PSQLUSER,
  password: process.env.PSQLPASS,
  max: 1 // use up to 30 connections
}

const pgp = require('pg-promise')(initOptions);

const db = pgp(cn);

module.exports = db;