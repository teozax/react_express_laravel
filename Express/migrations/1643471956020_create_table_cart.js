var up = function (conn, cb) {
  conn.query (`CREATE TABLE cart 
    ( id int AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) ,
      email VARCHAR(255) ,
      quantity int DEFAULT 1,
      FOREIGN KEY (title) REFERENCES products(title) ON UPDATE CASCADE ON DELETE CASCADE,
      FOREIGN KEY (email) REFERENCES users(email) ON UPDATE CASCADE ON DELETE CASCADE )`,
    function (err, res) {
      console.log(err);
      cb();
    });
}

var down = function (conn, cb) {
  conn.query ("DROP TABLE cart",
  function (err, res) {
    cb();
  });
}

module.exports = {
  up,
  down
}