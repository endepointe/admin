const { db } = require('../../../db/pgp');
const bcrypt = require('bcrypt');
const saltRounds = 10;

export default async (req, res) => {

  if (req.method === 'POST') {

    const { email, password } = req.body;
    const lock = email.concat('', password);

    bcrypt.genSalt(saltRounds, (err, salt) => {
      bcrypt.hash(lock, salt, (err, hash) => {
        db.oneOrNone('SELECT * FROM users WHERE email = $1', `${email}`)
          .then((result) => {
            if (result !== null) {
              res.status(200).send({
                status: 0,
                msg: "User already exists"
              });
            } else {
              db.query(`INSERT INTO users VALUES ('${email}', '${hash}')`)
                .then((data) => {
                  let at = email.indexOf('@');
                  res.status(200).send({
                    status: 1,
                    msg: email.slice(0, at)
                  });
                })
                .catch((error) => {
                  res.status(500).send('Issue with registration');
                });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      });
    });
  };
}
