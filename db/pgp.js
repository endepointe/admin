const pgp = require('pg-promise')({
  // connect(client, dc, useCount) {
  //   const cp = client.connectionParameters;
  //   console.log('Connected to database:', cp.database);
  // },
  // disconnect(client, dc) {
  //   const cp = client.connectionParameters;
  //   console.log('Disconnecting from database:', cp.database);
  // },
  // error(err, e) {
  //   if (e.cn) {
  //     console.log(err);
  //   }
  // }
});

const cn = {
  host: 'localhost',
  port: 5432,
  database: 'dbadmin',
  user: process.env.PSQLUSER,
  password: process.env.PSQLPASS,
  // max: 2 // use up to 30 connections
}

const db = pgp(cn);

module.exports = { db };