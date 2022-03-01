const express = require('express');
const SecureRoutesAuth = require('../controllers/User.js')

const router = express.Router();

router.get(
  '/profile',
  (req, res, next) => {
    SecureRoutesAuth(req, res, next);
  }
);

router.get('/logout', 
  (req, res,next) => {
    req.logout();
    return res.json({success:true, message:'successfully logged out'});
});

module.exports = router;