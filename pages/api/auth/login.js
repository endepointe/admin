const db = require('../../../db/pgp');
const bcrypt = require('bcrypt');

export default async (req, res) => {
  if (req.method === "POST") {
    console.log(req.body);
    const { email, password } = req.body;
    const key = email.concat('', password);
    db.oneOrNone('SELECT email, password FROM users WHERE email = $1', `${email}`)
      .then((response) => {
        if (response !== null) {
          bcrypt.compare(key, response.password, (err, result) => {
            try {
              if (err) {
                throw err;
              }
              if (result) {
                let at = email.indexOf('@');
                console.log(email.slice(0, at));
                res.status(200).send({
                  status: 1,
                  msg: email.slice(0, at)
                });
              } else {
                res.status(200).send({
                  status: 2,
                  msg: "Invalid credentials, try again."
                });
              }
            } catch (err) {
              res.status(500).send('Network error, try again.');
            }
          });
        } else {
          console.log(response)
          res.status(200).send({
            status: 0,
            msg: 'Account not found, try again.'
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
}