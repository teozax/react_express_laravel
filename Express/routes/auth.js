const express = require('express');
const passport = require('passport');
var jwt = require('jsonwebtoken');

const router = express.Router();

router.post(
  '/signup',
  async (req, res, next) => {
    passport.authenticate('signup', { session: false },
      async (err, user, info) => {
        if(err) return res.json({success:false,errors: 'server error!'});
        if (!user)  return res.json({success:false,errors: [info.errors]});

        res.json({
          message: 'Signup successful',
          success: true,
          user: user
        });
      }
    )(req, res, next)
  }
);

router.post(
  '/login',
  async (req, res, next) => {
    passport.authenticate(
      'login', {session: false},
      async (err, user, info) => {
        try {
          // console.log(info);
          if (err){
            const error = 'internal server error, or bad request (username, password)';
            return res.json({success:false,errors:['internal server error']});
          }
          if (!user)
            return res.json({success:false,errors: [info.errors]});

          req.login(user, {session: false },
            async (error) => {
              
              if (error) return next(error);
              const jwt_payload ={ 
                // creating the jwt payload constant which takes the user id 
                email: user.email,
              }
              const token = jwt.sign(jwt_payload, "mySecret"); 
          
              // the token is being created using the user id and the secret key
              return res.json({ 
                "token":token,
                user,
                "success":true,
              });
            });
        }catch (error) {
          return res.json({success:false,errors:['internal server error, please try again later']});
        }
  }
)(req, res, next)})



module.exports = router;