const passport = require('passport');

module.exports = function SecureRoutesAuth (req, res, next) {
  passport.authenticate('jwt', { session: false },
    async (err, user, info) => {
      if(err || !user) return res.json({success:false,errors:'You are not authorized to view this page. Please, log in...'});
      return res.json({
        message: 'You made it to the secure route',
        user: req.user,
        token: req.query.secret_token })
    })(req, res, next)}
