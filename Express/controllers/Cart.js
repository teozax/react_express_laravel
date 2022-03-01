const pool = require ('./db_conn.js');

function addProduct (req, res, next) {
  // let prods;
  const products = pool.query(`INSERT INTO cart (title, email) VALUES ('${req.body.title}', '${req.user.email}')`,
    (error, results, fields) => {
      if (error) {
        console.log(error);
        return res.json({success:false,errors:['Problem. Please, try again...']});
      }
      
      return res.json({
        success: true,
      })
    });
}


function getUserProds (req, res, next) {
  pool.query(
    `SELECT DISTINCT pr.title,pr.description,pr.price,cart.quantity 
     FROM products pr INNER JOIN cart 
     WHERE pr.title=cart.title AND cart.email='${req.user.email}'`,
    (error, results, fields) => {
      if (error) {
        console.log(error);
        return res.json({success:false,errors:['Problem. Please, try again...']});
      }
      console.log(results);
      return res.json({
        success: true,
        user_cart_items: results
      })
    });
}

function updUserProds (req, res, next) {
  // let prods;
  pool.query(
    `UPDATE cart
    SET quantity = ${req.body.quantity}
    WHERE email = '${req.user.email}' AND title = '${req.body.title}'`,
    (error, results, fields) => {
      if (error) {
        console.log(error);
        return res.json({success:false,errors:['Problem. Please, try again...']});
      }
      return res.json({
        success: true,
      })
    });
}

function remove_from_cart (req, res, next) {
  // let prods;
  pool.query(
    `DELETE FROM cart 
    WHERE email = '${req.user.email}' AND title = '${req.body.title}'`,
    (error, results, fields) => {
      if (error) {
        console.log(error);
        return res.json({success:false,errors:['Problem. Please, try again...']});
      }
      return res.json({
        success: true,
      })
    });
}

module.exports = {addProduct,getUserProds,updUserProds,remove_from_cart}