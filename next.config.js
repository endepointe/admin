require('dotenv').config();

module.exports = {
  env: {
    PSQLUSER: process.env.PSQLUSER,
    PSQLPASS: process.env.PSQLPASS
  }
}

/*
https://coderrocketfuel.com/article/how-to-run-a-npm-start-script-with-pm2
*/