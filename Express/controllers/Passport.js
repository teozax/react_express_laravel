const passport = require('passport');
var Strategy = require('passport-local').Strategy;
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const pool = require ('./db_conn.js');
const bcryptjs = require('bcryptjs');

//Passport Middleware
module.exports = function(passport){
  passport.use(
    'signup',
    new Strategy(
      {
        usernameField: 'email', //it looks at req.body.email
        passwordField: 'password', 
        passReqToCallback: true
      },
      async (req, email, password, done) => {
        try {
          const hash = await bcryptjs.hash(password, 10);
          const user = { email, username: req.body.username, password:hash };
          if (password.length<3)
            return done(null, false, {errors:'Password must be at least 3 characters'});
          pool.query({sql:'SELECT email FROM users WHERE email=?', values: [user.email]}, function (error, results, fields) {
            if (error) throw error;
            
            if (results.length>0) 
              return done(null, false, {errors:'Register failed. User alredy registered with this email'});
              
            pool.query({sql:'INSERT INTO users VALUES (?)', values: [Object.values(user)]}, 
             function (error, results, fields) {
              if (error) throw error;
              return done(null, user);
            });  
          });
        } catch (error) {
          done(error);
        }
      }
    ),
  );

  passport.use(
    'login',
    new Strategy(
      {
        usernameField: 'email',
        passwordField: 'password', 
        passReqToCallback: true
      },
      async (req, email, password, done) => {
        try {
          pool.query({sql:'SELECT * FROM users WHERE email=?', values: [email]}, 
            function (error, results, fields) {
              if(error) return done(error);
              if (results.length===0) return done(null, false, {success:false, errors: 'User not found' });
              if (results.length!==1) return done(null, false, {success:false, errors: 'You may be hacked, more than one user was found with the same email' });
              
              // Match password
              bcryptjs.compare(password, results[0].password,
                (err, isMatch) => {
                  if (err) return done(error);
                  if (!isMatch) return done(null, false, {success:false, errors: 'Password incorrect' });
                  const user = {email:results[0].email, username:results[0].username};
                  return done(null, user, { success:true, message: 'Logged in Successfully' });
                }
              )            
            }
          )
        } catch (error) {
          return done(true, false);
        }
      }
    )
  );

  const jwtOptions ={} 
  // creating an object called jwt strategy
  jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(); // adding a jwtFromrequest method to your jwtOptions object;
  jwtOptions.secretOrKey = "mySecret"; 
  // adding a secret or key with which your token will be generated
  //creating a function and exporting it
  passport.use('jwt',new JwtStrategy( jwtOptions,
    async (jwt_payload,done) =>{ 
      try {
        pool.query({sql:'SELECT email,username FROM users WHERE email=?', values: [jwt_payload.email]}, 
          function (error, results, fields) {
            if (error) return done(error);
            if (results.length!==1)  return done(null, false); 
            const user = results[0];
            return done(null, user); 
          })
      }catch(err){ 
        console.log(err); 
        return done(true, false);
      };
    }
  ));
  
}
