const express = require('express');
const passport = require('passport');
const router = express.Router();
const Products_Contr = require('../controllers/Product.js');

router.get('/api/products', (req, res, next) =>{
  Products_Contr.getProducts(req, res, next);
});

router.get('/api/products/:id', 
(req, res, next) =>{
  passport.authenticate('jwt', { session: false },
    async (err, user, info) => {
      if (err || !user) return res.json({message:'No user found'});
      Products_Contr.getProduct(req, res, next, user);
    })(req, res, next);
});

module.exports = router;