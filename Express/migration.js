var mysql = require('mysql');
var migration = require('mysql-migrations');
require('dotenv').config();

var connection =  mysql.createPool({
  connectionLimit : process.env.DB_CONNECTION_LIMIT,
  host            : process.env.DB_HOST,
  port            : process.env.DB_PORT,
  user            : process.env.DB_USER,
  password        : process.env.DB_PASSWORD,
  database        : process.env.DB_NAME,
  charset         : process.env.DB_CHARSET,
  acquireTimeout  : 1000000
});

migration.init(connection, __dirname + '/migrations' , function() {
  console.log("finished running migrations");
});