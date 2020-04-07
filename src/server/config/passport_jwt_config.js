/* eslint-disable camelcase */
const { Strategy } = require('passport-jwt');
const User = require('../models/user');
const { secret } = require('../../../.config').jwtCredentials;

// Extractor Function for 'jwt' cookie
function cookieExtractor(req) {
  return req && req.cookies ? req.cookies.jwt : null;
}

module.exports = function jwtStrategySetup(passport) {
  return passport.use(
    new Strategy({
      jwtFromRequest: cookieExtractor,
      secretOrKey: secret,
    }, async (jwt_payload, done) => {
      try {
        const user = await User.findById(jwt_payload.id);
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }),
  );
};
