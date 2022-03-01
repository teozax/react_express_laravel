var up = function (conn, cb) {
  conn.query (`CREATE TABLE products 
  ( id int AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) UNIQUE,
    type VARCHAR(255),
    description VARCHAR(255),
    filename VARCHAR(255),
    height int,
    width int,
    price int,
    rating int)`,
  function (err, res) {
    cb();
  });
}

var down = function (conn, cb) {
  conn.query ("DROP TABLE products",
  function (err, res) {
    cb();
  });
}

module.exports = {
  up,
  down
}