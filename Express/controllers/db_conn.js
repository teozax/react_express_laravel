var mysql = require('mysql');
require('dotenv').config();


const pool= mysql.createPool({
    connectionLimit : process.env.DB_CONNECTION_LIMIT,
    host            : process.env.DB_HOST,
    port            : process.env.DB_PORT,
    user            : process.env.DB_USER,
    password        : process.env.DB_PASSWORD,
    database        : process.env.DB_NAME,
    charset         : process.env.DB_CHARSET,
    acquireTimeout  : 1000000
  });

// pool.connect((err)=> {
//   if(err) console.log ('5'); return;
//   console.log('Database connected successfully');
//   // connection.release();
// });
  
module.exports = pool;