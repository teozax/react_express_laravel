const pool = require ('./db_conn.js');
var mysql = require('mysql');

function getProducts (req, res, next) {
  const products = pool.query('SELECT * FROM products',
    (error, results, fields) => {
      if (error || results.length<=0) return res.json({success:false,errors:['Problem. Please, try again...']});
      // console.log(results);
      return res.json({
        success: true,
        products: results
      })
    });
}

function getProduct (req, res, next, user) {
  const products = pool.query(`SELECT * FROM products WHERE id = ${req.params.id}`,
    (error, results, fields) => {
      if (error || results.length!==1) return res.json({success:false,errors:['Problem. Please, try again...']});
      
      // pool.query(`SELECT * FROM cart WHERE title = '${results[0].title}'`,
      //   (error2, results2, fields2) => {
      //     if (error2 || results2.length<0) return res.json({success:false,errors:['Problem. Please, try again...'] });
          
          pool.query(`SELECT * FROM cart WHERE cart.title = '${results[0].title}' AND cart.email = '${user.email}'`,
            (error3, results3, fields3) => {
              if (error3 || results3.length<0)
                return res.json({success:false,errors:['Problem. Please, try again...']});
                console.log('asxas',results3)
              const is_added_to_cart = results3.length===0 ? false : true;
              return res.json({
                success: true,
                products: results[0],
                is_added_to_cart
              })
            // });
        })
    });
}


module.exports = {getProducts,getProduct}