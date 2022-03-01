var async = require('async');

var up = function (conn, cb) {
  conn.query (`CREATE TABLE users 
    (email VARCHAR(255) PRIMARY KEY , 
    username VARCHAR(255), 
    password VARCHAR(255) NOT NULL)`, 
  function (err, res) {
    cb();
  });
}



var down = function (conn, cb) {
  conn.query ("DROP TABLE users",
  function (err, res) {
    cb();
  });
}

module.exports = {
    up,
    down
}