const express = require('express');
const passport = require('passport');
const Cart_Contr = require('../controllers/Cart.js');
const router = express.Router();

router.post('/api/cart/add',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) =>{
    if (!req.user)
      return res.json({message:'error'});
    Cart_Contr.addProduct(req, res, next);
  }
);


router.post('/api/cart',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) =>{
    if (!req.user)
      return res.json({message:'error'});
    Cart_Contr.getUserProds(req, res, next);
  }
);

router.post('/api/cart/update',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) =>{
    if (!req.user)
      return res.json({message:'error'});
    Cart_Contr.updUserProds(req, res, next);
  }
);

router.post('/api/cart/remove',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) =>{
    if (!req.user)
      return res.json({success:false,errors:['error']});
    Cart_Contr.remove_from_cart(req, res, next);
  }
);

module.exports = router;