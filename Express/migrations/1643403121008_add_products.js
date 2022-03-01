var products = require('./products.json');

var up = function (conn, cb) {
  let keys = Object.keys(products[0]);
  const sql = `INSERT INTO products 
              ( title, 
                type, 
                description ,
                filename ,
                height ,
                width ,
                price ,
                rating) VALUES ?`;

  const prods = products.map((product)=>{return (Object.values (product));});

  conn.query(sql, [prods],
    function (err, res) {
      if (err)
        console.log(err);
      cb();
    }
  );
}

var down = function (conn, cb) {
  conn.query ("",
  function (err, res) {
    cb();
  });
}

module.exports = {
  up,
  down
}