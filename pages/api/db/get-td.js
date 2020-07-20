const { db } = require('../../../db/pgp');

export default async (req, res) => {
  if (req.method === 'GET') {
    console.log(req.query.tablename);
    const result = await db.manyOrNone(`SELECT * FROM ${req.query.tablename}`);
    if (result) {
      return res.status(200).send(JSON.stringify(result));
    }
    return res.status(200).send(`${result}`);
  }
}